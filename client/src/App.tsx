import { Box, Divider, Typography, Button } from '@material-ui/core'
import React from 'react'
import {
    SPaper,
    STextField,
    SLayout,
    SBox,
    SignOut,
    SignIn
} from './components'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import {
    createSection,
    editSectionValue,
    deleteSection,
    editTitle,
    editKey,
    editBpm,
    loadSavedChart,
    fetchChartsAsync,
    saveChartAsync
} from './redux/slices/chart.slice'
import { FaMinusSquare, FaPlus } from 'react-icons/fa'
import JsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import keys from './keys'
import { useAuth0 } from '@auth0/auth0-react'
import { setProfile } from './redux/slices/user.slice'
import SDrawer from './components/SDrawer'

const App: React.FC = () => {
    const { sections, title, key, bpm, entities, isLoading } = useAppSelector(
        (state) => state.chart
    )
    const { id: userId } = useAppSelector(
        (state) => state.user
    )
    const dispatch = useAppDispatch()
    const { isAuthenticated, user } = useAuth0()

    React.useEffect(() => {
        if (isAuthenticated && user) {
            const id = user.sub?.split('|')[1] || ''
            dispatch(setProfile({ id, email: user.email || '' }))
            dispatch(fetchChartsAsync())
        }
    }, [isAuthenticated, user])

    const [inputSection, setInputSection] = React.useState('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.toUpperCase()
        setInputSection(newValue)
    }

    const handleNewSection = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            dispatch(createSection(inputSection.trim()))
            setInputSection('')
        }
    }

    const renderMusicSectionInputs = React.useCallback(() => {
        return sections.length > 0
            ? sections.map((section) => (
                  <React.Fragment key={section.id}>
                      <Box
                          display="flex"
                          flexDirection="row"
                          marginTop={2}
                      >
                          <STextField
                              multiline
                              variant="outlined"
                              onChange={(e) =>
                                  dispatch(
                                      editSectionValue({
                                          id: section.id,
                                          value: e.target.value
                                      })
                                  )
                              }
                              value={section.value}
                              label={section.label}
                              key={section.id}
                          />
                          <FaMinusSquare
                              onClick={() =>
                                  dispatch(deleteSection({ id: section.id }))
                              }
                          />
                      </Box>
                  </React.Fragment>
              ))
            : null
    }, [sections])

    const renderMusicSectionChart = React.useCallback(() => {
        return sections.map((section) => (
            <React.Fragment key={section.id}>
                <Box>
                    <Typography variant="h6">{section.label}</Typography>
                    <Typography style={{ wordSpacing: 12 }} variant="body2">
                        {section.value}
                    </Typography>
                </Box>
                <Divider />
            </React.Fragment>
        ))
    }, [sections])

    const handleDownloadPDF = async () => {
        const el = document.getElementById('pdf') as HTMLElement
        const w = el.offsetWidth
        const h = el.offsetHeight

        html2canvas(el, { scale: 5 }).then((canvas) => {
            const img = canvas.toDataURL('image/jpeg', 1)
            const doc = new JsPDF('l', 'px', [w, h])
            doc.addImage(img, 'JPEG', 0, 0, w, h)
            doc.save(`${title || 'chart'}.pdf`)
        })
    }

    const handleSaveChart = React.useCallback(() => {
        dispatch(saveChartAsync({ userId, title, key, bpm, sections }))
    }, [dispatch, sections, title, key, bpm, userId])

    if (isLoading) {
        return <span>Loading...</span>
    }

    return (
        <SLayout
            header={
                <SBox marginLeft="auto">
                    {isAuthenticated ? <SignOut /> : <SignIn />}
                    {user?.name && (
                        <Typography variant="h6">
                            Welcome, {user.name}
                        </Typography>
                    )}
                </SBox>
            }
            menu={
                isAuthenticated && (<><SDrawer
                charts={entities}
                handleSelectChart={(id) => dispatch(loadSavedChart(id))}
                /><Button variant="contained" onClick={handleSaveChart}>
                <FaPlus />
                Save Chart
            </Button></>)
            }
            controls={
                <SPaper>
                    <Button onClick={handleDownloadPDF}>Download Chart</Button>
                    <Typography variant="h4">Controls</Typography>
                    <SBox m={1}>
                        <STextField
                            id="songTitle"
                            name="songTitle"
                            label="Song - Artist/Band"
                            placeholder="Africa - Toto"
                            value={title}
                            onChange={(e) =>
                                dispatch(editTitle(e.target.value))
                            }
                        />
                        <Autocomplete
                            options={keys}
                            placeholder="C"
                            value={key}
                            onChange={(e, value) => dispatch(editKey(value))}
                            getOptionLabel={(option) => option}
                            style={{ width: 300 }}
                            renderInput={(params) => (
                                <STextField {...params} label="Key" />
                            )}
                        />
                        <STextField
                            type="number"
                            id="bpm"
                            name="bpm"
                            label="BPM"
                            placeholder="120bpm"
                            value={bpm}
                            onChange={(e) => dispatch(editBpm(e.target.value))}
                        />
                        <STextField
                            id="section"
                            name="section"
                            label="Add a section"
                            placeholder="Verse"
                            value={inputSection}
                            onChange={handleChange}
                            onKeyDown={handleNewSection}
                        />
                    </SBox>
                    <Box display="flex" flexWrap="wrap" flexDirection="row">
                        {renderMusicSectionInputs()}
                    </Box>
                </SPaper>
            }
            chart={
                <SPaper id="pdf">
                    <Typography align="left" variant="h5">
                        {title}
                    </Typography>
                    <Typography align="right" variant="body1">
                        Key: {key}
                    </Typography>
                    <Typography align="right" variant="body1">
                        Bpm: {bpm}
                    </Typography>
                    {renderMusicSectionChart()}
                </SPaper>
            }
        />
    )
}

export default App

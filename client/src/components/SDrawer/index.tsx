import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { FaMusic } from 'react-icons/fa'
import ListItem from '@material-ui/core/ListItem'

const useStyles = makeStyles({
    list: {
        width: 250
    },
    fullList: {
        width: 'auto'
    },
    root: {
        overflowY: 'auto'
    }
})
export interface SDrawerProps {
    charts: any[]
    handleSelectChart: (id: any) => void
}
export default function SDrawer ({
    charts = [],
    handleSelectChart
}: SDrawerProps) {
    const classes = useStyles()
    const [state, setState] = React.useState<any>({
        top: false,
        left: false,
        bottom: false,
        right: false
    })

    const toggleDrawer = (anchor: string, open: boolean) => (event: any) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return
        }

        setState({ ...state, [anchor]: open })
    }

    const list = (anchor: string) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom'
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {charts &&
                    charts?.map((chart: any, i) => (
                        <ListItem
                            button
                            key={`${i}-${chart?.title}`}
                            onClick={() => handleSelectChart(chart.id)}
                        >
                            <ListItemIcon>
                                <FaMusic />
                            </ListItemIcon>
                            <ListItemText primary={chart?.title} />
                        </ListItem>
                    ))}
            </List>
        </div>
    )

    return (
        <>
            <Button variant="contained" onClick={toggleDrawer('left', true)}>
                {state.left ? '>' : '<'}
            </Button>
            <SwipeableDrawer
                anchor={'left'}
                open={state.left}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
            >
                {list('left')}
            </SwipeableDrawer>
        </>
    )
}

import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import SContainer from '../SContainer'
import SBox from '../SBox'

interface SLayoutProps {
    controls: React.ReactNode
    chart: React.ReactNode
    header: React.ReactNode
    menu: React.ReactNode
}

const SLayout: React.FC<SLayoutProps> = ({ controls, chart, header, menu }) => (
    <SContainer>
        <Grid container>{header}</Grid>
        <SBox>
        {menu}
        </SBox>
        <Grid spacing={1} container>
            <Grid item xs={6}>
                <Box>{controls}</Box>
            </Grid>
            <Grid item xs={6}>
                <Box>{chart}</Box>
            </Grid>
        </Grid>
    </SContainer>
)

export default SLayout

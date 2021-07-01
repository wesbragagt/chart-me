import React from 'react'
import Grid from '@material-ui/core/Grid'
import SContainer from '../SContainer'
import SBox from '../SBox'
import { useWindowSize } from '../../lib/useWindowSize'

interface SLayoutProps {
    controls: React.ReactNode
    chart: React.ReactNode
    header: React.ReactNode
    menu: React.ReactNode
}

const SLayout: React.FC<SLayoutProps> = ({ controls, chart, header, menu }) => {
    const { width } = useWindowSize()

    const isMobile = width && width < 768
    const horizontalGridSize = isMobile ? 12 : 6
    
    return (
        
            <SContainer>
                <Grid container>{header}</Grid>
                <SBox>
                {menu}
                </SBox>
                <Grid spacing={1} container >
                <Grid item xs={horizontalGridSize}>
        {controls}
    </Grid>
    <Grid item xs={horizontalGridSize}>
        {chart}
    </Grid>
                </Grid>
            </SContainer>
        
    )
}

export default SLayout

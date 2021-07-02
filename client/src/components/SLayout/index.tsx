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
    const horizontalGridItemSize = isMobile ? 12 : 6
    const verticalGridItemSize = 'calc(100vh - 100px)'
    return (
        <SContainer>
            <Grid container>{header}</Grid>
            <SBox>{menu}</SBox>
            <Grid spacing={1} container>
                <Grid
                    item
                    xs={horizontalGridItemSize}
                    style={{ height: verticalGridItemSize }}
                >
                    {controls}
                </Grid>
                <Grid
                    item
                    xs={horizontalGridItemSize}
                    style={{ height: verticalGridItemSize }}
                >
                    {chart}
                </Grid>
            </Grid>
        </SContainer>
    )
}

export default SLayout

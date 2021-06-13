import Box from '@material-ui/core/Box'
import styled from 'styled-components'

interface SBoxProps {
    gap?: string
}

const SBox = styled(Box)<SBoxProps>`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ gap }) => gap || '12px'};
`

export default SBox

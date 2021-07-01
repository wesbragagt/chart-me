import Paper from '@material-ui/core/Paper'
import styled from 'styled-components'

const getHeight = ({ height = '90vh' }) => height

const SPaper = styled(Paper)`
    padding: 1rem;
    overflow-y: auto;
    height: ${getHeight};
`

export default SPaper

const baseURL = process.env.REACT_APP_MOCK ? '/' : ''
const domain = process.env.REACT_APP_DOMAIN || ''
const clientId = process.env.REACT_APP_CLIENT_ID || ''

const config = {
    baseURL,
    domain,
    clientId
}

export default config
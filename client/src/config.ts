// const baseURL = process.env.REACT_APP_MOCK ? '/' : (process.env.REACT_APP_API_URL || 'http://localhost:8080')
const baseURL = 'http://localhost:8080'
const domain = process.env.REACT_APP_DOMAIN || ''
const clientId = process.env.REACT_APP_CLIENT_ID || ''

const config = {
    baseURL,
    domain,
    clientId
}

export default config

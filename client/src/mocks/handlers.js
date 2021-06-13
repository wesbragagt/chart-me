import { rest } from 'msw'
import chartsData from './data/charts'

const charts = rest.get('/charts', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(chartsData))
})

const saveNewChart = rest.post('/chart', (req, res, ctx) => {
    return res(ctx.status(200))
})

const handlers = [charts, saveNewChart]

export default handlers

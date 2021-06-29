import { Chart } from '../slices/chart.slice'
import client from './client'

export const fetchCharts = async (userId = '') => {
    const response = await client.get(`/charts/${userId}`)
    return response.data
}

export const saveChart = async (payload: any) => {
    await client.post('/chart', { data: payload })
    return payload
}

export const updateChart = async (payload: Chart) => {
    await client.put('/chart', { data: payload })
    return payload
}

export const deleteChart = async (payload: Pick<Chart, '_id'>) => {
    await client.delete('/chart', { data: payload })
    return payload
}

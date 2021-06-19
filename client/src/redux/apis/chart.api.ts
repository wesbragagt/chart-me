import client from './client'

export const fetchCharts = async () => {
    const response = await client.get('/charts')
    return response.data
}

export const saveChart = async (payload: any) => {
    await client.post('/chart', { data: payload })
    return payload
}

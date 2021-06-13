import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { fetchCharts, saveChart } from '../apis/chart.api'
interface Section {
    value: string
    label: string
    id: string | number
}

interface State {
    title: string
    key: string
    bpm: number
    sections: Section[]
    entities: any[]
    isLoading: boolean
}
const initialState: State = {
    title: 'Song title - Artist/Band',
    key: 'C',
    bpm: 70,
    sections: [],
    entities: [],
    isLoading: false
}

export const fetchChartsAsync = createAsyncThunk(
    'charts/fetchCharts',
    async () => {
        return await fetchCharts()
    }
)

export const saveChartAsync = createAsyncThunk(
    'charts/saveChart',
    async (chart: Pick<State, 'title' & 'key' & 'bpm' & 'sections'>) => {
        return await saveChart(chart)
    }
)

export const chartSlice = createSlice({
    name: 'chart',
    initialState,
    reducers: {
        editTitle: (state, action) => {
            state.title = action.payload
        },
        editBpm: (state, action) => {
            state.bpm = action.payload
        },
        editKey: (state, action) => {
            state.key = action.payload
        },
        createSection: (state, action: { payload: string }) => {
            state.sections.push({
                id: uuidv4(),
                label: action.payload,
                value: ''
            })
        },
        editSectionValue: (
            state,
            action: { payload: { id: string | number; value: string } }
        ) => {
            const targetSection = state.sections.find(
                (section) => section.id === action.payload.id
            )
            if (targetSection) {
                targetSection.value = action.payload.value
            }
        },
        deleteSection: (state, action: { payload: { id: Section['id'] } }) => {
            state.sections = state.sections.filter(
                (section: Section) => section.id !== action.payload.id
            )
        },
        loadSavedChart: (state, action) => {
            const selectedChart = state.entities.find(
                (e) => e.id === action.payload
            )
            if (selectedChart) {
                return {
                    ...state,
                    ...selectedChart
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChartsAsync.fulfilled, (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        })
        builder.addCase(fetchChartsAsync.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(saveChartAsync.fulfilled, (state, action) => {
            const exists = state.entities.findIndex(e => e.title === action.payload.title)
            if (exists !== -1) {
                state.entities[exists] = action.payload
            } else {
                state.entities.push(action.payload)
            }
            state.isLoading = false
        })
        builder.addCase(saveChartAsync.pending, (state) => {
            state.isLoading = true
        })
    }
})

// Action creators are generated for each case reducer function
export const {
    createSection,
    editSectionValue,
    deleteSection,
    editTitle,
    editBpm,
    editKey,
    loadSavedChart
} = chartSlice.actions

export default chartSlice.reducer

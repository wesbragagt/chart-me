import { createSlice, createAsyncThunk, createEntityAdapter, EntityState } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { fetchCharts, saveChart, updateChart } from '../apis/chart.api'

export type Chart = { _id: string, userId: string, title: string, key: string, bpm: number, sections: Section[] }

export const chartAdapter = createEntityAdapter<Chart>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (chart) => chart._id,
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => a.title.localeCompare(b.title)
})
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
    charts: EntityState<Chart>
    isLoading: boolean
}
const initialState: State = {
    title: 'Song title - Artist/Band',
    key: 'C',
    bpm: 70,
    sections: [],
    charts: chartAdapter.getInitialState(),
    isLoading: false
}

export const fetchChartsAsync = createAsyncThunk(
    'charts/fetchCharts',
    async (userId: string) => {
        return await fetchCharts(userId)
    }
)

export const saveChartAsync = createAsyncThunk(
    'charts/saveChart',
    async (chart: Pick<State, 'title' & 'key' & 'bpm' & 'sections'>) => {
        return await saveChart(chart)
    }
)
export const updateChartAsync = createAsyncThunk(
    'charts/updateChart',
    async (chart: Chart) => {
        return await updateChart(chart)
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
            const chart = chartAdapter.getSelectors().selectById(state.charts, action.payload)
            if (chart) {
                state.title = chart.title
                state.bpm = chart.bpm
                state.key = chart.key
                state.sections = chart.sections
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChartsAsync.fulfilled, (state, action) => {
            chartAdapter.setAll(state.charts, action.payload)
            state.isLoading = false
        })
        builder.addCase(fetchChartsAsync.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(saveChartAsync.fulfilled, (state, action) => {
            const alreadyExists = chartAdapter.getSelectors().selectAll(state.charts).find(chart => chart.title.toUpperCase().trim() === action.payload.title.toUpperCase().trim())
            if (alreadyExists) {
                chartAdapter.setOne(state.charts, action.payload)
            } else {
                chartAdapter.addOne(state.charts, action.payload)
            }
            state.isLoading = false
        })
        builder.addCase(saveChartAsync.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(updateChartAsync.fulfilled, (state, action) => {
            chartAdapter.setOne(state.charts, action.payload)
            state.isLoading = false
        })
        builder.addCase(updateChartAsync.pending, (state) => {
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

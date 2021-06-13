import { createSlice } from '@reduxjs/toolkit'

interface State {
    id: string
    email: string
}
const initialState: State = {
    id: '',
    email: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setProfile: (state, action: { payload: State }) => {
            state.id = action.payload.id
            state.email = action.payload.email
        }
    }
})

export const { setProfile } = userSlice.actions

export default userSlice.reducer

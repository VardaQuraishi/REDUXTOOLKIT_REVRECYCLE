import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

type User = {
    id: number,
    name: string,
    email: string,
    password: string,
    role: string,
}
type InitialState = {
    loading: boolean,
    error: string,
    users: User[]
}
const initialState: InitialState = {
    loading: false,
    users: [],
    error: ''
}

//generates pending, fullfilled,  rejected action types
export const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
    return
    axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.data)
})
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
            state.loading = false
            state.users = action.payload
            state.error = ''
        })
        builder.addCase(fetchUsers.rejected, (state,action) => {
            state.loading = false
            state.error = action.error.message || 'SOmething failed'
            state.users = []
        })
    }
})

export default userSlice.reducer

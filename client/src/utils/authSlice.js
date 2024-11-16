import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        id: null,
        userName: null,
        email: null,
        access_token: null,
        refresh_token: null
    },
    reducers: {
        setCredentials: (state, action) => {
            const {id, userName, email, access_token, refresh_token} = action.payload
            state.id = id
            state.userName = userName
            state.email = email
            state.access_token = access_token
            state.refresh_token = refresh_token
        },

        removeCredentials: (state) => {
            state.id = null
            state.userName = null
            state.email = null
            state.access_token = null
            state.refresh_token = null
        }
    }
})

export const { setCredentials, removeCredentials } = authSlice.actions
export default authSlice.reducer
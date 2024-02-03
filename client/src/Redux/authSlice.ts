import { createSlice } from "@reduxjs/toolkit";

export type authStateType = {
    isAuthenticated: boolean
}
const initialState: authStateType = {
    isAuthenticated: false

}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload
        }
    }
})


export const { setIsAuthenticated } = authSlice.actions

export default authSlice.reducer
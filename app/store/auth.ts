import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "@/app/store/index";
import User from "@/app/models/user";

interface AuthState {
    verifyToken?: string
    user?: User
}

const initialState: AuthState = {
    verifyToken: undefined,
    user: undefined,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateVerifyToken: (state, action: PayloadAction<string | undefined>) => {
            state.verifyToken = action.payload;
        },
        updateUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        }
    }
})

export const {updateVerifyToken, updateUser} = authSlice.actions

export const selectVerifyToken = (state: RootState) => state.auth.verifyToken
export const selectUser = (state: RootState) => state.auth.user

export default authSlice.reducer
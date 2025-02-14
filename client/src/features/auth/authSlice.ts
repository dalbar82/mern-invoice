import { createSlice } from '@reduxjs/toolkit'
import { decodeToken } from 'react-jwt'
import { RootState } from "../../app/store";

interface User {
  id: string;  // User ID (string assumed)
  name: string; // User's name
  email: string; // User's email
  accessToken: string; // ✅ Access token
  refreshToken?: string; // Optional refresh token
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null; // ✅ User can be 'null' initially
  googleToken?: string | null; // Optional Google OAuth token
	users: []
}

const user = JSON.parse(localStorage?.getItem('user') || '')
const googleToken = localStorage.getItem('googleToken')

const decodedToken: string | null = googleToken ? decodeToken(googleToken) : null

const initialState:AuthState = {
	user: user || decodedToken || null,
	isAuthenticated: false,
	googleToken: googleToken,
	users: []
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logIn: (state, action) => {
			state.user = action.payload
			localStorage.setItem('user', JSON.stringify(action.payload))
			localStorage.setItem('users', '')
		},
		logOut: (state, action: {}) => {
			state.user = null
			state.googleToken = null
			localStorage.removeItem('user')
			localStorage.removeItem('googleToken')
			localStorage.removeItem('users')
		},
	},
})

export const { logIn, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUserToken = (state: RootState) => state?.auth?.user?.accessToken as string | null

export const selectCurrentUserGoogleToken = (state: RootState) => state?.auth?.googleToken as string | null

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
	baseUrl: '/api/v1',
	credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.user?.accessToken
		if (token) {
			headers.set('authorisation', `Bearer ${token}`)
		}
		return headers
	},
})

export const baseApiSlice = createApi({
	reducerPath: 'api',
	baseQuery,
	endpoints: (builder) => ({}),
})

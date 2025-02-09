import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { logIn, logOut } from '../auth/authSlice'

import { RootState } from '../../app/store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:1997/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.user?.accessToken;
    const googleToken = state.auth.googleToken;

    headers.set('Access-Control-Allow-Origin', '*');

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    } else if (googleToken) {
      headers.set('authorization', `Bearer ${googleToken}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let response = await baseQuery(args, api, extraOptions);

  if ((response.error as FetchBaseQueryError)?.status === 403) { // ✅ Use 'status' instead of 'originalStatus'
    const refreshResponse = await baseQuery('/auth/new_access_token', api, extraOptions);

    if (refreshResponse?.data) {
      api.dispatch(logIn({ ...refreshResponse.data }));
      response = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return response;
};

export const baseApiSlice = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithRefreshToken,
	tagTypes: ['User', 'Customer', 'Document'],
	endpoints: (builder) => ({}),
})

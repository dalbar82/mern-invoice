import { baseApiSlice } from '../api/baseApiSlice';
import { IOrganisation } from '../../types/Organisation';

export const usersApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleOrganisation: builder.query({
      query: (orgId) => `/organisation/${orgId}`,
      providesTags: ['Organisation'],
    }),
    updateOrganisationInfo: builder.mutation({
      query: ({ id, ...otherFields }) => ({
        url: `/organisation/${id}`,
        method: 'PATCH',
        body: otherFields,
      }),
      invalidatesTags: ['Organisation'],
    }),
  }),
});

export const {
  useGetSingleOrganisationQuery,
  useUpdateOrganisationInfoMutation,
} = usersApiSlice;

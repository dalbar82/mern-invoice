import { baseApiSlice } from '../api/baseApiSlice'
import {User} from '../../types/User'

type GetAllUsersResponse = {
  users: User[];
  isError?: boolean; 
};

export const usersApiSlice = baseApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllUsers: builder.query<GetAllUsersResponse, string | undefined>({
				query: (filter) => ({
					url: `/user/all${filter ? `?filter=${encodeURIComponent(filter)}` : ""}`,
					method: 'GET',
					validateStatus: (response, result) => {
						return response.status === 200 && !result.isError
					},
				}),
			providesTags: (result): Array<{ type: "User" | "Customer" | "Document"; id: string | number }>  => {
				if (result) {
					return [
						...result.users.map(({ _id }) => ({
							type: "User" as const, // Ensures type is valid
							id: _id, // Fixed incorrect key (_id → id)
						})),
						{ type: "User", id: "LIST" }, // Ensures consistency
					];
				} else {
					return [{ type: "User", id: "LIST" }];
				}
			}
		}),

		getUserProfile: builder.query({
			query: () => '/user/profile',
			providesTags: [{ type: 'User', id: 'SINGLE_USER' }],
		}),

		updateUserProfile: builder.mutation({
			query: (profileData) => ({
				url: '/user/profile',
				method: 'PATCH',
				body: profileData,
			}),
			invalidatesTags: [{ type: 'User', id: 'SINGLE_USER' }],
		}),

		deleteMyAccount: builder.mutation({
			query: () => ({
				url: 'user/profile',
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'User', id: 'LIST' }],
		}),

		deleteUser: builder.mutation({
			query: (id) => ({
				url: `/user/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'User', id: 'LIST' }],
		}),

		deactivateUser: builder.mutation({
			query: (id) => ({
				url: `/user/${id}/deactivate`,
				method: 'PATCH',
			}),
			invalidatesTags: [{ type: 'User', id: 'LIST' }],
		}),

		reactivateUser: builder.mutation({
			query: (id) => ({
				url: `/user/${id}/reactivate`,
				method: 'PATCH',
			}),

			invalidatesTags: [{ type: 'User', id: 'LIST' }],
		}),
	}),
})

export const {
	useGetAllUsersQuery,
	useUpdateUserProfileMutation,
	useGetUserProfileQuery,
	useDeleteMyAccountMutation,
	useDeleteUserMutation,
	useDeactivateUserMutation,
	useReactivateUserMutation,
} = usersApiSlice

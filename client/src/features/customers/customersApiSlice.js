import { baseApiSlice } from '../api/baseApiSlice'

export const usersApiSlice = baseApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllCustomers: builder.query({
			query: (page = 1) => `/customer/all?page=${page}`,
			providesTags: ['Customer'],
		}),
		createCustomer: builder.mutation({
			query: (customerInfo) => ({
				url: '/customer/create',
				method: 'POST',
				body: customerInfo, 
			}),
			invalidatesTags: ['Customer'],
		}),
		getSingleCustomer: builder.query({
			query: (custId) => `/customer/${custId}`,
			providesTags: ['Customer'],
		}),
		updateCustomerInfo: builder.mutation({
			query: ({ id, ...otherFields }) => ({
				url: `/customer/${id}`,
				method: 'PATCH',
				body: otherFields,
			}),
			invalidatesTags: ['Customer'],
		}),
		deleteCustomer: builder.mutation({
			query: (custId) => ({
				url: `/customer/${custId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Customer'],
		}),
	}),
})

export const {
	useGetAllCustomersQuery,
	useCreateCustomerMutation,
	useGetSingleCustomerQuery,
	useUpdateCustomerInfoMutation,
	useDeleteCustomerMutation,
} = usersApiSlice

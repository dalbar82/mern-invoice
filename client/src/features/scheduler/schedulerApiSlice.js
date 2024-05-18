import { baseApiSlice } from '../api/baseApiSlice'

export const schedulerApiSlice = baseApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllAppointments: builder.query({
			query: () => `/appointment/all`,
			providesTags: ['Appointment'],
		}),
		createAppointment: builder.mutation({
			query: (appointmentInfo) => ({
				url: '/appointment/create',
				method: 'POST',
				body: appointmentInfo,
			}),
			invalidatesTags: ['Appointment'],
		}),
		// getSingleCustomer: builder.query({
		// 	query: (custId) => `/customer/${custId}`,
		// 	providesTags: ['Customer'],
		// }),
		// updateCustomerInfo: builder.mutation({
		// 	query: ({ id, ...otherFields }) => ({
		// 		url: `/customer/${id}`,
		// 		method: 'PATCH',
		// 		body: otherFields,
		// 	}),
		// 	invalidatesTags: ['Customer'],
		// }),
		// deleteCustomer: builder.mutation({
		// 	query: (custId) => ({
		// 		url: `/customer/${custId}`,
		// 		method: 'DELETE',
		// 	}),
		// 	invalidatesTags: ['Customer'],
		// }),
	}),
})

export const {
	useGetAllAppointmentsQuery,
	useCreateAppointmentMutation,
	// useGetSingleCustomerQuery,
	// useUpdateCustomerInfoMutation,
	// useDeleteCustomerMutation,
} = schedulerApiSlice

import { baseApiSlice } from '../api/baseApiSlice'

export const documentsApiSlice = baseApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllDocs: builder.query({
			query: (lastCreatedAt = null) => ({
				url: `/document/all`,
				params: lastCreatedAt ? { lastCreatedAt } : {},
			}),
			serializeQueryArgs: ({ endpointName }) => endpointName, // Ensures correct caching behavior
			merge: (currentCache, newItems) => {
				if (newItems?.myDocuments?.length) {
					currentCache.myDocuments.push(...newItems.myDocuments);
				}
				currentCache.hasMore = newItems.hasMore;
				currentCache.lastCreatedAt = newItems.lastCreatedAt;
			},
			forceRefetch({ currentArg, previousArg }) {
				return currentArg?.lastCreatedAt !== previousArg?.lastCreatedAt;
			},
			providesTags: ['Document'],
		}),
		getSingleDoc: builder.query({
			query: (id) => `/document/${id}`,
			providesTags: ['Document'],
		}),
		createDoc: builder.mutation({
			query: (formData) => ({
				url: '/document/create',
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['Document'],
		}),
		updateDoc: builder.mutation({
			query: ({ id, ...rest }) => ({
				url: `/document/${id}`,
				method: 'PATCH',
				body: rest,
			}),
			invalidatesTags: ['Document'],
		}),
		deleteDoc: builder.mutation({
			query: (id) => ({
				url: `/document/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Document'],
		}),
		createPayment: builder.mutation({
			query: ({ id, ...rest }) => ({
				url: `/document/${id}/payment`,
				method: 'POST',
				body: rest,
			}),
			invalidatesTags: ['Document'],
		}),
	}),
})

export const {
	useCreatePaymentMutation,
	useDeleteDocMutation,
	useCreateDocMutation,
	useGetSingleDocQuery,
	useGetAllDocsQuery,
	useUpdateDocMutation,
} = documentsApiSlice

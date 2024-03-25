import { Container, Paper, TableContainer } from '@mui/material'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Spinner from '../../../components/Spinner'
import SortableTable from '../../../components/Table/SortableTable/SortableTable'
import useTitle from '../../../hooks/useTitle'
import {
	useGetAllUsersQuery,
	useReactivateUserMutation,
	useDeactivateUserMutation,
	useDeleteUserMutation,
} from '../usersApiSlice'

const userCosts = {
	Admin: 50,
	User: 20,
	Basic: 10,
	Mobile: 5,
}

const UserListPage = () => {
	useTitle('Users')

	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	// const [totalCost, setTotalCost] = useState(0)
	let totalCost = 0
	const { data, isLoading, isError, error } = useGetAllUsersQuery(
		'allUsersList',
		{
			pollingInterval: 600000,
			refetchOnFocus: true,
			refetchOnMountOrArgChange: true,
		}
	)
	const [deleteUser] = useDeleteUserMutation()
	const [deactivateUser] = useDeactivateUserMutation()
	const [reactivateUser] = useReactivateUserMutation()
	const rows = data?.users

	const getUserPrice = (role) => {
		const price = userCosts[role]
		totalCost += price
		return price
	}

	const deactivateUserHandler = async (id) => {
		try {
			await deactivateUser(id).unwrap()
			toast.success('User deactivated')
		} catch (err) {
			const message = err.data.message
			toast.error(message)
		}
	}
	const reactivateUserHandler = async (id) => {
		try {
			await reactivateUser(id).unwrap()
			toast.success('User reactivated')
		} catch (err) {
			const message = err.data.message
			toast.error(message)
		}
	}
	//TODO: add delete modal
	const deleteHandler = async (id) => {
		try {
			await deleteUser(id).unwrap()
			toast.success('User deleted')
		} catch (err) {
			const message = err.data.message
			toast.error(message)
		}
	}

	useEffect(() => {
		if (isError) {
			const message = error.data.message
			toast.error(message)
		}
		// getRolesCount(rows)
	}, [error, isError, rows])

	const headerDetails = [
		{
			accessor: 'firstName',
			types: 'string',
			sortable: true,
			label: 'First Name',
		},
		{
			accessor: 'lastName',
			types: 'string',
			sortable: true,
			label: 'Last Name',
		},
		{
			accessor: 'roles',
			types: 'string',
			sortable: true,
			label: 'Access',
		},
		{
			accessor: 'createdAt',
			types: 'date',
			sortable: true,
			label: 'Joined',
		},
		{
			accessor: 'active',
			types: 'boolean',
			sortable: true,
			label: 'Active',
		},
	]

	return (
		<div className='basic-container'>
			<div style={{ display: 'grid', gap: '50px' }}>
				<div
					style={{
						display: 'inline-grid',
						gridColumnStart: 1,
						gridColumnEnd: 9,
					}}>
					{isLoading ? (
						<Spinner />
					) : (
						<SortableTable
							columnData={headerDetails}
							rowData={rows}></SortableTable>
					)}
				</div>
				<div
					style={{
						display: 'inline-grid',
						gridColumnStart: 9,
						gridColumnEnd: 12,
						backgroundColor: '#f6fafb',
						borderRadius: '4px',
						marginTop: '10px',
						padding: '25px',
					}}>
					<h4>Payment summary</h4>
					{rows?.map((row, i) => {
						return (
							<div
								style={{ display: 'flex', justifyContent: 'space-between' }}
								key={i}>
								<div>{row?.roles[0]}</div>
								<div>${getUserPrice(row?.roles[0])}</div>
							</div>
						)
					})}
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<h4>Total monthly cost:</h4>
						<p>${totalCost}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserListPage

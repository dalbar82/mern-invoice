import {
	Box,
	Container,
	TableFooter,
	TablePagination,
	TableRow,
	Typography,
	Button,
	Tooltip,
} from '@mui/material'
import SortableTable from '../../../components/Table/SortableTable/SortableTable'
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Spinner from '../../../components/Spinner'
import TablePaginationActions from '../../../components/TablePaginationActions'
import useTitle from '../../../hooks/useTitle'
import { useGetAllCustomersQuery } from '../customersApiSlice'
import { useGetAllUsersQuery } from '../../users/usersApiSlice'
import '../../../styles/pageHeader.css'

const CustomerListPage = () => {
	const { data: userData } = useGetAllUsersQuery()

	useTitle('Customers')
	const navigate = useNavigate()

	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const { data, isLoading } = useGetAllCustomersQuery(page)

	const rows = data?.myCustomers

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const retrieveUserName = (id) => {
		const currentUser = userData.users?.find((user) => user._id === id)?.username

		return currentUser || ''
	}

	const headerDetails = [
		{
			accessor: 'name',
			types: 'string',
			sortable: true,
			label: 'Name',
		},
		{
			accessor: 'accountNo',
			types: 'string',
			sortable: true,
			label: 'Account #',
		},
		{
			accessor: 'createdAt',
			types: 'date',
			sortable: true,
			label: 'Created',
		},
		{
			accessor: 'city',
			types: 'string',
			sortable: true,
			label: 'City',
		},
		{
			accessor: '_id',
			types: 'link',
			sortable: false,
			label: 'View',
			navigateTo: (id) => {
				navigate(`/single-customer/${id}`)
			},
		},
	]

	return (
		<Container
			component='main'
			maxWidth='xl'
			sx={{ mt: 14, ml: 15, width: '90%' }}>
			<Box className='page-header'>
				<Typography variant='h6'>Customer</Typography>
				<Box>
					<Tooltip title='Add Customer'>
						<Button
							sx={{ p: '15px 0px 15px 10px', color: '#a6aeb3' }}
							variant='text'
							startIcon={<GroupAddRoundedIcon />}
							onClick={() => navigate('/create-customer')}></Button>
					</Tooltip>
				</Box>
			</Box>

			{isLoading ? (
				<Spinner />
			) : (
				<div className='basic-container'>
					<SortableTable
						columnData={headerDetails}
						rowData={rows}>
						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
									colSpan={9}
									count={rows?.length || 0}
									rowsPerPage={rowsPerPage}
									page={page}
									SelectProps={{
										inputProps: {
											'aria-label': 'rows per page',
										},
										native: true,
									}}
									onPageChange={handleChangePage}
									onRowsPerPageChange={handleChangeRowsPerPage}
									ActionsComponent={TablePaginationActions}
								/>
							</TableRow>
						</TableFooter>
					</SortableTable>
				</div>
			)}
			{!data?.myCustomers.length && (
				<Box mt={'20px'}>
					<span>
						No Customers. Click add icon above to begin inputting your first customer!
					</span>
				</Box>
			)}
		</Container>
	)
}

export default CustomerListPage

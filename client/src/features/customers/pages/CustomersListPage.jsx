import {
	Box,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
	Button,
	Tooltip,
} from '@mui/material'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { useState } from 'react'
import Spinner from '../../../components/Spinner'
import StyledTableRow from '../../../components/StyledTableRow'
import StyledTableCell from '../../../components/StyledTableCell'
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

	return (
		<Container
			component='main'
			maxWidth='xl'
			sx={{ mt: 14, ml: 15, width: '90%' }}>
			<Box className='page-header'>
				<Typography variant='h6'>Customers</Typography>
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
				<TableContainer component={Paper}>
					<Table
						sx={{ minWidth: 650 }}
						aria-label='user table'>
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<StyledTableCell>Account #</StyledTableCell>
								<StyledTableCell>Active Since</StyledTableCell>
								<StyledTableCell>Contact Email</StyledTableCell>
								<StyledTableCell>Account Manager</StyledTableCell>
								<StyledTableCell>City</StyledTableCell>
								<StyledTableCell>View</StyledTableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{rows && (
								<>
									{(rowsPerPage > 0
										? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										: rows
									).map((row, index) => (
										<StyledTableRow
											key={row._id}
											sx={{
												'&:last-chid td, &:last-child th': { border: 0 },
											}}>
											{/* name */}
											<StyledTableCell
												component='th'
												scope='row'
												fontWeight='600'>
												{row.name}
											</StyledTableCell>
											{/* account# */}
											<StyledTableCell align='right'>{row.accountNo}</StyledTableCell>
											{/* active since */}
											<StyledTableCell align='right'>
												{moment(row?.createdAt).format('DD-MM-YYYY')}
											</StyledTableCell>
											{/* Contact Email */}
											<StyledTableCell align='left'>{row.email}</StyledTableCell>
											{/* Account Manager */}
											<StyledTableCell align='left'>
												{userData ? retrieveUserName(row?.createdBy) : ''}
											</StyledTableCell>
											{/* City */}
											<StyledTableCell align='left'>{row.city}</StyledTableCell>
											{/* view */}
											<StyledTableCell>
												<Box>
													<VisibilityRoundedIcon
														color='success'
														fontSize='medium'
														sx={{
															cursor: 'pointer',
														}}
														onClick={() => navigate(`/single-customer/${row._id}`)}
													/>
												</Box>
											</StyledTableCell>
										</StyledTableRow>
									))}
								</>
							)}
							{/* control how emptyRows are displayed */}
							{emptyRows > 0 && (
								<TableRow style={{ height: 53 * emptyRows }}>
									<TableCell colSpan={6}>No data</TableCell>
								</TableRow>
							)}
						</TableBody>
						{/* footer with pagination */}
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
					</Table>
				</TableContainer>
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

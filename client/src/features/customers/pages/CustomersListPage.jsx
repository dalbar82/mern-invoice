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
	Modal,
} from '@mui/material'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import CloseIcon from '@mui/icons-material/Close'
import DoneIcon from '@mui/icons-material/Done'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Spinner from '../../../components/Spinner'
import StyledTableRow from '../../../components/StyledTableRow'
import StyledTableCell from '../../../components/StyledTableCell'
import TablePaginationActions from '../../../components/TablePaginationActions'
import useTitle from '../../../hooks/useTitle'
import {
	useGetAllCustomersQuery,
	useDeleteCustomerMutation,
} from '../customersApiSlice'

const modalStyle = {
	position: 'absolute',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
}

const CustomerListPage = () => {
	useTitle('Customers')
	const navigate = useNavigate()

	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const { data, isLoading } = useGetAllCustomersQuery(page)

	const [deleteCustomer] = useDeleteCustomerMutation()
	const rows = data?.myCustomers

	// state to handle opening and closing of modal
	const [open, setOpen] = useState(false)
	// state to be used and passed onto the modal instance
	const [selectedCustomer, setSelectedCustomer] = useState('')
	const handleOpen = (customer) => {
		setSelectedCustomer(customer)
		setOpen(true)
	}

	const handleClose = () => setOpen(false)

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	//TODO: add delete modal
	const deleteHandler = async (id) => {
		try {
			await deleteCustomer(id).unwrap()
			toast.success('Customer deleted')
		} catch (err) {
			const message = err.data.message
			toast.error(message)
		}
	}

	return (
		<Container
			component='main'
			maxWidth='xl'
			sx={{ mt: 14, ml: 15, width: '90%' }}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					borderBottom: '1px solid #e1e1e1',
					paddingBottom: '20px',
					marginBottom: '20px',
				}}>
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
								<StyledTableCell>Delete</StyledTableCell>
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
												scope='row'>
												{row.name}
											</StyledTableCell>
											{/* account# */}
											<StyledTableCell align='right'>{row.accountNo}</StyledTableCell>
											{/* active since */}
											<StyledTableCell align='right'>
												{moment(row?.createdAt).format('DD-MM-YYYY')}
											</StyledTableCell >
											{/* Contact Email */}
											<StyledTableCell align='left'>{row.email}</StyledTableCell>
											{/* Account Manager */}
											<StyledTableCell align='left'>{row.createdBy}</StyledTableCell>
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
											{/* delete */}
											<StyledTableCell>
												<Box>
													<ClearRoundedIcon
														// TODO: add delete confirm modal
														color='error'
														fontSize='medium'
														sx={{
															cursor: 'pointer',
														}}
														onClick={() => handleOpen(row)}
													/>
												</Box>
											</StyledTableCell>
										</StyledTableRow>
									))}
									{open && (
										<Modal
											open={open}
											onClose={handleClose}
											aria-labelledby='modal-modal-title'
											aria-describedby='modal-modal-description'>
											<Box sx={modalStyle}>
												<Box
													sx={{
														display: 'flex',
														flexDirection: 'row',
														justifyContent: 'space-between',
														alignItems: 'center',
														borderBottom: '1px solid #e1e1e1',
														paddingBottom: '20px',
														marginBottom: '20px',
														width: '100%',
													}}>
													<Typography
														id='modal-modal-title'
														variant='h6'
														sx={{ fontSize: 'medium' }}>
														{`Delete ${selectedCustomer.name}`}
													</Typography>
													<Box>
														<Tooltip title='Yes'>
															<Button
																sx={{
																	color: '#a6aeb3',
																}}
																id='modal-modal-description'
																variant='text'
																size='large'
																onClick={() => {
																	deleteHandler(selectedCustomer._id)
																	handleClose()
																}}>
																<DoneIcon />
															</Button>
														</Tooltip>
														<Tooltip title='No'>
															<Button
																sx={{
																	color: '#a6aeb3',
																}}
																id='modal-modal-description'
																variant='text'
																size='large'
																onClick={handleClose}>
																<CloseIcon />
															</Button>
														</Tooltip>
													</Box>
												</Box>
												<Box
													sx={{
														display: 'flex',
														alignItems: 'center',
														width: '100%',
														marginTop: '10px',
														backgroundColor: '#ff000066',
														padding: '10px',
														borderRadius: '5px',
													}}>
													<WarningAmberRoundedIcon
														sx={{ marginRight: '10px', color: 'red' }}
													/>
													<Typography
														variant='p'
														sx={{ fontSize: 'small', color: 'white' }}>
														Please note you can't undo this action!
													</Typography>
												</Box>
											</Box>
										</Modal>
									)}
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

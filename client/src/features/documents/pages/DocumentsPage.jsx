import {
	Box,
	Button,
	Container,
	Tooltip,
	Paper,
	Chip,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from '@mui/material'
import moment from 'moment'
import { useState } from 'react'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../../components/Spinner'
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded'
import StyledTableCell from '../../../components/StyledTableCell'
import StyledTableRow from '../../../components/StyledTableRow'
import TablePaginationActions from '../../../components/TablePaginationActions'
import { useGetAllMyDocsQuery } from '../documentsApiSlice'

const DocumentsPage = () => {
	const navigate = useNavigate()

	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const { data, isLoading } = useGetAllMyDocsQuery(page)

	const rows = data?.myDocuments

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
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
				<Typography variant='h6'>Jobs</Typography>
				<Box>
					<Tooltip title='Add Job'>
						<Button
							sx={{ p: '15px 0px 15px 10px', color: '#a6aeb3' }}
							variant='text'
							startIcon={<GroupAddRoundedIcon />}
							onClick={() => navigate('/create-doc')}></Button>
					</Tooltip>
				</Box>
			</Box>

			{isLoading ? (
				<Spinner />
			) : !rows.length ? (
				<div>No Docs</div>
			) : (
				<TableContainer
					component={Paper}
					sx={{ marginBottom: '100px', marginTop: '15px' }}>
					{isLoading && <Spinner />}
					<Table
						sx={{ minWidth: 650 }}
						aria-label='simple-table'>
						<TableHead>
							<TableRow>
								<StyledTableCell width={'20%'}>Name</StyledTableCell>
								<StyledTableCell width={'20%'}>Customer</StyledTableCell>
								<StyledTableCell>Doc No</StyledTableCell>
								<StyledTableCell>Job Status</StyledTableCell>
								<StyledTableCell>Due Date</StyledTableCell>
								<StyledTableCell>Payment Status</StyledTableCell>
								<StyledTableCell>View</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{(rowsPerPage > 0
								? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								: rows
							).map((row, index) => (
								<StyledTableRow
									key={row?._id}
									sx={{
										'&:last-child td, &:last-child th': {
											border: 0,
										},
										cursor: 'pointer',
									}}>
									<StyledTableCell
										component='th'
										scope='row'>
										{row?.name}
									</StyledTableCell>

									<StyledTableCell
										component='th'
										scope='row'>
										{row?.customer?.name}
									</StyledTableCell>

									<StyledTableCell
										component='th'
										scope='row'>
										{row?.documentNumber}
									</StyledTableCell>

									<StyledTableCell
										component='th'
										scope='row'>
										<Chip
											sx={{
												backgroundColor: '#eeeeee',
												color: 'rgb(0 0 0 / 67%)',
											}}
											label={row?.documentType}></Chip>
									</StyledTableCell>

									<StyledTableCell
										component='th'
										scope='row'>
										{moment(row?.dueDate).format('DD-MM-YYYY')}
									</StyledTableCell>

									<StyledTableCell
										component='th'
										scope='row'>
										<Chip
											label={row?.status}
											sx={{
												backgroundColor: '#eeeeee',
												color: 'rgb(0 0 0 / 67%)',
											}}></Chip>
									</StyledTableCell>

									<StyledTableCell>
										<Box
											sx={{
												'&:hover': {
													cursor: 'pointer',
												},
											}}>
											<VisibilityRoundedIcon
												color='success'
												fontSize='medium'
												onClick={() => navigate(`/document/${row._id}`)}
											/>
										</Box>
									</StyledTableCell>
								</StyledTableRow>
							))}

							{emptyRows > 0 && (
								<TableRow style={{ height: 53 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
									colSpan={9}
									count={rows.length}
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
		</Container>
	)
}

export default DocumentsPage

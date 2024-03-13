import { useState, useMemo } from 'react'
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
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import { useNavigate } from 'react-router-dom'
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded'

import EnhancedTableHead from './EnhancedTableHead'
import Spinner from '../Spinner'
import StyledTableRow from '../StyledTableRow'
import StyledTableCell from '../StyledTableCell'
import TablePaginationActions from '../TablePaginationActions'

const DocumentsPage = ({children, headerDetails, rows, isLoading}) => {
	const navigate = useNavigate()

	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [order, setOrder] = useState('asc')
	const [orderBy, setOrderBy] = useState('dueDate')

	function descendingComparator(a, b, orderBy) {
		if (b[orderBy] < a[orderBy]) {
			return -1
		}
		if (b[orderBy] > a[orderBy]) {
			return 1
		}
		return 0
	}

	function getComparator(order, orderBy) {
		return order === 'desc'
			? (a, b) => descendingComparator(a, b, orderBy)
			: (a, b) => -descendingComparator(a, b, orderBy)
	}

	function stableSort(array, comparator) {
		const stabilizedThis = array?.map((el, index) => [el, index])
		stabilizedThis?.sort((a, b) => {
			const order = comparator(a[0], b[0])
			if (order !== 0) {
				return order
			}
			return a[1] - b[1]
		})
		return stabilizedThis?.map((el) => el[0])
	}
	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	// const headerDetails = [
	// 	{
	// 		id: 'docNumber',
	// 		numeric: false,
	// 		disablePadding: true,
	// 		label: 'Doc #',
	// 	},
	// 	{
	// 		id: 'name',
	// 		numeric: false,
	// 		disablePadding: true,
	// 		label: 'Name',
	// 	},
	// 	{
	// 		id: 'customer',
	// 		numeric: false,
	// 		disablePadding: true,
	// 		label: 'Customer',
	// 	},
	// 	{
	// 		id: 'status',
	// 		numeric: false,
	// 		disablePadding: true,
	// 		label: 'Status',
	// 	},
	// 	{
	// 		id: 'dueDate',
	// 		numeric: false,
	// 		disablePadding: true,
	// 		label: 'Due',
	// 	},
	// 	{
	// 		id: 'payStatus',
	// 		numeric: false,
	// 		disablePadding: true,
	// 		label: 'Payment Status',
	// 	},
	// 	{
	// 		id: 'view',
	// 		numeric: false,
	// 		disablePadding: true,
	// 		label: 'view',
	// 	},
	// ]
	// const rows = data?.myDocuments

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0

	const visibleRows = useMemo(
		() =>
			stableSort(rows, getComparator(order, orderBy))?.slice(
				page * rowsPerPage,
				page * rowsPerPage + rowsPerPage
			),
		[order, orderBy, page, rowsPerPage, rows]
	)

	const statusColour = (status) => {
		if (status === 'Open') return '#ffc356'
		if (status === 'Quotation') return '#69b5d8'
		if (status === 'Order') return '#4ab84a'
		if (status === 'Invoice') return '#e64d4d'
		if (status === 'Paid') return '#ca43ca'
		return '#eeeeee'
	}
console.log(rows);
	return (
		<Container
			component='main'
			maxWidth='xl'
			sx={{ mt: 14, ml: 15, width: '90%' }}>
			<Box className='page-header'>
				<Typography variant='h6'>Projects</Typography>
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
			) : !rows?.length ? (
				<div>No Data</div>
			) : (
				<TableContainer
					component={Paper}
					style={{
						marginTop: '15px',
						backgroundColor: 'transparent',
						boxShadow: 'none',
					}}>
					{isLoading && <Spinner />}
					<Table
						sx={{
							minWidth: 650,
							border: '0',
						}}
						style={{
							borderCollapse: 'separate',
							borderSpacing: '0 9px',
						}}
						aria-label='simple-table'>
						<EnhancedTableHead
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							headCells={headerDetails}
						/>
						{children}
            {emptyRows > 0 && (
								<TableRow style={{ height: 53 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						<TableFooter>
							<TableRow>
								<TablePagination
									style={{ borderBottom: 'none' }}
									rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
									colSpan={9}
									count={rows?.length}
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

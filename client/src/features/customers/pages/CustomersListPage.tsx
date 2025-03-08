import {
	Box,
	Container,
	Button,
	Tooltip,
} from '@mui/material';
import Typography from '../../../components/Typography/Typography';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import Spinner from '../../../components/Spinner';
import useTitle from '../../../hooks/useTitle';
import { useGetAllCustomersQuery } from '../customersApiSlice';
import { useGetAllUsersQuery } from '../../users/usersApiSlice';
import '../../../styles/pageHeader.css';
import '../../../styles/Table.css';
import {
	MaterialReactTable,
	useMaterialReactTable,
	MRT_ColumnDef
} from 'material-react-table';

const CustomerListPage = () => {
	const { data: userData } = useGetAllUsersQuery(undefined);

	useTitle('Customers');
	const navigate = useNavigate();

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const { data, isLoading } = useGetAllCustomersQuery(page);
	const rows = data?.myCustomers || [];
	interface RowData {
		createdAt: string; // Ensure this matches the actual data structure
	}
	// const handleChangePage = (event, newPage) => {
	// 	setPage(newPage);
	// };

	// const handleChangeRowsPerPage = (event) => {
	// 	setRowsPerPage(parseInt(event.target.value, 10));
	// 	setPage(0);
	// };

	// const retrieveUserName = (id) => {
	// 	const currentUser = userData?.users?.find((user) => user._id === id)?.username;
	// 	return currentUser || '';
	// };

	const columns: MRT_ColumnDef<RowData>[] = useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Name',
			},
			{
				accessorKey: 'accountNo',
				header: 'Account #',
			},
			{
				accessorKey: 'createdAt',
				header: 'Created',
				Cell: ({ cell }) => new Date(cell.getValue() as Date).toLocaleDateString(),
			},
			{
				accessorKey: 'city',
				header: 'City',
			},
			{
				accessorKey: '_id',
				header: 'View',
				Cell: ({ cell }) => (
					<Button
					sx={{color: '#2e7d32' }}
					variant='text'
					startIcon={<VisibilityIcon style={{fontSize:26}} />}
					onClick={() => navigate(`/single-customer/${cell.getValue()}`)}
				/>
				),
			},
		],
		[navigate],
	);

	const tableInstance = useMaterialReactTable({
		columns,
		data: rows,
		enableGlobalFilter: true, // Only enable the global filter for search functionality
		enableSorting: true, // Disable sorting
		enableColumnFilters: false, // Disable column filters
		enablePagination: true, // Disable pagination
		enableColumnActions:false,
		enableFullScreenToggle:false,
		enableDensityToggle:false,
		enableHiding:false

		
	});

	return (
		<Container
			component='main'
			maxWidth='xl'
			sx={{ mt: 14, ml: 15, width: '90%' }}
		>
			<Box className='page-header'>
				<Typography 
					elementType='h3' 
					style={{ fontWeight: 600, marginBottom: '20px', fontFamily: 'Poppins' }}
					text='Customers'/>
				<Box>
					<Tooltip title='Add Customer'>
						<Button
							sx={{ p: '15px 0px 15px 10px', color: '#a6aeb3' }}
							variant='text'
							startIcon={<GroupAddRoundedIcon />}
							onClick={() => navigate('/create-customer')}
						/>
					</Tooltip>
				</Box>
			</Box>

			{isLoading ? (
				<Spinner />
			) : (
				<div className='basic-container'>
					<MaterialReactTable table={tableInstance} />
				</div>
			)}

			{!rows.length && (
				<Box mt={'20px'}>
					<span>
						No Customers. Click add icon above to begin inputting your first customer!
					</span>
				</Box>
			)}
		</Container>
	);
};

export default CustomerListPage;

import EditIcon from '@mui/icons-material/Edit'
import ClearIcon from '@mui/icons-material/Clear'
import ListItemWrapper from '../../../components/ListItemWrapper'
import {
	Box,
	Container,
	Button,
	List,
	Grid,
	Stack,
	Typography,
	Tooltip,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../../components/Spinner'
import { useGetSingleCustomerQuery } from '../customersApiSlice'

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

const SingleCustomerPage = () => {
	const { custId } = useParams()

	const navigate = useNavigate()

	const goBack = () => navigate(-1)

	const { data, isLoading } = useGetSingleCustomerQuery(custId)

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
				<Typography variant='h6'>{data?.customer.name}</Typography>
				<Box sx={{}}>
					<Tooltip title='Edit Profile'>
						<Button
							sx={{ p: '15px 0px 15px 10px', color: '#a6aeb3' }}
							variant='text'
							startIcon={<EditIcon />}
							onClick={() =>
								navigate(`/edit-customer/${data?.customer._id}`)
							}></Button>
					</Tooltip>
					<Tooltip title='Back'>
						<Button
							sx={{ p: '15px 0px 15px 10px', color: '#a6aeb3' }}
							variant='text'
							startIcon={<ClearIcon />}
							onClick={goBack}></Button>
					</Tooltip>
				</Box>
			</Box>

			{isLoading ? (
				<Spinner />
			) : (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<Grid
						container
						width='100%'>
						<Grid
							item
							sm={12}>
							<Stack direction='column'>
								<Stack>
									<Typography
										variant='span'
										mt={'10px'}
										mb={2}>
										Information
									</Typography>
									<List
										sx={{
											backgroundColor: 'white',
											width: '100%',
											fontSize: 'small',
											marginTop: '10px',
											paddingBottom: '0',
										}}>
										{/* name */}
										<ListItemWrapper
											label={'Name'}
											text={`${capitalizeFirstLetter(data?.customer.name)}`}
										/>
										{/* email */}
										<ListItemWrapper
											label={'Contact Email'}
											text={data?.customer.email}
										/>
										{/* account# */}
										<ListItemWrapper
											label={'Account #'}
											text={data?.customer.accountNo}
										/>
										{/* VAT */}
										<ListItemWrapper
											label={'VAT #'}
											text={
												data?.customer.vatTinNo
													? `${data?.customer.vatTinNo}`
													: ''
											}
										/>
										{/* phone */}
										<ListItemWrapper
											label={'Phone'}
											text={
												data?.customer.phoneNumber
													? `${data?.customer?.phoneNumber}`
													: ''
											}
										/>
										{/* Address */}
										<ListItemWrapper
											label={'Address'}
											text={
												data?.customer.address && data?.customer.city
													? `${data?.customer?.address}, ${data?.customer.city}`
													: ''
											}
										/>
									</List>
								</Stack>
							</Stack>
						</Grid>
					</Grid>
				</Box>
			)}
		</Container>
	)
}

export default SingleCustomerPage

import AlarmTwoToneIcon from '@mui/icons-material/AlarmTwoTone'
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone'
import DifferenceTwoToneIcon from '@mui/icons-material/DifferenceTwoTone'
import DoneAllTwoToneIcon from '@mui/icons-material/DoneAllTwoTone'
import PaidTwoToneIcon from '@mui/icons-material/PaidTwoTone'
import SavingsTwoToneIcon from '@mui/icons-material/SavingsTwoTone'
import SentimentDissatisfiedTwoToneIcon from '@mui/icons-material/SentimentDissatisfiedTwoTone'
import SentimentSatisfiedAltTwoToneIcon from '@mui/icons-material/SentimentSatisfiedAltTwoTone'
import { Box, Container, Grid, Typography } from '@mui/material'
import StyledDashboardGrid from '../../../components/StyledDashboardGrid'
import { useGetAllCustomersQuery } from '../../customers/customersApiSlice'
import { useGetAllDocsQuery } from '../../documents/documentsApiSlice'
import { addCurrencyCommas } from '../../documents/pages/components/addCurrencyCommas'
import PaymentHistory from './components/paymentHistory'
import useTitle from '../../../hooks/useTitle'
import SimpleListItem from './components/simpleListItem'
import '../../../styles/pageHeader.css'

const DashboardPage = () => {
	useTitle('My Dashboard')
	const { data: customers } = useGetAllCustomersQuery()
	const { data: documents } = useGetAllDocsQuery()

	const date = new Date().toDateString()

	let totalMoniesRecieved = 0
	for (let i = 0; i < documents?.myDocuments?.length; i++) {
		if (documents?.myDocuments[i]?.totalAmountReceived !== undefined) {
			totalMoniesRecieved += documents?.myDocuments[i]?.totalAmountReceived
		}
	}

	const docOverDue = documents?.myDocuments?.filter(
		(doc) => doc.dueDate <= new Date().toISOString()
	)

	let paymentHistory = []
	for (let i = 0; i < documents?.myDocuments?.length; i++) {
		let history = []
		if (documents?.myDocuments[i]?.paymentRecords !== undefined) {
			history = [...paymentHistory, documents?.myDocuments[i]?.paymentRecords]
			paymentHistory = [].concat.apply([], history)
		}
	}
	const user = JSON.parse(localStorage.getItem('user')) || ''

	const sortPaymentHistory = paymentHistory.sort(function (a, b) {
		const c = new Date(a.datePaid)
		const d = new Date(b.datePaid)

		return d - c
	})

	let totalAmount = 0
	for (let i = 0; i < documents?.myDocuments?.length; i++) {
		totalAmount += documents?.myDocuments[i]?.total
	}

	const fullyPaid = documents?.myDocuments?.filter(
		(doc) => doc.status === 'Paid'
	)

	const partiallyPaid = documents?.myDocuments?.filter(
		(doc) => doc.status === 'Not Fully Paid'
	)

	const notPaid = documents?.myDocuments?.filter(
		(doc) => doc.status === 'Not Paid'
	)

	return (
		<Container
			component='main'
			maxWidth='xl'
			sx={{ mt: 14, ml: 15, width: '90%' }}>
			<Box className='page-header'>
				<Typography
					variant='subtitle1'
					sx={{ p: '10px 0px 10px 0px' }}>
					Dashboard
				</Typography>
				<Typography
					variant='subtitle1'
					sx={{ p: '10px 0px 10px 0px', color: '#a6aeb3' }}>
					{date}
				</Typography>
			</Box>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container>
					{/* Grid top - Welcome banner */}
					<Grid
						item
						mt={1}
						mb={4}
						sm={12}
						p={3}
						sx={{
							backgroundColor: '#f3dbe1cc',
							borderRadius: '10px',

							color: '#fd7e8b',
						}}>
						<Typography
							variant='subtitle1'
							sx={{ p: '10px 0px 10px 0px' }}>
							Welcome {user.firstName ? user.firstName : ''}
						</Typography>
					</Grid>

					{/* Grid middle */}
					<Grid
						item
						lg={6}
						md={6}
						xs={12}
						p={3}
						sx={{
							minHeight: '50vh',
							backgroundColor: 'white',
							borderRadius: '10px',
						}}>
						<Box width={'100%'}>
							<Grid container>
								<Grid
									item
									xs={12}>
									<Box
										display={'flex'}
										justifyContent={'space-between'}>
										<Typography
											variant='subtitle2'
											sx={{ p: '10px 0px 10px 0px' }}>
											Due Today
										</Typography>
										<Typography
											variant='subtitle2'
											sx={{ p: '10px 0px 10px 0px' }}>
											% Complete
										</Typography>
									</Box>
								</Grid>
								{docOverDue &&
									docOverDue.map((item) => (
										<SimpleListItem
											key={item._id}
											data={item}
										/>
									))}
							</Grid>
						</Box>
					</Grid>
					<Grid
						item
						sm={6}></Grid>
					{/* Grid bottom */}
					<Grid
						item
						sm={12}></Grid>
				</Grid>
			</Box>

			<Box>
				<Grid
					container
					spacing={2}>
					{/* customers */}
					<StyledDashboardGrid>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
							}}>
							<SentimentSatisfiedAltTwoToneIcon
								color='primary'
								sx={{ fontSize: 30 }}
							/>
							<Typography
								variant='h5'
								sx={{ marginLeft: 1 }}>
								{customers?.totalCustomers}
							</Typography>
						</Box>
						<Typography variant='subtitle1'>Total Customers</Typography>
					</StyledDashboardGrid>
					{/* total documents */}
					<StyledDashboardGrid>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
							}}>
							<DifferenceTwoToneIcon
								color='success'
								sx={{ fontSize: 30 }}
							/>
							<Typography
								variant='h5'
								sx={{ marginLeft: 1 }}>
								{documents?.totalDocuments}
							</Typography>
						</Box>
						<Typography variant='subtitle1'>Total Documents</Typography>
					</StyledDashboardGrid>
					{/* total amount */}
					<StyledDashboardGrid>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
							}}>
							<SavingsTwoToneIcon
								color='secondary'
								sx={{ fontSize: 30 }}
							/>
							<Typography
								variant='h5'
								sx={{ marginLeft: 1 }}>
								{addCurrencyCommas(totalAmount.toFixed(2))}
							</Typography>
						</Box>
						<Typography variant='subtitle1'>Expected Income</Typography>
					</StyledDashboardGrid>
					{/* total paid */}
					<StyledDashboardGrid>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
							}}>
							<PaidTwoToneIcon sx={{ fontSize: 30, color: '#ff9100' }} />
							<Typography
								variant='subtitle1'
								sx={{ marginLeft: 1 }}>
								{addCurrencyCommas(totalMoniesRecieved)}
							</Typography>
						</Box>
						<Typography variant='subtitle1'>Cash Received</Typography>
					</StyledDashboardGrid>
					{/* pending amount */}
					<StyledDashboardGrid>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
							}}>
							<SentimentDissatisfiedTwoToneIcon
								sx={{ fontSize: 30, color: '#ff3d00' }}
							/>
							<Typography
								variant='h5'
								sx={{ marginLeft: 1 }}>
								{addCurrencyCommas((totalAmount - totalMoniesRecieved).toFixed(2))}
							</Typography>
						</Box>
						<Typography variant='subtitle1'>Cash Pending</Typography>
					</StyledDashboardGrid>
					{/* Fully paid docs */}
					<StyledDashboardGrid>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
							}}>
							<DoneAllTwoToneIcon sx={{ fontSize: 30, color: '#651fff' }} />
							<Typography
								variant='subtitle1'
								sx={{ marginLeft: 1 }}>
								{fullyPaid?.length}
							</Typography>
						</Box>
						<Typography variant='subtitle1'>Total Paid Docs</Typography>
					</StyledDashboardGrid>
					{/* Partially Paid */}
					<StyledDashboardGrid>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
							}}>
							<CloseTwoToneIcon sx={{ fontSize: 30, color: '#2196f3' }} />
							<Typography
								variant='subtitle1'
								sx={{ marginLeft: 1 }}>
								{partiallyPaid?.length}
							</Typography>
						</Box>
						<Typography variant='subtitle1'>Not Fully Paid</Typography>
					</StyledDashboardGrid>
					{/* overdue */}
					<StyledDashboardGrid>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
							}}>
							<AlarmTwoToneIcon sx={{ fontSize: 30, color: '#006064' }} />
							<Typography
								variant='subtitle1'
								sx={{ marginLeft: 1 }}>
								{docOverDue?.length}
							</Typography>
						</Box>
						<Typography variant='subtitle1'>Overdue</Typography>
					</StyledDashboardGrid>
					{/* unpaid */}
					<StyledDashboardGrid>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
							}}>
							<SentimentDissatisfiedTwoToneIcon
								sx={{ fontSize: 30, color: '#455a64' }}
							/>
							<Typography
								variant='subtitle1'
								sx={{ marginLeft: 1 }}>
								{notPaid?.length}
							</Typography>
						</Box>
						<Typography variant='subtitle1'>UnPaid</Typography>
					</StyledDashboardGrid>
				</Grid>
			</Box>
			{/* <Box
				sx={{
					mt: 3,
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<HistoryEduTwoToneIcon sx={{ fontSize: 60 }} />
				<Typography variant='h3'>
					{paymentHistory?.length ? 'Payment History' : 'No Payments as of now'}
				</Typography>
			</Box>

			<PaymentHistory sortPaymentHistory={sortPaymentHistory} /> */}
		</Container>
	)
}

export default DashboardPage

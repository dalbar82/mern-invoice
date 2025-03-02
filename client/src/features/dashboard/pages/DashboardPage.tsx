import {GraphUp, CustomersRound, Profit} from "../../../icons/components";
import { Box, Container, Grid, Typography } from '@mui/material'
import StyledDashboardGrid from '../../../components/StyledDashboardGrid'
import { useGetAllCustomersQuery } from '../../customers/customersApiSlice'
import { useGetAllDocsQuery } from '../../documents/documentsApiSlice'
import { addCurrencyCommas } from '../../documents/pages/components/addCurrencyCommas'
import useTitle from '../../../hooks/useTitle'
import SimpleListItem from './components/simpleListItem'
import '../../../styles/pageHeader.css'
import { Customer } from "../../../types/Customers";
import { JobDocument } from "../../../types/JobDocument";

// Define types for API responses
interface CustomerData {
  totalCustomers: number;
	customers: Customer[];
}

interface DocumentsData {
  myDocuments?: JobDocument[];
}

const DashboardPage = () => {
	useTitle('My Dashboard')

  const { customers } = useGetAllCustomersQuery<CustomerData>(undefined);
  const { myDocuments } = useGetAllDocsQuery<DocumentsData>(undefined);

	const date = new Date().toDateString();

  const docOverDue = myDocuments?.filter((doc: JobDocument) => {
    const dueDate = doc.dueDate ? new Date(doc.dueDate) : null;
    return dueDate && dueDate <= new Date();
  });

	const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

	let totalAmount = 0

	if (myDocuments && myDocuments.length > 0) {
		for (let i = 0; i < myDocuments.length; i++) {
			totalAmount += myDocuments[i]?.total ?? 0; 
		}
	}
	

	return (
		<Container
			component='main'
			sx={{ ml: 14, width: '90vw' }}
			style={{ justifyContent: 'space-between', marginTop: '155px' }}>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container>
					{/* Grid left */}
					<Grid
						container>
						<Grid
							item
							sm={6}
							p={3}
							sx={{
								background:
									'linear-gradient(90deg, rgba(0,117,180,1) 0%, rgba(65,162,215,1) 100%)',
								borderRadius: '10px',
								display: 'flex',
								justifyContent: 'space-between',
								color: '#fff',
								height: '185px',
								maxWidth: '96% !important',
							}}>
							<Box>
								<Typography
									variant='h5'
									style={{ padding: '10px 0px 10px 0px' }}>
									Welcome
								</Typography>
								<Typography
									variant='h4'
									style={{ padding: '10px 0px 10px 0px', fontWeight: '700' }}>
									{user?.firstName ? user?.firstName?.toUpperCase() : ''}
								</Typography>
							</Box>
							<Typography
								variant='subtitle1'
								sx={{ p: '10px 0px 10px 0px', color: '#fff' }}>
								{date}
							</Typography>
						</Grid>
						<StyledDashboardGrid
							boxColor={
								'linear-gradient(194deg, rgba(0,117,180,1) 0%, rgba(65,162,215,1) 100%)'
							}>
							<Typography variant='subtitle2'>Current Order value</Typography>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center',
								}}>
								<Typography
									variant='h5'
									sx={{ marginLeft: 1, fontWeight: 700 }}>
									${addCurrencyCommas(totalAmount?.toFixed(2))}
								</Typography>
							</Box>
							<GraphUp width='95%' height='120px' margin-top='20px'/>
							{/* <img
								src={GraphUp}
								alt='Graph up icon'
								style={{ width: '95%', height: '120px', marginTop: '20px' }}
							/> */}
						</StyledDashboardGrid>
						<StyledDashboardGrid>
							<Typography variant='subtitle2'>Total Customers</Typography>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center',
								}}>
								<Typography
									variant='h5'
									sx={{ marginLeft: 1, fontWeight: 700 }}>
									{customers?.length}
								</Typography>
							</Box>
							<CustomersRound width='95%' height='120px' margin-top='20px'/>
							{/* <img
								src={CustomersRound}
								alt='Graph up icon'
								style={{ width: '95%', height: '120px', marginTop: '20px' }}
							/> */}
						</StyledDashboardGrid>
						<Grid
							item
							sm={12}
							p={3}
							sx={{
								backgroundColor: '#fff',
								padding: '20px',
								boxShadow: ' 1px 1px 4px #eaedee',
								borderRadius: '10px',
								display: 'flex',
								justifyContent: 'space-between',
								marginTop: '20px',
								height: '185px',
								maxWidth: '96% !important',
							}}>
							<Grid
								item
								sm={12}
								md={4}
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-around',
								}}>
								<Typography variant='subtitle2'>Awaiting Payment</Typography>
								<Typography
									variant='h5'
									sx={{ marginLeft: 1, fontWeight: 700 }}>
									$12,323.00
								</Typography>
							</Grid>
							<Grid
								item
								sm={12}
								md={4}>
									<Profit width='95%' height='120px' margin-top='20px'/>
								{/* <img
									src={profit}
									alt='Graph up icon'
									style={{ width: '92%', height: '110px', marginTop: '20px' }}
								/> */}
							</Grid>
							<Grid
								item
								sm={12}
								md={4}
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-around',
								}}>
								<Typography variant='subtitle2'>Payments Recieved</Typography>
								<Typography
									variant='h5'
									sx={{ marginLeft: 1, fontWeight: 700 }}>
									{/* {customers?.totalCustomers} */}
									$16,423.22
								</Typography>
							</Grid>
						</Grid>
					</Grid>

					<Grid
						item
						lg={6}
						md={6}
						xs={12}
						// p={3}
						sx={{
							minHeight: '50vh',
							borderRadius: '10px',
						}}
						style={{
							flexGrow: '1',
							maxWidth: '100%',
							marginLeft: '20px',
							// background: '#ffffff',
							// padding: '15px 0',
							// 	boxShadow: '1px 1px 2px #e1e1e1',
						}}>
						<Box width={'100%'}>
							<Grid container>
								<Grid
									item
									xs={12}
									style={{
										justifyContent: 'space-between',
										background:
											'linear-gradient(194deg, rgba(0,117,180,1) 0%, rgba(65,162,215,1) 100%)',
										padding: '10px 25px',
										color: 'white',
										borderRadius: '5px',
										boxShadow: '1px 1px #d5d7d88f',
									}}>
									<Box
										display={'flex'}
										justifyContent={'space-between'}>
										<Typography
											variant='subtitle2'
											sx={{ p: '10px 0px 10px 0px' }}>
											My Jobs
										</Typography>
										<Typography
											variant='subtitle2'
											sx={{ p: '10px 0px 10px 0px' }}>
											% Complete
										</Typography>
										<Typography
											variant='subtitle2'
											sx={{ p: '10px 0px 10px 0px' }}>
											Due
										</Typography>
									</Box>
								</Grid>
								{myDocuments?.map((item: JobDocument) => (
                  <SimpleListItem key={item._id} data={item} />
                ))}
							</Grid>
						</Box>
					</Grid>

					{/* Grid bottom */}
				</Grid>
			</Box>
		</Container>
	)
}

export default DashboardPage

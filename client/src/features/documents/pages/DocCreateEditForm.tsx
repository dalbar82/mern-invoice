import styled from '@emotion/styled'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import DoneIcon from '@mui/icons-material/Done'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined'
import ClearIcon from '@mui/icons-material/Clear'
import { produce } from 'immer'
import axios from 'axios'
import { splitAddress } from '../../../utils/googleAddressSplit'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import {
	Box,
	Container,
	Tooltip,
	Grid,
	IconButton,
	InputBase,
	Paper,
	Table,
	CircularProgress,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	TextareaAutosize,
	TextField,
	MenuItem,
	Button
} from '@mui/material'
// import Button from '../../../components/Buttons/Button/Button'
import Typography from '../../../components/Typography/Typography'
import Autocomplete from '@mui/material/Autocomplete'
import GeoAutocomplete from 'react-google-autocomplete'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import SendSharpIcon from '@mui/icons-material/SendSharp'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Customer } from '../../../types/Customers'
import { BillingItem } from '../../../types/JobDocument'

import Spinner from '../../../components/Spinner'
import StyledTableCell from '../../../components/StyledTableCell'
import StyledTableRow from '../../../components/StyledTableRow'
import currencies from '../../../world_currencies.json'
import {
	useCreateDocMutation,
	useGetSingleDocQuery,
	useUpdateDocMutation,
} from '../documentsApiSlice'
import { useGetUserProfileQuery } from '../../users/usersApiSlice'

import { useGetAllCustomersQuery } from '../../customers/customersApiSlice'
import { addCurrencyCommas } from './components/addCurrencyCommas'
import { docInitialState, itemsInitialState } from './initialState'
import '../../../styles/pageHeader.css'

const StyledItemButton = styled(Button)({
	boxShadow: '0 0 0 0 #f0f0f0, 0 0 0 0 rgba(124, 105, 239, 1)',
})

const DocCreateEditForm = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const { data: user } = useGetUserProfileQuery(undefined)
	const { data: customers } = useGetAllCustomersQuery(undefined)
	const { data: singleDoc } = useGetSingleDocQuery(id)

	const [createDoc, { isLoading, isSuccess }] = useCreateDocMutation()
	const [sendEmail, setSendEmail] = useState(false)

	const [
		updateDoc,
		{
			isLoading: updateDocLoading,
			isSuccess: updateDocSuccess,
			data: updateDocData,
		},
	] = useUpdateDocMutation()

	const goBack = () => navigate(-1)

	const [docData, setDocData] = useState(docInitialState)
	const [items, setItems] = useState<BillingItem[]>(itemsInitialState)
	const [documentType, setDocumentType] = useState('Quotation')
	const [viewProjectDetails, setViewProjectDetails] = useState(true)
	const [viewItemDetails, setViewItemDetails] = useState(false)
	const [viewShippingDetails, setViewShippingDetails] = useState(false)

	const [currency, setCurrency] = useState(currencies[0].code)

	const [name, setName] = useState('')
	const [organisation, setOrganisation] = useState()
	const [customer, setCustomer] = useState<Customer | null>(null)
	const [salesTax, setSalesTax] = useState(10)
	const [total, setTotal] = useState(0)
	const [subTotal, setSubTotal] = useState(0)
	const [rates, setRates] = useState(0)
	const [status, setStatus] = useState('Not Paid')
	const [autoCompleteAddress, setAutoCompleteAddress] = useState('')
	const [deliveryAddress, setDeliveryAddress] = useState('')
	const [deliveryCity, setDeliveryCity] = useState('')
	const [deliveryState, setDeliveryState] = useState('')
	const [deliveryPostcode, setDeliveryPostcode] = useState('')
	const [deliveryCountry, setDeliveryCountry] = useState('')
	const [deliveryNotes, setDeliveryNotes] = useState('')
	const [totalAmountReceived, setTotalAmountReceived] = useState(0)

	const today = new Date()
	const docTypes = ['Invoice', 'Order', 'Quotation', 'Open', 'Paid']
	const productionTypes = ['Pre Production', 'Production', 'Complete']

	const [dueDate, setDueDate] = useState(
		today.getTime() + 7 * 24 * 60 * 60 * 1000 || null
	)

	useEffect(() => {
		if (isSuccess) {
			navigate('/documents')
			toast.success('Your project was created successfully')
		}
		if (updateDocSuccess) {
			navigate('/documents')
			const message = updateDocData?.message
			toast.success(message)
		}
	}, [navigate, isSuccess, updateDocSuccess, updateDocData])

	const doc = singleDoc?.document

	useEffect(() => {
		if (doc) {
			setName(doc.name)
			setOrganisation(doc.organisation)
			setDocData(doc)
			setDocumentType(doc.documentType)
			setItems(doc.billingItems)
			setSubTotal(doc.subTotal)
			setSalesTax(doc.salesTax)
			setTotal(doc.total)
			setCurrency(doc.currency)
			setRates(doc.rates)
			setCustomer(doc.customer)
			setDeliveryAddress(doc.deliveryAddress)
			setDeliveryCity(doc.deliveryCity)
			setDeliveryState(doc.deliveryState)
			setDeliveryPostcode(doc.deliveryPostcode)
			setDeliveryCountry(doc.deliveryCountry)
			setDeliveryNotes(doc.deliveryNotes)
		}
	}, [doc])

	const handleAddBillingItemsRow = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		const insertAt = 0
		const nextItems: BillingItem[] = [
			...items.slice(0, insertAt),
			{
				name: '',
				unitPrice: 0,
				quantity: 0,
				discount: 0,
				productionStatus: 'Pre Production',
			},
			...items.slice(insertAt),
		]
		setItems(nextItems)
	}

	// const handleRates = (e) => {
	// 	setRates(e.target.value)
	// }

	useEffect(() => {
		const subTotal = () => {
			const amtArr = document.getElementsByName("amount") as NodeListOf<HTMLInputElement>;
			let subtotal = 0;
	
			amtArr.forEach((input) => {
				if (input.value) {
					subtotal += +input.value; // Convert value to number
				}
			});
	
			setSubTotal(subtotal);
		};
	
		subTotal();
	}, [docData, items]);
	

	useEffect(() => {
		const total = () => {
			const finalTotal = (rates / 100) * subTotal + subTotal
			setSalesTax((rates / 100) * subTotal)
			setTotal(finalTotal)
		}
		total()
	}, [items, rates, subTotal])

	useEffect(() => {
		//Get the total amount paid
		let totalReceived = 0
		for (var i = 0; i < doc?.paymentRecords?.length; i++) {
			totalReceived += Number(doc?.paymentRecords[i]?.amountPaid)
			setTotalAmountReceived(totalReceived)
		}
	}, [doc])

	const location = useLocation()

	const createNewCustomer = () => {
		navigate('/create-customer', { state: { prevPath: location.pathname } })
	}
	const autoCompleteStyle = {
		width: '100%',
		height: '57px',
		padding: '12px',
		color: 'rgba(0, 0, 0, 0.87)',
		border: '1px solid #c4c4c4',
		borderRadius: '4px',
	}
	const createUpdateDocHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (doc) {
			try {
				await updateDoc({
					id: doc._id,
					...docData,
					billingItems: [...items],
					documentType,
					name,
					customer,
					dueDate,
					salesTax,
					subTotal,
					total,
					rates,
					currency,
					status,
					deliveryAddress,
					deliveryCity,
					deliveryState,
					deliveryPostcode,
					deliveryCountry,
					deliveryNotes,
				})
			} catch (err: unknown) {
				if (err instanceof Error) {
					const message = err?.message
					toast.error(message)
				} else {
					console.error("Unknown error:", err);
				}
			}
		} else {
			try {
				await createDoc({
					...docData,
					billingItems: [...items],
					documentType,
					name,
					organisation: organisation || user.userProfile?.organisation,
					customer,
					dueDate,
					salesTax,
					subTotal,
					total,
					rates,
					currency,
					status,
					paymentRecords: [],
					deliveryAddress,
					deliveryCity,
					deliveryState,
					deliveryPostcode,
					deliveryCountry,
					deliveryNotes,
				})
			} catch (err: unknown) {
				if (err instanceof Error) {
					const message = err?.message
					toast.error(message)
				} else {
					console.error("Unknown error:", err);
				}
			}
		}
	}

	const switchPageView = (page: string) => {
		if (page === 'project') {
			setViewProjectDetails(true)
			setViewItemDetails(false)
			setViewShippingDetails(false)
		}
		if (page === 'item') {
			setViewProjectDetails(false)
			setViewItemDetails(true)
			setViewShippingDetails(false)
		}
		if (page === 'delivery') {
			setViewProjectDetails(false)
			setViewItemDetails(false)
			setViewShippingDetails(true)
		}
	}

	const sendPdfEmail = () => {
		setSendEmail(true)
		axios
			.post(`/api/v1/document/send-pdf`, {
				user,
				doc,
				status,
				totalAmountReceived,
			})
			.then(() => setSendEmail(false))
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<Container
			component='main'
			maxWidth='xl'
			sx={{ mt: 14, ml: 15, width: '90%' }}>
			<Box className='page-header'>
				<Typography elementType='h6' text='Project Details'/>
				<Box>
					{sendEmail ? (
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
							}}>
							<CircularProgress />
						</Box>
					) : (
						<Tooltip title='Email'>
							<Button
								style={{ padding: '15px 0px 15px 10px', color: '#a6aeb3' }}
								variant='text'
								startIcon={<SendSharpIcon />}
								onClick={sendPdfEmail}></Button>
						</Tooltip>
					)}
					<Tooltip title='Close'>
						<Button
							style={{ padding: '15px 0px 15px 10px', color: '#a6aeb3' }}
							variant='text'
							startIcon={<ClearIcon />}
							onClick={goBack}></Button>
					</Tooltip>
				</Box>
			</Box>
			{isLoading || updateDocLoading ? (
				<Spinner />
			) : (
				<Box
					sx={{
						mt: '1rem',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
					component='form'
					noValidate
					autoComplete='off'
					onSubmit={createUpdateDocHandler}>
					<Grid
						container
						style={{ overflowY: 'auto' }}
						sx={{
							height: '77vh',

							paddingBottom: '20px',
							backgroundColor: 'white',
						}}>
						<Grid
							item
							md={9}
							sm={12}
							pl={3}>
							<Box
								sx={{
									marginTop: '30px',
									marginBottom: '20px',
									width: '90%',
									display: 'flex',
									justifyContent: 'space-evenly',
								}}>
								<Button
									onClick={() => {
										switchPageView('project')
									}}
									style={{
										width: '250px',
										fontWeight: '400',
										borderBottom: '1px solid #e1e1e1',
										paddingBottom: '20px',
									}}>
									01. Project Info
								</Button>
								<Button
									onClick={() => {
										switchPageView('item')
									}}
									style={{
										width: '250px',
										fontWeight: '400',
										borderBottom: '1px solid #e1e1e1',
										paddingBottom: '20px',
									}}>
									02. Items
								</Button>
								<Button
									onClick={() => {
										switchPageView('delivery')
									}}
									style={{
										width: '250px',
										fontWeight: '400',
										borderBottom: '1px solid #e1e1e1',
										paddingBottom: '20px',
									}}>
									03. Address Details
								</Button>
							</Box>

							{/* Project info */}

							{viewProjectDetails && (
								<Grid
									rowSpacing={4}
									container
									sx={{
										padding: '24px 24px',
									}}
									justifyContent='space-between'>
									<Grid
										item
										xs={12}>
										<Typography
											elementType='p'
											text='Project Information'
											style={{
												color: '#5a5a5a',
												textTransform: 'uppercase',
											}}/>
									</Grid>
									<Grid
										item
										md={6}>
										<TextField
											required
											sx={{ marginRight: '20px', width: '96%' }}
											label='Project Name'
											value={name}
											onChange={(e) => {
												setName(e.target.value)
											}}
										/>
									</Grid>
									<Grid
										item
										md={3}>
										<TextField
											variant='outlined'
											select
											sx={{
												width: '92%',
											}}
											defaultValue={'Quotation'}
											value={documentType}
											id='document-list'
											onChange={(event) => {
												setDocumentType(event.target.value)
											}}>
											{docTypes.map((option, index) => (
												<MenuItem
													key={index}
													value={option}>
													{option}
												</MenuItem>
											))}
										</TextField>
									</Grid>

									<Grid
										md={3}
										item>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												label='Set Due Date'
												value={dueDate}
												sx={{
													width: '100%',
												}}
												onChange={(date) => {
													setDueDate(date)
												}}
												slots={{
													textField: (params) => <TextField {...params} />,
												}}
											/>
										</LocalizationProvider>
									</Grid>
									{/* customer info */}

									<Grid
										item
										xs={12}>
										<Box
											mb={1}
											sx={{
												display: 'flex',
												alignItems: 'center',
											}}>
											<Typography
												elementType='p'
												text='Customer'
												style={{
													color: '#5a5a5a',
													textTransform: 'uppercase',
												}}/>
												
											{!customer && (
												<>
													<Grid item>
														<Tooltip title='Add new customer'>
															<Button
																startIcon={<AddCircleOutlineIcon />}
																color='secondary'
																style={{ padding: '0' }}
																onClick={() => createNewCustomer()}
															/>
														</Tooltip>
													</Grid>
												</>
											)}
											{customer && (
												<Tooltip title='Choose another customer'>
													<Button
														style={{ padding: '0', textTransform: 'none', marginBottom: '10px' }}
														color='warning'
														onClick={() => setCustomer(null)}
														startIcon={<ChangeCircleIcon/>}
													/>
												</Tooltip>
											)}
										</Box>
										{customer && (
											<Grid
												container
												rowSpacing={2}>
												<Grid
													item
													md={12}
													sm={10}>
													<TextField
														margin='normal'
														fullWidth
														variant='standard'
														label='Name'
														disabled
														value={customer?.name}
													/>
												</Grid>
												<Grid
													item
													md={5}
													sm={10}>
													<TextField
														margin='normal'
														sx={{ width: '95%' }}
														fullWidth
														variant='standard'
														label='Contact Email'
														disabled
														value={customer?.email}
													/>
												</Grid>
												<Grid
													item
													md={5}
													sm={10}>
													<TextField
														margin='normal'
														sx={{ width: '95%' }}
														variant='standard'
														label='Contact Phone'
														disabled
														value={customer?.phoneNumber}
													/>
												</Grid>
												<Grid
													item
													md={2}
													sm={10}>
													<TextField
														margin='normal'
														fullWidth
														variant='standard'
														label='GST'
														disabled
														value={customer?.vatTinNo}
													/>
												</Grid>
											</Grid>
										)}
										<div style={customer ? { display: 'none' } : { display: 'block' }}>
											<Autocomplete
												disablePortal
												sx={{ pt: '10px' }}
												id='customers-list'
												options={customers?.myCustomers || []}
												getOptionLabel={(option) => (option ? option.name : '')}
												renderInput={(params) => (
													<TextField
														{...params}
														label='Select a customer'
													/>
												)}
												value={customers?.myCustomers?.name}
												onChange={(event, value) => {
													setCustomer(value)
												}}
											/>
										</div>
									</Grid>
									<Grid
										item
										xs={12}>
										<Box
											mt={1}
											sx={{
												display: 'flex',
												flexDirection: 'column',
											}}>
											<Typography
												elementType='p'
												text='
												Additional Info'
												style={{
													color: '#5a5a5a',
													textTransform: 'uppercase',
													marginBottom: '10px'
												}}/>

											<TextareaAutosize
												minRows={4}
												style={{
													fontFamily: 'poppins',
													border: 'solid 1px #d6d6d6',
													padding: '10px',
												}}
												// placeholder='Add a special note or memo to your customers,such as payment information/account'
												onChange={(e) =>
													setDocData({
														...docData,
														additionalInfo: e.target.value,
													})
												}
												value={docData.additionalInfo}
											/>
										</Box>
									</Grid>
								</Grid>
							)}

							{/* items */}
							{viewItemDetails && (
								<div>
									<TableContainer
										component={Paper}
										sx={{ marginBottom: '30px', marginTop: '15px' }}>
										<Table
											sx={{ minWidth: 650 }}
											aria-label='simple-table'>
											<TableHead
												style={{
													background:
														'linear-gradient(94deg, rgba(0,117,180,1) 0%, rgba(65,162,215,1) 100%)',
												}}>
												<TableRow>
													<StyledTableCell width={'1%'}>#</StyledTableCell>
													<StyledTableCell width={'35%'}>Description</StyledTableCell>
													<StyledTableCell width={'12%'}>Qty</StyledTableCell>
													<StyledTableCell width={'9%'}>Unit Price</StyledTableCell>
													<StyledTableCell width={'7%'}>Markup(%)</StyledTableCell>
													<StyledTableCell width={'12%'}>Line Total</StyledTableCell>
													<StyledTableCell></StyledTableCell>
													{documentType === 'Order' && <StyledTableCell></StyledTableCell>}
												</TableRow>
											</TableHead>
											<TableBody>
												{items.map((item, index) => (
													<StyledTableRow
														key={index}
														sx={{
															'&:last-child td, &:last-child th': {
																border: 0,
															},
															cursor: 'pointer',
														}}>
														<StyledTableCell
															component='th'
															scope='row'>
															{index + 1}
														</StyledTableCell>
														<StyledTableCell>
															<InputBase
																multiline
																style={{
																	width: '100%',
																}}
																sx={{ ml: 1, flex: 1 }}
																type='text'
																onChange={(e) => {
																	const itemName = e.target.value
																	setItems((currentItem) =>
																		produce(currentItem, (v) => {
																			v[index].name = itemName
																		})
																	)
																}}
																value={item.name}
																placeholder='Name/Description'
															/>
														</StyledTableCell>
														{/* quantity */}
														<StyledTableCell align='right'>
															<InputBase
																sx={{ ml: 1, flex: 1 }}
																type='number'
																onChange={(e) => {
																	const quantity: number = +e.target.value;
																	setItems((currentItem) =>
																		produce(currentItem, (v) => {
																			v[index].quantity = quantity
																		})
																	)
																}}
																value={item.quantity}
																placeholder='0'
															/>
														</StyledTableCell>
														{/* unit price */}
														<StyledTableCell align='right'>
															<InputBase
																sx={{ ml: 1, flex: 1 }}
																type='number'
																onChange={(e) => {
																	const unitPrice: number = +e.target.value
																	setItems((currentItem) =>
																		produce(currentItem, (v) => {
																			v[index].unitPrice = unitPrice
																		})
																	)
																}}
																value={item.unitPrice}
																placeholder='0'
															/>
														</StyledTableCell>

														{/* discount */}
														<StyledTableCell align='right'>
															<InputBase
																sx={{ ml: 1, flex: 1 }}
																type='number'
																onChange={(e) => {
																	const discount = +e.target.value
																	setItems((currentItem) =>
																		produce(currentItem, (v) => {
																			v[index].discount = discount
																		})
																	)
																}}
																value={item.discount}
																placeholder='0'
															/>
														</StyledTableCell>

														{/* line total */}
														<StyledTableCell align='right'>
															<InputBase
																sx={{ ml: 1, flex: 1 }}
																disabled
																type='number'
																name='amount'
																value={(
																	item?.quantity * item.unitPrice -
																	(item.quantity * item.unitPrice * (item.discount ?? 0)) / 100
																)?.toFixed(2)}
															/>
														</StyledTableCell>

														<StyledTableCell align='right'>
															<IconButton
																onClick={() => {
																	setItems(items.filter((i) => i.name !== item.name))
																	setSubTotal(0)
																	setTotal(0)
																	setSalesTax(0)
																}}>
																<DeleteForeverIcon
																	style={{
																		width: '20px',
																		height: '20px',
																	}}
																	color='error'
																/>
															</IconButton>
														</StyledTableCell>
														{documentType === 'Order' && (
															<StyledTableCell align='right'>
																<IconButton
																	onClick={() => {
																		setItems(items.filter((i) => i.name !== item.name))
																		setSubTotal(0)
																		setTotal(0)
																		setSalesTax(0)
																	}}>
																	<BuildCircleOutlinedIcon
																		style={{
																			width: '20px',
																			height: '20px',
																		}}
																		color='success'
																	/>
																</IconButton>
															</StyledTableCell>
														)}
													</StyledTableRow>
												))}
											</TableBody>
										</Table>
									</TableContainer>
									<StyledItemButton
										// className='new-customer-btn'
										variant='contained'
										color='success'
										startIcon={<AddCircleOutlineIcon />}
										onClick={handleAddBillingItemsRow}>
										Add Item
									</StyledItemButton>
								</div>
							)}
							{/* delivery details*/}
							{viewShippingDetails && (
								<Grid
									rowSpacing={4}
									container
									sx={{
										padding: '24px 24px',
									}}>
									<Grid
										item
										xs={12}>
										<Typography elementType='p' text='ADDRESS DETAILS'/>
									</Grid>
									<Grid
										item
										xs={12}>
										<GeoAutocomplete
											placeholder='Find add'
											className='geo-auto-complete'
											style={autoCompleteStyle}
											apiKey='AIzaSyCBTqp3HnYj-Gj-g9hgYp9sYlGE2WURxwY'
											options={{
												types: ['geocode', 'establishment'],
											}}
											onPlaceSelected={(place) => {
												const addressObject = splitAddress(place.address_components)
												setAutoCompleteAddress(place)
												setDeliveryAddress(
													`${addressObject?.streetNumber} ${addressObject?.streetName}`
												)
												setDeliveryCity(addressObject?.city)
												setDeliveryState(addressObject?.state)
												setDeliveryCountry(addressObject?.country)
												setDeliveryPostcode(addressObject?.postcode)
											}}
										/>
									</Grid>
									<Grid
										item
										xs={12}>
										<TextField
											fullWidth
											variant='outlined'
											label='Street Address'
											value={deliveryAddress}
											onChange={(e) => setDeliveryAddress(e.target.value)}
										/>
									</Grid>

									<Grid
										item
										xs={12}>
										<TextField
											fullWidth
											variant='outlined'
											label='City/Suburb'
											value={deliveryCity}
											onChange={(e) => setDeliveryCity(e.target.value)}
										/>
									</Grid>
									<Grid
										item
										xs={12}>
										<TextField
											fullWidth
											variant='outlined'
											label='State/Territory'
											value={deliveryState}
											onChange={(e) => setDeliveryState(e.target.value)}
										/>
									</Grid>
									<Grid
										item
										xs={12}>
										<TextField
											fullWidth
											variant='outlined'
											label='Postcode'
											value={deliveryPostcode}
											onChange={(e) => setDeliveryPostcode(e.target.value)}
										/>
									</Grid>
									<Grid
										item
										xs={12}>
										<TextField
											fullWidth
											variant='outlined'
											label='Country'
											value={deliveryCountry}
											onChange={(e) => setDeliveryCountry(e.target.value)}
										/>
									</Grid>
									<Grid
										item
										xs={12}>
										<Box
											mt={1}
											sx={{
												display: 'flex',
												flexDirection: 'column',
											}}>
											<Typography
												elementType='p'
												text='Delivery Notes'
												style={{
													marginBottom: '10px',
													color: '#5a5a5a',
													textTransform: 'uppercase',
												}}/>

											<TextareaAutosize
												minRows={4}
												style={{
													fontFamily: 'poppins',
													border: 'solid 1px #d6d6d6',
													padding: '10px',
												}}
												// placeholder='Add a special note or memo to your customers,such as payment information/account'
												onChange={(e) => setDeliveryNotes(e.target.value)}
												value={deliveryNotes}
											/>
										</Box>
									</Grid>
								</Grid>
							)}
						</Grid>

						{/* summary section */}
						<Grid
							item
							md={3}
							sm={12}>
							<Box
								sx={{
									backgroundColor: '#f6fafb',
									borderRadius: '4px',
									margin: '20px',
									width: '90%',
									height: '95%',
									padding: '25px',
								}}>
								<Box
									sx={{
										fontWeight: '400',
										borderBottom: '1px solid #e1e1e1',
										paddingBottom: '20px',
										marginBottom: '20px',
										display: 'flex',
										justifyContent: 'space-between',
									}}>
									<Typography elementType='h6' text='Summary'/>
									<Tooltip title='Submit'>
										<Button
											color='success'
											style={{
												padding: '0 0 0 10px',
												color: '#a6aeb3',
											}}
											variant='text'
											startIcon={<DoneIcon />}
											type='submit'></Button>
									</Tooltip>
								</Box>

								<Box
									sx={{
										textAlign: 'left',
										borderBottom: '1px solid #e1e1e1',
										fontSize: 'small',
									}}>
									<div className='billItem'>
										<Typography elementType='p' text='Sub total:'/>
										<p>
											{currency} {subTotal?.toFixed(2)}
										</p>
									</div>
									<div className='billItem'>
										<Typography elementType='p' text='Tax:'/>
										<p>{salesTax?.toFixed(1)}</p>
									</div>
									<div className='billItem'>
										<Typography elementType='p' text='Total:'/>
										<h4>
											{currency}
											{addCurrencyCommas(total.toFixed(2))}
										</h4>
									</div>
								</Box>
								{/* dates */}
								<Grid
									item
									sx={{
										borderBottom: '1px solid #e1e1e1',
										fontSize: 'small',
									}}>
									<Typography
										text={`Date Created: ${format(new Date(), 'do MMMM yyyy')}`}
										style={{
											marginTop: '10px',
											display: 'flex',
											textTransform: 'uppercase',
											fontSize: 'small',
										}}/>
									<Typography
									text={`Due Date: ${dueDate && format(dueDate, 'do MMMM yyyy')}`}
										style={{
											marginBottom: '10px',
											marginTop: '10px',
											display: 'flex',
											textTransform: 'uppercase',
											fontSize: 'small',
										}}/>
								</Grid>
								<Grid
									item
									sx={{
										borderBottom: '1px solid #e1e1e1',
										fontSize: 'small',
									}}>
									<Typography
										text='Address Details'
										style={{
											marginTop:'20px',
											marginBottom:'20px',
											display: 'flex',
											textTransform: 'uppercase',
											fontSize: 'small',
										}}/>
									<Typography
										elementType='span'
										text={deliveryAddress}
										style={{marginBottom:'20px'}}/>
									<Typography
										text={`${deliveryCity} ${deliveryState} ${deliveryPostcode}`}
										style={{
											marginTop:'20px',
											marginBottom:'20px',
										}}
										elementType='span'/>
								</Grid>
								<Box sx={{ display: 'flex', justifyContent: 'center' }}>
									<Button
										variant='contained'
										type='submit'
										size='large'
										style={{
											marginTop: '20px',
											borderColor: 'rgb(17,65,141)',

											// '&:hover': {
											// 	bgcolor: 'rgb(17,65,141)',
											// 	color: 'white',
											// 	borderColor: 'rgb(17,65,141)',
											// },
										}}>
										SUBMIT
									</Button>
								</Box>
							</Box>
						</Grid>
					</Grid>
				</Box>
			)}
		</Container>
	)
}

export default DocCreateEditForm

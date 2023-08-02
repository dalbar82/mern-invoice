import styled from '@emotion/styled'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import DoneIcon from '@mui/icons-material/Done'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ClearIcon from '@mui/icons-material/Clear'
import { produce } from 'immer'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import {
	Box,
	Button,
	Container,
	Tooltip,
	Grid,
	IconButton,
	InputBase,
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	TextareaAutosize,
	TextField,
	Typography,
} from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

import Spinner from '../../../components/Spinner'
import StyledTableCell from '../../../components/StyledTableCell'
import StyledTableRow from '../../../components/StyledTableRow'
import currencies from '../../../world_currencies.json'
import {
	useCreateDocMutation,
	useGetSingleDocQuery,
	useUpdateDocMutation,
} from '../documentsApiSlice'

import { useGetAllCustomersQuery } from '../../customers/customersApiSlice'
import { addCurrencyCommas } from './components/addCurrencyCommas'
import DocumentType from './components/DocumentType'
import { docInitialState, itemsInitialState } from './initialState'

const StyledItemButton = styled(Button)({
	boxShadow: '0 0 0 0 #f0f0f0, 0 0 0 0 rgba(124, 105, 239, 1)',
})

const DocCreateEditForm = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const { data: customers } = useGetAllCustomersQuery()
	const { data: singleDoc } = useGetSingleDocQuery(id)

	const [createDoc, { isLoading, isSuccess }] = useCreateDocMutation()

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
	const [items, setItems] = useState(itemsInitialState)
	const [documentType, setDocumentType] = useState('Quotation')
	const [viewProjectDetails, setViewProjectDetails] = useState(true)
	const [viewItemDetails, setViewItemDetails] = useState(false)
	const [viewShippingDetails, setViewShippingDetails] = useState(false)

	const [currency, setCurrency] = useState(currencies[0].code)

	const [name, setName] = useState('')
	const [customer, setCustomer] = useState(null)
	const [salesTax, setSalesTax] = useState(10)
	const [total, setTotal] = useState(0)
	const [subTotal, setSubTotal] = useState(0)
	const [rates, setRates] = useState(0)
	const [status, setStatus] = useState('Not Paid')
	const [deliveryAddress, setDeliveryAddress] = useState()
	const [deliveryCity, setDeliveryCity] = useState('')
	const [deliveryState, setDeliveryState] = useState('')
	const [deliveryPostcode, setDeliveryPostcode] = useState('')
	const [deliveryCountry, setDeliveryCountry] = useState('')
	const [deliveryNotes, setDeliveryNotes] = useState('')

	const today = new Date()
	const docTypes = ['Invoice', 'Order', 'Quotation']

	const [dueDate, setDueDate] = useState(
		today.getTime() + 7 * 24 * 60 * 60 * 1000
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
			setDocData(doc)
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

	useEffect(() => {
		documentType === 'Order' ? setStatus('Paid') : setStatus('Not Paid')
	}, [documentType])

	const handleAddBillingItemsRow = (e) => {
		e.preventDefault()
		const insertAt = 0
		const nextItems = [
			...items.slice(0, insertAt),
			{
				itemName: '',
				unitPrice: '',
				quantity: '',
				discount: '',
			},
			...items.slice(insertAt),
		]
		setItems(nextItems)
	}

	const handleRates = (e) => {
		setRates(e.target.value)
	}

	useEffect(() => {
		const subTotal = () => {
			let amtArr = document.getElementsByName('amount')
			let subtotal = 0
			for (let i = 0; i < amtArr.length; i++) {
				if (amtArr[i].value) {
					subtotal += +amtArr[i].value
				}

				setSubTotal(subtotal)
			}
		}

		subTotal()
	}, [docData, items])

	useEffect(() => {
		const total = () => {
			const finalTotal = (rates / 100) * subTotal + subTotal
			setSalesTax((rates / 100) * subTotal)
			setTotal(finalTotal)
		}
		total()
	}, [docData, items, rates, subTotal])

	const location = useLocation()

	const createNewCustomer = () => {
		navigate('/create-customer', { state: { prevPath: location.pathname } })
	}

	const createUpdateDocHandler = async (e) => {
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
			} catch (err) {
				const message = err.data.message
				toast.error(message)
			}
		} else {
			try {
				await createDoc({
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
					paymentRecords: [],
					deliveryAddress,
					deliveryCity,
					deliveryState,
					deliveryPostcode,
					deliveryCountry,
					deliveryNotes,
				})
			} catch (err) {
				const message = err.data.message
				toast.error(message)
			}
		}
	}

	const switchPageView = (page) => {
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
				<Typography variant='h6'>Create/Edit Project</Typography>
				<Box>
					<Tooltip title='Cancel'>
						<Button
							sx={{ p: '15px 0px 15px 10px', color: '#a6aeb3' }}
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
									sx={{
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
									sx={{
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
									sx={{
										width: '250px',
										fontWeight: '400',
										borderBottom: '1px solid #e1e1e1',
										paddingBottom: '20px',
									}}>
									03. Delivery/Shipping
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
											variant='p'
											style={{
												color: '#5a5a5a',
												textTransform: 'uppercase',
											}}>
											Project Information
										</Typography>
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
										<Autocomplete
											style={{ marginRight: '20px' }}
											disablePortal
											id='documents-list'
											options={docTypes || []}
											renderInput={(params) => (
												<TextField
													{...params}
													label='Project Status'
												/>
											)}
											value={documentType}
											onChange={(event, value) => {
												setDocumentType(value)
											}}
										/>
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
												alignItems: 'flex-end',
											}}>
											<Typography
												variant='p'
												style={{
													color: '#5a5a5a',
													textTransform: 'uppercase',
												}}>
												Customer
											</Typography>
											{!customer && (
												<>
													<Grid item>
														<Tooltip title='Add new customer'>
															<Button
																startIcon={<AddCircleOutlineIcon />}
																color='secondary'
																sx={{ padding: '0' }}
																onClick={() => createNewCustomer()}
															/>
														</Tooltip>
													</Grid>
												</>
											)}
											{customer && (
												<Tooltip title='Choose another customer'>
													<Button
														sx={{ padding: '0', textTransform: 'none' }}
														mb={1}
														color='warning'
														onClick={() => setCustomer(null)}
														startIcon={<ChangeCircleIcon color='warning' />}
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
												label='select'
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
												variant='p'
												mb={1}
												style={{
													color: '#5a5a5a',
													textTransform: 'uppercase',
												}}>
												Additional Info
											</Typography>

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
											<TableHead>
												<TableRow>
													<StyledTableCell>#</StyledTableCell>
													<StyledTableCell width={'40%'}>Product</StyledTableCell>
													<StyledTableCell width={'12%'}>Qty</StyledTableCell>
													<StyledTableCell width={'12%'}>Unit Price</StyledTableCell>
													<StyledTableCell width={'10%'}>Disc(%)</StyledTableCell>
													<StyledTableCell>Line Total</StyledTableCell>
													<StyledTableCell>Remove</StyledTableCell>
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
														<StyledTableCell style={{ width: '40%' }}>
															<InputBase
																multiline
																style={{
																	width: '100%',
																}}
																outline='none'
																sx={{ ml: 1, flex: 1 }}
																type='text'
																onChange={(e) => {
																	const itemName = e.target.value
																	setItems((currentItem) =>
																		produce(currentItem, (v) => {
																			v[index].itemName = itemName
																		})
																	)
																}}
																value={item.itemName}
																placeholder='Name/Description'
															/>
														</StyledTableCell>
														{/* quantity */}
														<StyledTableCell align='right'>
															<InputBase
																sx={{ ml: 1, flex: 1 }}
																type='number'
																onChange={(e) => {
																	const quantity = e.target.value
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
																	const unitPrice = e.target.value
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
																	const discount = e.target.value
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
																	(item.quantity * item.unitPrice * item.discount) / 100
																).toFixed(2)}
															/>
														</StyledTableCell>

														<StyledTableCell align='right'>
															<IconButton
																onClick={() => {
																	setItems(items.filter((i) => i.itemName !== item.itemName))
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
							{/* TODO - setup T&C's in admin page */}
							{/* <Box
								sx={{
									marginTop: '20px',
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}>
								<Box>
									<Typography
										variant='h4'
										sx={{ color: 'rgb(17,65,141)' }}>
										Terms & Conditions
									</Typography>

									<TextareaAutosize
										minRows={4}
										style={{
											width: 350,
											border: 'solid 1px #d6d6d6',
											padding: '10px',
										}}
										placeholder='Add legal terms or conditions, such as your return/refund policy, shipping info, product warranties or privacy policy'
										onChange={(e) =>
											setDocData({
												...docData,
												termsConditions: e.target.value,
											})
										}
										value={docData.termsConditions}
									/>
								</Box>
							</Box> */}
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
										<Typography variant='p'>DELIVERY DETAILS</Typography>
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
												variant='p'
												mb={1}
												style={{
													color: '#5a5a5a',
													textTransform: 'uppercase',
												}}>
												Delivery Notes
											</Typography>

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
									<Typography variant='h6'>Summary</Typography>
									<Tooltip title='Submit'>
										<Button
											color='success'
											sx={{
												p: '0 0 0 10px',
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
										<Typography variant='p'>Sub total:</Typography>
										<p>
											{currency} {subTotal.toFixed(2)}
										</p>
									</div>
									<div className='billItem'>
										<Typography variant='p'>Tax:</Typography>
										<p>{salesTax.toFixed(1)}</p>
									</div>
									<div className='billItem'>
										<Typography variant='p'>Total:</Typography>
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
										mt={3}
										sx={{
											display: 'flex',
											textTransform: 'uppercase',
											fontSize: 'small',
										}}>
										Date Created: {format(new Date(), 'do MMMM yyyy')}
									</Typography>
									<Typography
										mt={3}
										mb={3}
										sx={{
											display: 'flex',
											textTransform: 'uppercase',
											fontSize: 'small',
										}}>
										Due Date: {dueDate && format(dueDate, 'do MMMM yyyy')}
									</Typography>
								</Grid>
								<Grid
									item
									sx={{
										borderBottom: '1px solid #e1e1e1',
										fontSize: 'small',
									}}>
									<Typography
										mt={3}
										mb={3}
										sx={{
											display: 'flex',
											textTransform: 'uppercase',
											fontSize: 'small',
										}}>
										Delivery Details
									</Typography>
									<Typography
										mt={3}
										variant='body1'>
										{deliveryAddress},
									</Typography>
									<Typography
										mt={3}
										mb={3}
										variant='body1'>
										{deliveryCity} {deliveryState} {deliveryPostcode}
									</Typography>
								</Grid>
								<Box sx={{ display: 'flex', justifyContent: 'center' }}>
									<Button
										variant='contained'
										type='submit'
										size='large'
										sx={{
											marginTop: '20px',
											borderColor: 'rgb(17,65,141)',

											'&:hover': {
												bgcolor: 'rgb(17,65,141)',
												color: 'white',
												borderColor: 'rgb(17,65,141)',
											},
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

import ClearIcon from '@mui/icons-material/Clear'
import DoneIcon from '@mui/icons-material/Done'
import {
	Box,
	Button,
	Container,
	Tooltip,
	Grid,
	TextField,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../../components/Spinner'
import {
	useGetSingleCustomerQuery,
	useUpdateCustomerInfoMutation,
} from '../customersApiSlice'
import '../../../styles/pageHeader.css'

const CustomerEditForm = () => {
	const { custId } = useParams()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [abn, setAbn] = useState(0)
	const [address, setAddress] = useState('')
	const [city, setCity] = useState('')
	const [country, setCountry] = useState('')

	const navigate = useNavigate()
	// -1 means go back to the previous page where you came from
	const goBack = () => navigate(-1)

	const { data } = useGetSingleCustomerQuery(custId)

	const [updateCustomerInfo, { isLoading, isSuccess, data: updateData }] =
		useUpdateCustomerInfoMutation()

	useEffect(() => {
		const customer = data?.customer
		if (customer) {
			setName(customer.name)
			setEmail(customer.email)
			setPhoneNumber(customer.phoneNumber)
			setAbn(customer.abn)
			setAddress(customer.address)
			setCity(customer.city)
			setCountry(customer.country)
		}
	}, [data])

	useEffect(() => {
		if (isSuccess) {
			navigate('/customers')
			const message = updateData?.message
			toast.success(message)
		}
	}, [isSuccess, navigate, updateData])

	const updateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			const userData = {
				name,
				email,
				phoneNumber,
				abn,
				address,
				city,
				country,
			}
			await updateCustomerInfo({ id: data?.customer._id, ...userData }).unwrap()
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<div className='drawer'>
			<Container
				className='drawer-page'
				component='main'
				sx={{
					mt: 14,
					ml: 15,
				}}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
					component='form'
					noValidate
					autoComplete='off'
					onSubmit={updateHandler}>
					<Box className='page-header'>
						<Typography variant='h6'>Edit Customer</Typography>

						<Box>
							<Tooltip title='Submit'>
								<Button
									color='success'
									sx={{ p: '15px 0px 15px 10px', color: '#a6aeb3' }}
									variant='text'
									startIcon={<DoneIcon />}
									type='submit'></Button>
							</Tooltip>
							<Tooltip title='Cancel'>
								<Button
									sx={{ p: '15px 0px 15px 10px', color: '#a6aeb3' }}
									variant='text'
									startIcon={<ClearIcon />}
									onClick={goBack}></Button>
							</Tooltip>
						</Box>
					</Box>
					<Grid
						item
						xs={12}></Grid>
					{isLoading ? (
						<Spinner />
					) : (
						<Box
							sx={{
								pb: '40px',
							}}>
							<Grid
								container
								spacing={2}>
								<Grid
									item
									md={6}>
									{/* customer name */}
									<TextField
										variant='filled'
										required
										fullWidth
										id='name'
										label='Customer Full Name'
										name='name'
										margin='normal'
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</Grid>
								<Grid
									item
									md={6}>
									{/* customer Email */}
									<TextField
										variant='filled'
										required
										fullWidth
										id='email'
										label='Email Address'
										name='email'
										margin='normal'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</Grid>
								<Grid
									item
									md={6}>
									{/* Phone Number */}
									<TextField
										variant='filled'
										required
										fullWidth
										id='phoneNumber'
										label='Phone Number'
										name='phoneNumber'
										margin='normal'
										value={phoneNumber}
										onChange={(e) => setPhoneNumber(e.target.value)}
									/>
								</Grid>
								<Grid
									item
									md={6}>
									{/* ABN */}
									<TextField
										variant='filled'
										fullWidth
										id='abn'
										label='ABN'
										name='abn'
										margin='normal'
										value={abn}
										onChange={(e) => setAbn(parseInt(e.target.value))}
									/>
								</Grid>
								<Grid
									item
									md={6}>
									{/* Address */}
									<TextField
										variant='filled'
										fullWidth
										id='address'
										label='Address'
										name='address'
										margin='normal'
										value={address}
										onChange={(e) => setAddress(e.target.value)}
									/>
								</Grid>
								<Grid
									item
									md={6}>
									{/* City */}
									<TextField
										variant='filled'
										fullWidth
										id='city'
										label='City'
										name='city'
										margin='normal'
										value={city}
										onChange={(e) => setCity(e.target.value)}
									/>
								</Grid>
							</Grid>
							{/* Country */}
							<TextField
								variant='filled'
								fullWidth
								id='country'
								label='Country'
								name='country'
								margin='normal'
								value={country}
								onChange={(e) => setCountry(e.target.value)}
							/>
						</Box>
					)}
				</Box>
			</Container>
		</div>
	)
}

export default CustomerEditForm

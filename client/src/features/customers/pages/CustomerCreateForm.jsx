import ClearIcon from '@mui/icons-material/Clear'
import DoneIcon from '@mui/icons-material/Done'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import {
	Button,
	Container,
	FormHelperText,
	Grid,
	TextField,
	Typography,
	Box,
	Tooltip,
} from '@mui/material'
import { useEffect } from 'react'
import { Formik } from 'formik'
import Spinner from '../../../components/Spinner'
import useTitle from '../../../hooks/useTitle'
import { useCreateCustomerMutation } from '../customersApiSlice'

const CustomerCreateForm = () => {
	useTitle('Create Customer')
	const navigate = useNavigate()
	const location = useLocation()
	const goBack = () => navigate(-1)

	const from = location.state?.from?.pathname || '/customers'

	const [createCustomer, { isSuccess, isLoading }] = useCreateCustomerMutation()

	useEffect(() => {
		if (isSuccess) {
			navigate(from, { replace: true })
		}
	}, [isSuccess, navigate, from])

	const userSchema = Yup.object().shape({
		name: Yup.string().max(255).required('A customer must have a name'),
		email: Yup.string()
			.email('Must be a valid email')
			.max(255)
			.required('Email is required'),
		phoneNumber: Yup.string()
			.max(20)
			.required(
				"Your mobile phone number must begin with a '+', followed by your country code then actual number e.g +254123456789"
			),
	})

	return (
		<>
			<Formik
				initialValues={{
					name: '',
					email: '',
					phoneNumber: '',
					vatTinNo: 0,
					address: '',
					city: '',
					country: '',
				}}
				validationSchema={userSchema}
				onSubmit={async (values, { setStatus, setSubmitting }) => {
					try {
						await createCustomer(values).unwrap()
						setStatus({ success: true })
						setSubmitting(false)
					} catch (err) {
						const message = err.data.message
						toast.error(message)
						setStatus({ success: false })
						setSubmitting(false)
					}
				}}>
				{({
					errors,
					handleBlur,
					handleChange,
					handleSubmit,
					isSubmitting,
					touched,
					values,
				}) => (
					<>
						<div className='drawer'>
							<Container
								className='drawer-page'
								component='main'
								sx={{
									mt: 14,
									ml: 15,
									pb: 3
								}}>
								<form
									noValidate
									autoComplete='off'
									onSubmit={handleSubmit}>
									<Grid>
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
											<Typography variant='h6'>New Customer</Typography>

											<Box>
												<Tooltip
													title={
														!values.email || !values.phoneNumber || !values.name
															? 'Fill in all required'
															: 'Submit'
													}>
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
										{isLoading ? (
											<Spinner />
										) : (
											<Grid
												container
												spacing={2}>
												<Grid
													item
													md={12}>
													{/* Name */}
													<TextField
														variant='filled'
														label='Customer Name*'
														margin='normal'
														fullWidth
														error={Boolean(touched.name && errors.name)}
														id='customer-name'
														type='name'
														value={values.name}
														name='name'
														onBlur={handleBlur}
														onChange={handleChange}
														placeholder='John Smith'
														inputProps={{}}
													/>
													{touched.name && errors.name && (
														<FormHelperText
															error
															id='helper-text-customer-name'>
															{errors.name}
														</FormHelperText>
													)}
													{/* email address */}
													<TextField
														label='Email*'
														variant='filled'
														margin='normal'
														fullWidth
														error={Boolean(touched.email && errors.email)}
														id='email-signup'
														type='email'
														value={values.email}
														name='email'
														onBlur={handleBlur}
														onChange={handleChange}
														placeholder='email@example.com'
														inputProps={{}}
													/>
													{touched.email && errors.email && (
														<FormHelperText
															error
															id='helper-text-email-signup'>
															{errors.email}
														</FormHelperText>
													)}
													{/* phone number */}
													<TextField
														variant='filled'
														label='Phone*'
														margin='normal'
														fullWidth
														error={Boolean(touched.phoneNumber && errors.phoneNumber)}
														id='customer-phoneNumber'
														type='phoneNumber'
														value={values.phoneNumber}
														name='phoneNumber'
														onBlur={handleBlur}
														onChange={handleChange}
														placeholder='e.g +254710123456 - must be a valid mobile phone number with country code.'
														inputProps={{}}
													/>
													{touched.phoneNumber && errors.phoneNumber && (
														<FormHelperText
															error
															id='helper-text-customer-phoneNumber'>
															{errors.phoneNumber}
														</FormHelperText>
													)}
													{/* VatTinNo */}
													<TextField
														variant='filled'
														label='VAT'
														margin='normal'
														fullWidth
														error={Boolean(touched.vatTinNo && errors.vatTinNo)}
														id='customer-vatTin'
														type='vatTinNo'
														value={values.vatTinNo}
														name='vatTinNo'
														onBlur={handleBlur}
														onChange={handleChange}
														placeholder='e.g +254710123456 - must be a valid phone number with country code.'
														inputProps={{}}
													/>
													{touched.vatTinNo && errors.vatTinNo && (
														<FormHelperText
															error
															id='helper-text-vatTinNo'>
															{errors.vatTinNo}
														</FormHelperText>
													)}

													{/* Address */}
													<TextField
														variant='filled'
														label='Address'
														margin='normal'
														fullWidth
														error={Boolean(touched.address && errors.address)}
														id='customer-address'
														type='address'
														value={values.address}
														name='address'
														onBlur={handleBlur}
														onChange={handleChange}
														placeholder='101 James Doolittle Blvd'
														inputProps={{}}
													/>
													{touched.address && errors.address && (
														<FormHelperText
															error
															id='helper-text-address'>
															{errors.address}
														</FormHelperText>
													)}
													{/* City */}
													<TextField
														variant='filled'
														label='City'
														margin='normal'
														fullWidth
														error={Boolean(touched.city && errors.city)}
														id='customer-city'
														type='city'
														value={values.city}
														name='city'
														onBlur={handleBlur}
														onChange={handleChange}
														placeholder='e.g Nairobi'
														inputProps={{}}
													/>
													{touched.city && errors.city && (
														<FormHelperText
															error
															id='helper-text-vatTinNo'>
															{errors.city}
														</FormHelperText>
													)}
													{/* Country */}
													<TextField
														variant='filled'
														label='Country'
														margin='normal'
														fullWidth
														error={Boolean(touched.country && errors.country)}
														id='customer-country'
														type='country'
														value={values.country}
														name='country'
														onBlur={handleBlur}
														onChange={handleChange}
														placeholder='e.g Nairobi'
														inputProps={{}}
													/>
													{touched.country && errors.country && (
														<FormHelperText
															error
															id='helper-text-vatTinNo'>
															{errors.country}
														</FormHelperText>
													)}
												</Grid>
											</Grid>
										)}
									</Grid>
								</form>
							</Container>
						</div>
					</>
				)}
			</Formik>
		</>
	)
}

export default CustomerCreateForm

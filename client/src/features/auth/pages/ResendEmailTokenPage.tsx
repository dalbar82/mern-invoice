import SendIcon from '@mui/icons-material/Send'
import {
	Box,
	Button,
	Container,
	FormHelperText,
	Grid,
	InputLabel,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { Formik } from 'formik'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import Spinner from '../../../components/Spinner'
import useTitle from '../../../hooks/useTitle'
import { useResendVerifyEmailMutation } from '../authApiSlice'
import AuthWrapper from '../forms/AuthWrapper'
import Logo from '../../../components/Navbar/Logo'

const ResendEmailTokenPage = () => {
	useTitle('Resend Verification Email')

	const navigate = useNavigate()
	const goBack = () => navigate(-1)

	const [resendVerifyEmail, { data, isLoading, isSuccess }] =
		useResendVerifyEmailMutation()

	useEffect(() => {
		if (isSuccess) {
			navigate('/')
			const message = data.message
			toast.success(message)
		}
	}, [data, isSuccess, navigate])

	return (
		<>
			<Formik
				initialValues={{ email: '' }}
				validationSchema={Yup.object().shape({
					email: Yup.string()
						.email('Must be a valid email')
						.max(255)
						.required('Email is required'),
				})}
				onSubmit={async (values, { setStatus, setSubmitting }) => {
					try {
						await resendVerifyEmail(values).unwrap()

						setStatus({ success: true })
						setSubmitting(false)
					} catch (err: unknown) {
						if (err instanceof Error) {
							const message = err?.message
							toast.error(message)
							setStatus({ success: false })
							setSubmitting(false)
						} else {
							console.error("Unknown error:", err);
						}
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
					<AuthWrapper>
						<Container
							component='main'
							maxWidth='xs'
							sx={{
								py: 2,
							}}>
							<form
								noValidate
								autoComplete='off'
								onSubmit={handleSubmit}>
								<Grid>
									<Grid
										item
										xs={12}>
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'center',
												alignItems: 'center',
												mb: '20px',
											}}>
											{' '}
											<Logo fontSize='2rem' />
											<Typography
												variant='h6'
												sx={{ fontFamily: 'quicksand', fontWeight: '600' }}>
												Resend Verification
											</Typography>
										</Box>
									</Grid>
								</Grid>
								{isLoading ? (
									<Spinner />
								) : (
									<Grid container>
										<Grid
											item
											xs={12}>
											<Stack spacing={1}>
												<InputLabel
													htmlFor='email-signup'
													sx={{ fontSize: 'small' }}>
													Email*
												</InputLabel>
												<TextField
													variant='filled'
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
											</Stack>
										</Grid>
										{/* button */}
										<Grid
											item
											xs={12}
											sx={{ marginTop: '10px' }}>
											<Button
												sx={{ mt: 3, mb: 2, backgroundColor: 'rgb(25, 142, 189)' }}
												type='submit'
												fullWidth
												variant='contained'
												color='primary'
												size='large'
												endIcon={<SendIcon />}
												disabled={!values.email}>
												Resend Verification Email
											</Button>
										</Grid>
										{/* go back button */}
										<Grid
											item
											xs={12}>
											<Button
												variant='contained'
												color='primary'
												size='large'
												fullWidth
												onClick={goBack}>
												Go Back
											</Button>
										</Grid>
									</Grid>
								)}
							</form>
						</Container>
					</AuthWrapper>
				)}
			</Formik>
		</>
	)
}

export default ResendEmailTokenPage

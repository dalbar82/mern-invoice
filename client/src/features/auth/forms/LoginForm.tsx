import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import {
	Box,
	Button,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	TextField,
	Stack,
} from '@mui/material'
import Typography from '../../../components/Typography/Typography'
import Link from '../../../components/Links/pageLinks/Link'
import { Formik } from 'formik'
import Spinner from '../../../components/Spinner'
import useTitle from '../../../hooks/useTitle'
import { useLoginUserMutation } from '../authApiSlice'
import { logIn } from '../authSlice'

const LoginForm = () => {
	useTitle('Login - JobForge')

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const location = useLocation()

	const from = location.state?.from?.pathname || '/dashboard'

	const [showPassword, setShowPassword] = useState(false)

	const handleShowHidePassword = () => {
		setShowPassword(!showPassword)
	}

	const handleMouseDownPassword = (event: React.MouseEvent) => {
		event.preventDefault()
	}

	const [loginUser, { data, isLoading, isSuccess }] = useLoginUserMutation()

	useEffect(() => {
		if (isSuccess) {
			navigate(from, { replace: true })
		}
	}, [data, isSuccess, navigate, from])

	return (
		<>
			<Formik
				initialValues={{
					email: '',
					password: '',
					submit: null,
				}}
				validationSchema={Yup.object().shape({
					email: Yup.string()
						.email('Must be a valid email')
						.max(255)
						.required('Email is required'),
					password: Yup.string().max(255).required('Password is required'),
				})}
				onSubmit={async (values, { setStatus, setSubmitting }) => {
					try {
						const getUserCredentials = await loginUser(values).unwrap()
						dispatch(logIn({ ...getUserCredentials }))
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
					<form
						noValidate
						autoComplete='off'
						onSubmit={handleSubmit}>
						{isLoading ? (
							<Spinner />
						) : (
							<Grid
								container
								spacing={3}>
								{/* Email */}
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
											id='email-signup'
											value={values.email}
											name='email'
											onBlur={handleBlur}
											onChange={handleChange}
											placeholder='email@example.com'
											inputProps={{}}
											fullWidth
											error={Boolean(touched.email && errors.email)}
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
								{/* password */}
								<Grid
									item
									xs={12}>
									<Stack spacing={1}>
										<InputLabel
											htmlFor='password-signup'
											sx={{ fontSize: 'small' }}>
											Password*
										</InputLabel>
										<TextField
											variant='filled'
											fullWidth
											error={Boolean(touched.password && errors.password)}
											id='password-signup'
											type={showPassword ? 'text' : 'password'}
											value={values.password}
											name='password'
											onBlur={handleBlur}
											onChange={(e) => {
												handleChange(e)
											}}
											InputProps={{
												endAdornment: (
													<InputAdornment position='end'>
														<IconButton
															aria-label='toggle password visiblity'
															onClick={handleShowHidePassword}
															onMouseDown={handleMouseDownPassword}
															edge='end'
															size='large'>
															{showPassword ? <Visibility /> : <VisibilityOff />}
														</IconButton>
													</InputAdornment>
												),
											}}
											placeholder='******'
											inputProps={{}}
										/>
										{touched.password && errors.password && (
											<FormHelperText
												error
												id='helper-text-password-signup'>
												{errors.password}
											</FormHelperText>
										)}
									</Stack>
								</Grid>
								{/* forgot password */}
								<Grid
									item
									xs={12}>
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
										}}>
										<Typography
											elementType='p'
											style={{ textDecoration: 'none', fontSize: 'small' }}
											text='Forgot Password?'
											>
											
											<Link
												component={RouterLink}
												linkTo='/reset_password_request'
												styles={{ textDecoration: 'none', fontSize: 'small' }}
												name='Click Here to Reset it'/>
										</Typography>
									</Box>
								</Grid>
								{/* Login Button */}
								<Grid
									item
									xs={12}>
										<Button
											disableElevation
											disabled={isSubmitting}
											fullWidth
											size='large'
											type='submit'
											variant='contained'
											sx={{
												backgroundColor: 'rgb(25, 142, 189)',
											}}>
											Login
										</Button>

								</Grid>
							</Grid>
						)}
					</form>
				)}
			</Formik>
		</>
	)
}

export default LoginForm

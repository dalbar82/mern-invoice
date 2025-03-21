import SendIcon from '@mui/icons-material/Send'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
	Box,
	Button,
	Container,
	FormControl,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	TextField,
	Stack,
	Typography,
} from '@mui/material'
import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import Spinner from '../../../components/Spinner'
import useTitle from '../../../hooks/useTitle'
import {
	strengthColor,
	strengthIndicator,
} from '../../../utils/password-strength'
import { useResetPasswordMutation } from '../authApiSlice'
import AuthWrapper from '../forms/AuthWrapper'
import Logo from '../../../components/Navbar/Logo'

const PasswordResetPage = () => {
	useTitle('Request Reset Password')
	const navigate = useNavigate()

	// level state will help manage the color to display when passwordConfirm field is  changed
	const [level, setLevel] = useState({
		color: '',
		label: ''
	})

	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const handleShowHidePassword = () => {
		setShowPassword(!showPassword)
	}

	const handleShowHideConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword)
	}

	// prevent default behavior when a mouse is pressed when the pointer is inside the passwordConfirm field
	const handleMouseDownPassword = (event: React.MouseEvent) => {
		event.preventDefault()
	}

	// when the password is typed/changed run this function to show the password strength
	const changePassword = (value: string) => {
		const temp: number = strengthIndicator(value)
		setLevel(strengthColor(temp))
	}
	useEffect(() => {
		changePassword('')
	}, [])

	const [resetPassword, { data, isLoading, isSuccess }] =
		useResetPasswordMutation()

	useEffect(() => {
		if (isSuccess) {
			navigate('/login')
			const message = data.message
			toast.success(message)
		}
	}, [data, isSuccess, navigate])

	return (
		<>
			<Formik
				initialValues={{ password: '', passwordConfirm: '' }}
				validationSchema={Yup.object().shape({
					password: Yup.string().max(255).required('Password is required'),
					passwordConfirm: Yup.string()
						// reference the password field and check if passwords match
						.oneOf([Yup.ref('password')], 'Passwords Must Match')
						.required('Please confirm your password'),
				})}
				onSubmit={async (values, { setStatus, setSubmitting }) => {
					try {
						await resetPassword(values).unwrap()
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
												marginBottom: '20px',
											}}>
											{' '}
											<Logo fontSize='2rem' />
											<Typography
												variant='h6'
												sx={{ fontFamily: 'Poppins', fontWeight: '600' }}>
												Reset Password?
											</Typography>
										</Box>
									</Grid>
								</Grid>
								{isLoading ? (
									<Spinner />
								) : (
									<Grid container>
										{/* password */}
										<Grid
											item
											xs={12}>
											<Stack spacing={1}>
												<InputLabel
													htmlFor='password-signup'
													sx={{ fontSize: 'small' }}>
													Password
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
														changePassword(e.target.value)
													}}
													placeholder='******'
													InputProps={{
														endAdornment: (
															<InputAdornment position="end">
																<IconButton
																	aria-label="toggle password visibility"
																	onClick={handleShowHidePassword}
																	onMouseDown={handleMouseDownPassword}
																	edge="end"
																	size="large"
																>
																	{showPassword ? <Visibility /> : <VisibilityOff />}
																</IconButton>
															</InputAdornment>
														),
													}}
												/>
												{touched.password && errors.password && (
													<FormHelperText
														error
														id='helper-text-password-signup'>
														{errors.password}
													</FormHelperText>
												)}
											</Stack>
											{/* password strength indicator */}
											<FormControl
												fullWidth
												sx={{ mt: '10px', mb: '20px' }}>
												<Grid
													container
													spacing={2}
													alignItems='center'>
													<Grid item>
														<Box
															sx={{
																bgcolor: level?.color,
																width: 350,
																height: 8,
																borderRadius: '7px',
															}}
														/>
													</Grid>
													<Grid item>
														<Typography
															variant='subtitle1'
															fontSize='0.75rem'>
															{level?.label}
														</Typography>
													</Grid>
												</Grid>
											</FormControl>
										</Grid>

										{/* passwordConfirm */}
										<Grid
											item
											xs={12}>
											<Stack spacing={1}>
												<InputLabel
													htmlFor='passwordConfirm-signup'
													sx={{ fontSize: 'small' }}>
													Confirm Password
												</InputLabel>
												<TextField
													variant='filled'
													fullWidth
													error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
													id='passwordConfirm-signup'
													type={showConfirmPassword ? 'text' : 'password'}
													value={values.passwordConfirm}
													name='passwordConfirm'
													onBlur={handleBlur}
													onChange={handleChange}
													placeholder='******'
													InputProps={{
														endAdornment: (
															<InputAdornment position="end">
																<IconButton
																	aria-label="toggle password visibility"
																	onClick={handleShowHidePassword}
																	onMouseDown={handleMouseDownPassword}
																	edge="end"
																	size="large"
																>
																	{showPassword ? <Visibility /> : <VisibilityOff />}
																</IconButton>
															</InputAdornment>
														),
													}}
												/>
												{touched.passwordConfirm && errors.passwordConfirm && (
													<FormHelperText
														error
														id='helper-text-passwordConfirm-signup'>
														{errors.passwordConfirm}
													</FormHelperText>
												)}
											</Stack>
										</Grid>
										{/* button */}
										<Grid
											item
											xs={12}>
											<Button
												sx={{ mt: 3, mb: 2 }}
												type='submit'
												fullWidth
												variant='contained'
												color='primary'
												size='large'
												endIcon={<SendIcon />}
												disabled={!values.password && !values.passwordConfirm}>
												Reset Password
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

export default PasswordResetPage

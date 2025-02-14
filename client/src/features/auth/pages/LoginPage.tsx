import { Box, Container, Divider, Grid } from '@mui/material'
import Typography from '../../../components/Typography/Typography'
import Link from '../../../components/Links/pageLinks/Link'
import { Link as RouterLink } from 'react-router-dom'
import GoogleLogin from '../../../components/GoogleLogin'
import AuthWrapper from '../forms/AuthWrapper'
import LoginForm from '../forms/LoginForm'
import Logo from '../../../components/Navbar/Logo'
import '../../../styles/loggingPages.css'

const LoginPage = () => {
	return (
		<AuthWrapper>
			<Container
				component='main'
				maxWidth='xs'>
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
							}}>
							<Logo fontSize='2rem' />
							<Typography
								elementType='h6'
								style={{ fontWeight: 600, marginBottom: '20px', fontFamily: 'Quicksand' }}
								text='Sign-In'
								/>
						</Box>
					</Grid>
					{/* login form */}
					<LoginForm />
					{/* or sign in with Google */}
					<Grid
						item
						xs={12}>
						<Box
							sx={{
								alignItems: 'center',
								display: 'flex',
								mt: 2,
							}}>
							<Divider
								sx={{ flexGrow: 1 }}
								orientation='horizontal'
							/>
							<Typography
								// variant="outlined"
								text='Or Sign-In with Google'
								style={{
									margin: '10px',
									fontSize: 'small',
								}}/>
							<Divider
								sx={{ flexGrow: 1 }}
								orientation='horizontal'
							/>
						</Box>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								marginBottom: '20px',
								marginTop: '10px',
							}}>
							<GoogleLogin />
						</Box>
					</Grid>

					{/* resend email verification button */}
					<Grid
						item
						xs={12}>
						<Box
							sx={{
								justifyContent: 'center',
								display: 'flex',
								alignItems: 'center',
							}}>
							<Typography
								elementType='p'
								style={{ fontSize: 'small' }}
								text="Didn't get the verification email?"
								>
								
								<Link
									component={RouterLink}
									linkTo='/resend'
									styles={{ textDecoration: 'none', marginLeft: '5px' }}
									name='Resend Email'
									/>
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</AuthWrapper>
	)
}

export default LoginPage

import {
	Box,
	Container,
	Divider,
	Grid,
	Link,
	Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import GoogleLogin from "../../../components/GoogleLogin";
import AuthWrapper from "../forms/AuthWrapper";
import LoginForm from "../forms/LoginForm";
import Logo from '../../../components/Navbar/Logo'
import '../../../styles/loggingPages.css'

const LoginPage = () => {
	return (
		<AuthWrapper>
			<Container
				component="main"
				maxWidth="xs"
			>
				<Grid>
					<Grid item xs={12}>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Logo fontSize="2rem" />
							<Typography variant="h6" sx={{fontWeight: 600, marginBottom: '20px', fontFamily: 'Quicksand'}}>Sign-In</Typography>
						</Box>
						
					</Grid>
					{/* login form */}
					<LoginForm />
					{/* or sign in with Google */}
					<Grid item xs={12}>
						<Box
							sx={{
								alignItems: "center",
								display: "flex",
								mt: 2,
							}}
						>
							<Divider
								sx={{ flexGrow: 1 }}
								orientation="horizontal"
							/>
							<Typography
								// variant="outlined"
								sx={{
									margin: '10px',
									fontSize: 'small'
								}}
							>
								Or Sign-In with Google
							</Typography>
							<Divider
								sx={{ flexGrow: 1 }}
								orientation="horizontal"
							/>
						</Box>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								marginBottom: '20px',
								marginTop: '10px'
							}}
						>
							<GoogleLogin />
						</Box>
					</Grid>
					
					
					{/* resend email verification button */}
					<Grid item xs={12}>
						<Box
							sx={{
								justifyContent: "center",
								display: "flex",
								alignItems: "center"
							}}
						>
							<Typography variant="p" sx={{ fontSize: 'small' }}>
								Didn't get the verification email?
								<Link
									variant="p"
									component={RouterLink}
									to="/resend"
									sx={{ textDecoration: "none",
									marginLeft: '5px' }}
								>
									Resend Email
								</Link>
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</AuthWrapper>
	);
};

export default LoginPage;

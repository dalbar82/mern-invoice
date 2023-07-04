import { Box, Button, Grid, Link, styled, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import "../styles/homepage.css";

const StyledTypography = styled(Typography)(({ theme }) => ({
	fontSize: "4rem",
	[theme.breakpoints.down("sm")]: {
		fontSize: "2rem",
	},
}));

const CreateAccountButton = styled(Button)({
	borderRadius: "5px",
	backgroundColor: '#777fd7',
	"&:hover": {
		boxShadow: "none",
		backgroundColor: '#777fd7',
	},
});

const HomePage = () => {
	const navigate = useNavigate();
	return (
		<>
			<header className="masthead main-bg-image">
				<Grid>
					<Grid item md={12} lg={12} sm={6} sx={{
						    backgroundColor: '#2b2b3a',
								paddingBottom: '50px'
					}}>
						<Box sx={{ display: "flex", flexDirection: "column",  width:'80%', margin: 'auto'}}>
						<Typography
								align="center"
								variant="span"
								component="div"
								gutterBottom
								sx={{ color: "rgba(255,255,255,0.6)" }}
							>
								Whatever business you run, creating
								Invoices, Receipts and Quotations is made easy
								with Job Forge.
							</Typography>
							<Typography
								align="center"
								variant="span"
								component="div"
								gutterBottom
								sx={{ color: "rgba(255,255,255,0.6)" }}
							>
								Whatever business you run, creating
								Invoices, Receipts and Quotations is made easy
								with Job Forge.
							</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								mt: 5,
							}}
						>
							<CreateAccountButton
								variant="contained"
								onClick={() => navigate("/register")}
							>
								<Link
									component={RouterLink}
									to="/register"
									sx={{
										textDecoration: "none",
										color: "white"
									}}
								>
									Create Account
								</Link>
							</CreateAccountButton>
						</Box>
					</Grid>
				</Grid>
			</header>
		</>
	);
};

export default HomePage;
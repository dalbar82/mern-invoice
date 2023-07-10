import { Box, Button, Grid, Link, styled } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import JobForgeModularDiagram from "../components/JobForgeModularDiagram";
import "../styles/homepage.css";

const CreateAccountButton = styled(Button)({
	borderRadius: "5px",
	textTransform: 'none',
	marginRight: '10px',
	"&:hover": {
		boxShadow: "none",
	},
});

const HomePage = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className="container" style={{height: '100vh'}}>
				<Grid container pt={'12vh'} sx={{lineHeight: '1.6'}}>
					<Grid item xs={12} sm={12} md={6} mt={10} pl={'6.5%'}>
						<Box mb={'10%'} sx={{ fontSize: '1.8rem', fontWeight: 600, color: "#dbd7d7"}}>
							The ultimate management tool for your business. Use the app that grows with your company.
						</Box>
						<Box mb={'10%'} sx={{ fontSize: '1.5rem', color: "#288bbf" }}>
							We work on the philosophy that not all businesses share the same requirements, so why should you pay for things you don't need yet?
						</Box>
						<Box mb={'25%'} sx={{ fontSize: '1rem', color: "#dbd7d7" }}>
							Here at JobForge we have coined the acronym <u>NoPayN</u> which simply means <strong>Now only Pay as you Need!</strong>
						</Box>
						<Box mt={15}>
							<CreateAccountButton variant="contained" onClick={() => navigate("/login")}>
								<Link
									component={RouterLink}
									to="/login"
									sx={{
										textDecoration: "none",
										color: "white"
									}}
								>
									Login
								</Link>
							</CreateAccountButton>
							<CreateAccountButton
								variant="contained"
								color='info'
								onClick={() => navigate("/login")}
							>
								<Link
									component={RouterLink}
									to="/"
									sx={{
										textDecoration: "none",
										color: "white"
									}}
								>
									Request Demo
								</Link>
							</CreateAccountButton>
						</Box>
					</Grid>

					<Grid item xs={12} sm={12} md={6} pt={15} sx={{backgroundColor:' #223a6a'}}>
						<JobForgeModularDiagram sx={{ zIndex: 20}}/>
						<Box ml={'3rem'} pt={'10%'} sx={{ color: "#dbd7d7", marginBottom: '20px', lineHeight: '2rem', width: "80%"}}>
							Using a modular approach you can pick and choose exactly what tools you need for your business. <br/>From inventory to industry specific helpers, we aim to build out the most expansive customisable business management solution. 
						</Box>
					</Grid>
				</Grid>
			</div>
		</>
	);
};

export default HomePage;
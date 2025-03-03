import { styled, Box } from '@mui/material'
import Grid from '../components/Grid/Grid'
// import Box from '../components/Box/Box'
import Link from '../components/Links/pageLinks/Link'
import Button from '../components/Buttons/Button/Button'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import JobForgeModularDiagram from '../components/JobForgeModularDiagram'
import '../styles/homepage.css'

const CreateAccountButton = styled(Button)({
	borderRadius: '5px',
	textTransform: 'none',
	marginRight: '10px',
	'&:hover': {
		boxShadow: 'none',
	},
})

const HomePage = () => {
	const navigate = useNavigate()
	return (
		<>
			<div
				className='container'
				style={{ height: '100vh' }}>
				<Grid
					container
					// pt={'12vh'}
					sx={{ lineHeight: '1.6' }}>
					<Grid
						item
						xs={12}
						sm={12}
						md={6}
						style={{marginTop: "10px", paddingLeft: '6.5%'}}
						>
						<Box
							style={{ marginBottom: '10%', fontSize: '1.8rem', fontWeight: 600, color: '#dbd7d7' }}>
							The ultimate management tool for your business. Use the app that grows
							with your company.
						</Box>
						<Box
							style={{ marginBottom: '10%', fontSize: '1.5rem', color: '#288bbf' }}>
							We work on the philosophy that not all businesses share the same
							requirements, so why should you pay for things you don't need yet?
						</Box>
						<Box
							style={{ marginBottom: '25%', fontSize: '1rem', color: '#dbd7d7' }}>
							Here at JobForge we have coined the acronym <u>NoPayN</u> which simply
							means <strong>Now only Pay as you Need!</strong>
						</Box>
						<Box style={{ marginTop: '10%'}}>
							<CreateAccountButton
								variant='contained'
								onClick={() => navigate('/login')}>
								<Link
									component={RouterLink as React.ElementType}
									name = 'Login'
									linkTo='/login'
									styles={{
										textDecoration: 'none',
										color: 'white',
									}}>
									
								</Link>
							</CreateAccountButton>
							<CreateAccountButton
								variant='contained'
								// color='info'
								onClick={() => navigate('/login')}>
								<Link
									component={RouterLink}
									name='Request Demo'
									linkTo='/'
									styles={{
										textDecoration: 'none',
										color: 'white',
									}}>
								</Link>
							</CreateAccountButton>
						</Box>
					</Grid>

					<Grid
						item
						xs={12}
						sm={12}
						md={6}
						style={{ paddingTop: "15px", backgroundColor: ' #223a6a' }}>
						<JobForgeModularDiagram />
						<Box
							style={{
								color: '#dbd7d7',
								marginBottom: '20px',
								lineHeight: '2rem',
								width: '80%',
								marginLeft: '3rem',
								paddingTop: '10%'
							}}>
							Using a modular approach you can pick and choose exactly what tools you
							need for your business. <br />
							From inventory to industry specific helpers, we aim to build out the most
							expansive customisable business management solution.
						</Box>
					</Grid>
				</Grid>
			</div>
		</>
	)
}

export default HomePage

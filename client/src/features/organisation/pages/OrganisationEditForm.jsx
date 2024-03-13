import { useEffect, useState, useRef } from 'react'
import DoneIcon from '@mui/icons-material/Done'
import axios from 'axios'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import {
	Box,
	Button,
	Container,
	Tooltip,
	Grid,
	styled,
	CircularProgress,
	TextField,
	Typography,
} from '@mui/material'
import UserListPage from '../../users/pages/UsersListPage'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import Spinner from '../../../components/Spinner'
import {
	useGetSingleOrganisationQuery,
	useUpdateOrganisationInfoMutation,
} from '../organisationApiSlice'

import '../../../styles/pageHeader.css'

const Input = styled('input')({
	display: 'none',
})

const OrganisationEditForm = () => {
	const [loggedInUser, setLoggedInUser] = useState()

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'))
		if (user) {
			setLoggedInUser(user)
		}
	}, [])

	const navigate = useNavigate()

	const orgId = loggedInUser?.organisation
	const { data, isLoading } = useGetSingleOrganisationQuery(orgId)
	const [
		updateOrg,
		{
			isLoading: updateOrgLoading,
			isSuccess: updateOrgSuccess,
			data: updatedOrgData,
		},
	] = useUpdateOrganisationInfoMutation()

	const [viewOrganisationDetails, setViewOrganisationDetails] = useState(true)
	const [viewOrganisationSettings, setViewOrganisationSettings] = useState(false)
	const [viewOrganisationWorkflow, setViewOrganisationWorkflow] = useState(false)

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [abn, setAbn] = useState('')
	const [streetAddress, setStreetAddress] = useState('')
	const [city, setCity] = useState('')
	const [state, setState] = useState('')
	const [postcode, setPostcode] = useState('')
	const [country, setCountry] = useState('')
	const [settings, setSettings] = useState('')
	const [logo, setLogo] = useState('')
	const [uploading, setUploading] = useState(false)

	useEffect(() => {
		if (updateOrgSuccess) {
			navigate('/organisation-edit')
			const message = updatedOrgData?.message
			toast.success(message)
		}
	}, [navigate, updateOrgSuccess, updatedOrgData])

	const organisation = data?.organisation

	useEffect(() => {
		if (organisation) {
			setName(organisation.name)
			setEmail(organisation.email)
			setStreetAddress(organisation.address)
			setAbn(organisation.abn)
			setPhoneNumber(organisation.phoneNumber)
			setCity(organisation.city)
			setState(organisation.state)
			setPostcode(organisation.postcode)
			setCountry(organisation.country)
			setLogo(organisation.logo)
			setSettings(organisation.settings)
		}
	}, [organisation])

	const inputRef = useRef(null)

	const handleOpenFileInput = () => {
		inputRef.current.click()
	}

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append('logo', file)
		setUploading(true)

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
			const { data } = await axios.patch('/api/v1/upload', formData, config)
			setLogo(data)
			setUploading(false)
		} catch (error) {
			setUploading(false)
		}
	}

	const updateOrgHandler = async (e) => {
		e.preventDefault()
		try {
			await updateOrg({
				id: organisation._id,
				email,
				settings,
				phoneNumber,
				abn,
				name,
				address: streetAddress,
				city,
				state,
				postcode,
				country,
				logo,
			})
		} catch (err) {
			const message = err.data.message
			toast.error(message)
		}
	}

	const switchPageView = (page) => {
		if (page === 'details') {
			setViewOrganisationDetails(true)
			setViewOrganisationSettings(false)
			setViewOrganisationWorkflow(false)
		}
		if (page === 'settings') {
			setViewOrganisationDetails(false)
			setViewOrganisationSettings(true)
			setViewOrganisationWorkflow(false)
		}
		if (page === 'workflow') {
			setViewOrganisationDetails(false)
			setViewOrganisationSettings(false)
			setViewOrganisationWorkflow(true)
		}
	}

	return (
		<Container
			component='main'
			maxWidth='xl'
			sx={{ mt: 14, ml: 15, width: '90%' }}>
			<Box className='page-header'>
				<Typography variant='h6'>Organisation</Typography>
			</Box>
			{isLoading || updateOrgLoading ? (
				<Spinner />
			) : (
				<Box
					sx={{
						mt: '1rem',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
					component='form'
					noValidate
					autoComplete='off'
					onSubmit={updateOrgHandler}>
					<Grid
						container
						sx={{
							height: '77vh',
							paddingBottom: '20px',
							backgroundColor: 'white',
						}}>
						<Grid
							item
							md={12}
							sm={12}
							pl={3}>
							<Box
								sx={{
									marginTop: '30px',
									marginBottom: '20px',
									width: '90%',
									display: 'flex',
									justifyContent: 'space-evenly',
								}}>
								<Button
									onClick={() => {
										switchPageView('details')
									}}
									sx={{
										width: '250px',
										fontWeight: '400',
										borderBottom: '1px solid #e1e1e1',
										paddingBottom: '20px',
									}}>
									01. Details
								</Button>
								<Button
									onClick={() => {
										switchPageView('settings')
									}}
									sx={{
										width: '250px',
										fontWeight: '400',
										borderBottom: '1px solid #e1e1e1',
										paddingBottom: '20px',
									}}>
									02. Users
								</Button>
								<Button
									onClick={() => {
										switchPageView('workflow')
									}}
									sx={{
										width: '250px',
										fontWeight: '400',
										borderBottom: '1px solid #e1e1e1',
										paddingBottom: '20px',
									}}>
									03. Workflow
								</Button>
							</Box>

							{/* Project info */}

							{viewOrganisationDetails && (
								<Grid
									rowSpacing={4}
									container
									sx={{
										padding: '24px 24px',
									}}
									justifyContent='space-between'>
									<Grid
										style={{ paddingTop: '0', display: 'flex', flexDirection: 'column' }}
										item
										xs={6}
										mt={3}>
										<Grid
											item
											mt={3}
											xs={12}>
											{organisation && (
												<Grid
													container
													rowSpacing={3}>
													<Grid
														item
														xs={12}>
														<TextField
															required
															sx={{ marginRight: '20px', width: '96%' }}
															label='Name'
															value={name}
															onChange={(e) => {
																setName(e.target.value)
															}}
														/>
													</Grid>
													<Grid
														item
														md={12}>
														<TextField
															required
															sx={{ marginRight: '20px', width: '96%' }}
															label='Billing email'
															value={email}
															onChange={(e) => {
																setEmail(e.target.value)
															}}
														/>
													</Grid>
													<Grid
														item
														md={12}>
														<TextField
															required
															sx={{ marginRight: '20px', width: '96%' }}
															label='Billing phoneNumber number'
															value={phoneNumber}
															onChange={(e) => {
																setPhoneNumber(e.target.value)
															}}
														/>
													</Grid>
													<Grid
														item
														md={12}>
														<TextField
															required
															sx={{ marginRight: '20px', width: '96%' }}
															label='Street'
															value={streetAddress}
															onChange={(e) => {
																setStreetAddress(e.target.value)
															}}
														/>
													</Grid>
													<Grid
														item
														md={4}>
														<TextField
															required
															sx={{ marginRight: '20px', width: '88%' }}
															label='Suburb/Town'
															value={city}
															onChange={(e) => {
																setCity(e.target.value)
															}}
														/>
													</Grid>
													<Grid
														item
														md={4}>
														<TextField
															required
															sx={{ marginRight: '20px', width: '88%' }}
															label='State'
															value={state}
															onChange={(e) => {
																setState(e.target.value)
															}}
														/>
													</Grid>
													<Grid
														item
														md={4}>
														<TextField
															required
															sx={{ marginRight: '20px', width: '88%' }}
															label='Postcode'
															value={postcode}
															onChange={(e) => {
																setPostcode(e.target.value)
															}}
														/>
													</Grid>
													<Grid
														item
														md={12}>
														<TextField
															required
															sx={{ marginRight: '20px', width: '96%' }}
															label='Country'
															value={country}
															onChange={(e) => {
																setCountry(e.target.value)
															}}
														/>
													</Grid>
													<Grid
														item
														md={12}>
														<Button
															variant='contained'
															type='submit'
															size='large'
															sx={{
																marginTop: '20px',
																borderColor: 'rgb(17,65,141)',

																'&:hover': {
																	bgcolor: 'rgb(17,65,141)',
																	color: 'white',
																	borderColor: 'rgb(17,65,141)',
																},
															}}>
															SUBMIT
														</Button>
													</Grid>
												</Grid>
											)}
										</Grid>
									</Grid>
									{/* logo box */}
									<Grid
										item
										style={{ paddingTop: '23px' }}
										md={6}
										sm={12}>
										<Box
											sx={{
												backgroundColor: '#f6fafb',
												borderRadius: '4px',
												margin: '0 0 0 20px',
												width: '90%',
												height: '100%',
												padding: '25px',
											}}>
											<Box
												borderRadius={1}
												sx={{
													display: 'flex',
													alignContent: 'center',
													justifyContent: 'center',
												}}>
												{logo ? (
													<img
														src={logo}
														alt='logo'
														style={{
															width: '350px',
															height: '350px',
															objectFit: 'cover',
															marginBotton: '20px',
														}}
													/>
												) : (
													<AccountCircleIcon
														style={{
															width: '350px',
															height: '350px',
															objectFit: 'cover',
															marginBotton: '20px',
														}}
														color='info'
													/>
												)}
											</Box>
											<Box
												sx={{
													fontWeight: '400',
													paddingBottom: '20px',
													marginBottom: '20px',
													display: 'flex',
													flexDirection: 'column',
													justifyContent: 'space-between',
												}}>
												<TextField
													sx={{
														marginTop: '20px',
														marginBottom: '10px',
													}}
													variant='filled'
													fullWidth
													id='logo'
													name='logo'
													label='Logo Url'
													value={logo}
													onChange={(e) => {
														setLogo(e.target.value)
													}}
												/>
												<label
													htmlFor='logo'
													style={{
														width: '100%',
														display: 'flex',
														flexDirection: 'column',
													}}>
													<input
														accept='.jpg, .png'
														id='logo'
														name='logo'
														type='file'
														style={{ display: 'none' }}
														ref={inputRef}
														onChange={uploadFileHandler}
													/>
													{!uploading ? (
														<label>
															<Button
																sx={{ mt: '5px' }}
																fullWidth
																size='large'
																variant='contained'
																component='span'
																onClick={handleOpenFileInput}>
																Upload Company Logo or Paste Url
															</Button>
														</label>
													) : (
														<CircularProgress
															size={60}
															sx={{ margin: 'auto' }}
														/>
													)}
												</label>
											</Box>
										</Box>
									</Grid>
								</Grid>
							)}

							{/* items */}
							{viewOrganisationSettings && (
								<Grid
									rowSpacing={1}
									container
									sx={{
										padding: '24px 24px',
									}}>
									<UserListPage />
								</Grid>
							)}
							{/*  details*/}
							{viewOrganisationWorkflow && (
								<Grid
									rowSpacing={4}
									container
									sx={{
										padding: '24px 24px',
									}}>
									<Grid
										item
										xs={12}>
										<Typography variant='p'> DETAILS</Typography>
									</Grid>
									<Grid
										item
										xs={12}>
										<TextField
											fullWidth
											variant='outlined'
											label='Street Address'
											value={streetAddress}
											onChange={(e) => setStreetAddress(e.target.value)}
										/>
									</Grid>

									<Grid
										item
										xs={12}>
										<TextField
											fullWidth
											variant='outlined'
											label='City/Suburb'
											value={city}
											onChange={(e) => setCity(e.target.value)}
										/>
									</Grid>
									<Grid
										item
										xs={12}>
										<TextField
											fullWidth
											variant='outlined'
											label='State/Territory'
											value={state}
											onChange={(e) => setState(e.target.value)}
										/>
									</Grid>
									<Grid
										item
										xs={12}>
										<TextField
											fullWidth
											variant='outlined'
											label='Postcode'
											value={postcode}
											onChange={(e) => setPostcode(e.target.value)}
										/>
									</Grid>
									<Grid
										item
										xs={12}>
										<TextField
											fullWidth
											variant='outlined'
											label='Country'
											value={country}
											onChange={(e) => setCountry(e.target.value)}
										/>
									</Grid>
								</Grid>
							)}
						</Grid>
					</Grid>
				</Box>
			)}
		</Container>
	)
}

export default OrganisationEditForm

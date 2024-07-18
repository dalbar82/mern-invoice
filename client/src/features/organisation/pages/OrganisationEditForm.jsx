import { useEffect, useState } from 'react'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import UserListPage from '../../users/pages/UsersListPage'
import Workflow from './Workflow'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../../components/Spinner'
import {
	useGetSingleOrganisationQuery,
	useUpdateOrganisationInfoMutation,
} from '../organisationApiSlice'
import '../../../styles/pageHeader.css'
import OrganisationDetails from './OrganisationDetails'

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
					<div className='basic-container'>
						<Box className='page-header'>
							<Typography variant='h6'>Organisation</Typography>
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
						</Box>
					</div>
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
								<OrganisationDetails
									organisation={organisation}
									email={email}
									emailUpdate={(v) => setEmail(v)}
									phoneNumber={phoneNumber}
									phoneNumberUpdate={(v) => setPhoneNumber(v)}
									abn={abn}
									abnUpdate={(v) => setAbn(v)}
									name={name}
									nameUpdate={(v) => setName(v)}
									streetAddress={streetAddress}
									streetAddressUpdate={(v) => setStreetAddress(v)}
									city={city}
									cityUpdate={(v) => setCity(v)}
									state={state}
									stateUpdate={(v) => setState(v)}
									postcode={postcode}
									postcodeUpdate={(v) => setPostcode(v)}
									country={country}
									countryUpdate={(v) => setCountry(v)}
									logo={logo}
									logoUpdate={(v) => setLogo(v)}
								/>
							)}
							{/* users */}
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
							{/*workflow*/}
							{viewOrganisationWorkflow && (
								<Grid
									rowSpacing={1}
									container
									sx={{
										padding: '24px 24px',
									}}>
									<Workflow
										settings={settings}
										settingsUpdate={(v) => setSettings(v)}
									/>
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

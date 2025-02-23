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
import { IOrganisation } from '../../../types/Organisation'

interface IUser {
	organisation: string
}
interface WorkflowSettings {
	jobWorkflowTemplates: {
		workflowTemplateName: string
		workflowTemplateStagesList: string[]
	}[]
}

const OrganisationEditForm = () => {
	const [loggedInUser, setLoggedInUser] = useState<IUser | null>(null)

	useEffect(() => {
		const userData = localStorage.getItem('user')
		if (userData) {
			setLoggedInUser(JSON.parse(userData) as IUser)
		}
	}, [])

	const navigate = useNavigate()

	const orgId = loggedInUser?.organisation ?? ''

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

	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [phoneNumber, setPhoneNumber] = useState<string>('')
	const [abn, setAbn] = useState<number>()
	const [streetAddress, setStreetAddress] = useState<string>('')
	const [city, setCity] = useState<string>('')
	const [state, setState] = useState<string>('')
	const [postcode, setPostcode] = useState<string>('')
	const [country, setCountry] = useState<string>('')
	const [settings, setSettings] = useState<WorkflowSettings>({
		jobWorkflowTemplates: [],
	});
	const [logo, setLogo] = useState<string>('')

	const [organisation, setOrganisation] = useState<IOrganisation>();

	useEffect(() => {
		if (updateOrgSuccess) {
			navigate('/organisation-edit')
			toast.success('Organisation updated successfully!')
		}
	}, [navigate, updateOrgSuccess, updatedOrgData])

	

	useEffect(() => {
		if (organisation) {
			setName(organisation.name || '')
			setEmail(organisation.email || '')
			setStreetAddress(organisation.address || '')
			setAbn(organisation.abn)
			setPhoneNumber(organisation.phoneNumber || '')
			setCity(organisation.city || '')
			setState(organisation.state || '')
			setPostcode(organisation.postcode || '')
			setCountry(organisation.country || '')
			setLogo(organisation.logo || '')
			setSettings(organisation.settings || '')
		}
	}, [organisation])

	

	const updateOrgHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!organisation?._id) {
			toast.error("Organisation ID is missing");
			return;
		}
		try {
			await updateOrg({
				id: organisation._id.toString(),
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
		} catch (err: any) {
			toast.error(err.data?.message || 'Failed to update organisation')
		}
	}

	const switchPageView = (page: 'details' | 'settings' | 'workflow') => {
		setViewOrganisationDetails(page === 'details')
		setViewOrganisationSettings(page === 'settings')
		setViewOrganisationWorkflow(page === 'workflow')
	}

	return (
		<Container component='main' maxWidth='xl' sx={{ mt: 14, ml: 15, width: '90%' }}>
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
					<Grid container sx={{ height: '77vh', paddingBottom: '20px', backgroundColor: 'white' }}>
						<Grid item md={12} sm={12} pl={3}>
							<Box sx={{ marginTop: '30px', marginBottom: '20px', width: '90%', display: 'flex', justifyContent: 'space-evenly' }}>
								<Button onClick={() => switchPageView('details')} sx={{ width: '250px', fontWeight: '400', borderBottom: '1px solid #e1e1e1', paddingBottom: '20px' }}>
									01. Details
								</Button>
								<Button onClick={() => switchPageView('settings')} sx={{ width: '250px', fontWeight: '400', borderBottom: '1px solid #e1e1e1', paddingBottom: '20px' }}>
									02. Users
								</Button>
								<Button onClick={() => switchPageView('workflow')} sx={{ width: '250px', fontWeight: '400', borderBottom: '1px solid #e1e1e1', paddingBottom: '20px' }}>
									03. Workflow
								</Button>
							</Box>

							{viewOrganisationDetails && organisation && (
								<OrganisationDetails
									organisation={organisation}
									email={email}
									emailUpdate={setEmail}
									phoneNumber={phoneNumber}
									phoneNumberUpdate={setPhoneNumber}
									abn={abn || 0}
									abnUpdate={setAbn}
									name={name}
									nameUpdate={setName}
									streetAddress={streetAddress}
									streetAddressUpdate={setStreetAddress}
									city={city}
									cityUpdate={setCity}
									state={state}
									stateUpdate={setState}
									postcode={postcode}
									postcodeUpdate={setPostcode}
									country={country}
									countyUpdate={setCountry}
									logo={logo}
									logoUpdate={setLogo}
								/>
							)}
							{viewOrganisationSettings && <UserListPage />}
							{viewOrganisationWorkflow && <Workflow settings={settings} settingsUpdate={setSettings} />}
						</Grid>
					</Grid>
				</Box>
			)}
		</Container>
	)
}

export default OrganisationEditForm

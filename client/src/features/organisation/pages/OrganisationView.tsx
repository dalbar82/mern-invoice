import { useState, useEffect } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import EditIcon from '@mui/icons-material/Edit'
import ListItemWrapper from '../../../components/ListItemWrapper'
import {
	Box,
	Container,
	Button,
	List,
	Grid,
	Stack,
	Tooltip,
} from '@mui/material'
import Typography from '../../../components/Typography/Typography'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../../components/Spinner'
import { useGetSingleOrganisationQuery } from '../organisationApiSlice'
import '../../../styles/pageHeader.css'
import { User } from '../../../types/User'

function capitalizeFirstLetter(string: string) {
	return string?.charAt(0)?.toUpperCase() + string?.slice(1)
}

const OrganisationView = () => {
	const [loggedInUser, setLoggedInUser] = useState<User | null>(null)

	useEffect(() => {
		const userString = localStorage.getItem('user')
		if (userString) {
			try {
				const user: User = JSON.parse(userString)
				setLoggedInUser(user)
			} catch (error) {
				console.error('Error parsing user from localStorage:', error)
			}
		}
	}, [])

	const orgId = loggedInUser?.organisation ?? '' // Ensures orgId is never undefined

	const navigate = useNavigate()

	const goBack = () => navigate(-1)

	// Define expected response type
	const { data, isLoading } = useGetSingleOrganisationQuery(orgId, {
		skip: !orgId, // Skip query if orgId is empty
	})

	return (
		<Container
			component='main'
			maxWidth='xl'
			sx={{ mt: 14, ml: 15, width: '90%' }}>
			<Box className='page-header'>
				<Typography elementType='h3' text={`${data?.organisation?.name || 'Organisation'}`}/>
				<Box>
					<Tooltip title='Edit Profile'>
						<Button
							sx={{ p: '15px 0px 15px 10px', color: '#a6aeb3' }}
							variant='text'
							startIcon={<EditIcon />}
							onClick={() =>
								data?.organisation?._id &&
								navigate(`/edit-organisation/${data?.organisation?._id}`)
							}
							disabled={!data?.organisation?._id}
						/>
					</Tooltip>
					<Tooltip title='Back'>
						<Button
							sx={{ p: '15px 0px 15px 10px', color: '#a6aeb3' }}
							variant='text'
							startIcon={<ClearIcon />}
							onClick={goBack}
						/>
					</Tooltip>
				</Box>
			</Box>

			{isLoading ? (
				<Spinner />
			) : (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<Grid container width='100%'>
						<Grid item sm={12}>
							<Stack direction='column'>
								<Stack>
									<Typography text='Information' elementType='span' style={{
										marginTop: '10px',
										marginBottom: '10px'
									}}/>
										
									<List
										sx={{
											backgroundColor: 'white',
											width: '100%',
											fontSize: 'small',
											marginTop: '10px',
											paddingBottom: '0',
										}}>
										{/* Name */}
										<ListItemWrapper
											label={'Name'}
											text={capitalizeFirstLetter(data?.organisation?.name || '')}
										/>
										{/* Email */}
										<ListItemWrapper
											label={'Contact Email'}
											text={data?.organisation?.email || 'N/A'}
										/>
										{/* ABN */}
										<ListItemWrapper
											label={'ABN'}
											text={data?.organisation?.abn ? `${data?.organisation?.abn}` : 'N/A'}
										/>
										{/* Phone */}
										<ListItemWrapper
											label={'Phone'}
											text={data?.organisation?.phoneNumber || 'N/A'}
										/>
										{/* Address */}
										<ListItemWrapper
											label={'Address'}
											text={
												data
													? `${data?.organisation?.address}, ${data?.organisation?.city} ${data?.organisation?.state} ${data?.organisation?.postcode}`
													: 'N/A'
											}
										/>
										{/* Production Status Templates */}
										<ListItemWrapper
											label={
												data?.organisation?.settings?.productionStatusTemplates?.[0]
													?.statusTemplateName || 'Production Status'
											}
											text={
												data?.organisation?.settings?.productionStatusTemplates?.[0]
													?.statusTemplateList || 'N/A'
											}
										/>
									</List>
								</Stack>
							</Stack>
						</Grid>
					</Grid>
				</Box>
			)}
		</Container>
	)
}

export default OrganisationView

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
	Typography,
	Tooltip,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../../components/Spinner'
import { useGetSingleOrganisationQuery } from '../organisationApiSlice'
import '../../../styles/pageHeader.css'

function capitalizeFirstLetter(string) {
	return string?.charAt(0)?.toUpperCase() + string?.slice(1)
}

const OrganisationView = () => {
	const [loggedInUser, setLoggedInUser] = useState()

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'))
		if (user) {
			setLoggedInUser(user)
		}
	}, [])

	const orgId = loggedInUser?.organisation

	const navigate = useNavigate()

	const goBack = () => navigate(-1)

	const { data, isLoading } = useGetSingleOrganisationQuery(orgId)
	return (
		<Container
			component='main'
			maxWidth='xl'
			sx={{ mt: 14, ml: 15, width: '90%' }}>
			<Box className='page-header'>
				<Typography variant='h6'>{data?.organisation?.name}</Typography>
				<Box sx={{}}>
					<Tooltip title='Edit Profile'>
						<Button
							sx={{ p: '15px 0px 15px 10px', color: '#a6aeb3' }}
							variant='text'
							startIcon={<EditIcon />}
							onClick={() =>
								navigate(`/edit-organisation/${data?.organisation?._id}`)
							}></Button>
					</Tooltip>
					<Tooltip title='Back'>
						<Button
							sx={{ p: '15px 0px 15px 10px', color: '#a6aeb3' }}
							variant='text'
							startIcon={<ClearIcon />}
							onClick={goBack}></Button>
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
					<Grid
						container
						width='100%'>
						<Grid
							item
							sm={12}>
							<Stack direction='column'>
								<Stack>
									<Typography
										variant='span'
										mt={'10px'}
										mb={2}>
										Information
									</Typography>
									<List
										sx={{
											backgroundColor: 'white',
											width: '100%',
											fontSize: 'small',
											marginTop: '10px',
											paddingBottom: '0',
										}}>
										{/* name */}
										<ListItemWrapper
											label={'Name'}
											text={`${capitalizeFirstLetter(data?.organisation?.name)}`}
										/>
										{/* email */}
										<ListItemWrapper
											label={'Contact Email'}
											text={data?.organisation?.email}
										/>
										{/* account#
										<ListItemWrapper
											label={'Account #'}
											text={data?.organisation?.accountNo}
										/> */}
										{/* ABN */}
										<ListItemWrapper
											label={'ABN'}
											text={data?.organisation?.abn ? `${data?.organisation?.abn}` : ''}
										/>
										{/* phone */}
										<ListItemWrapper
											label={'Phone'}
											text={
												data?.organisation?.phoneNumber
													? `${data?.organisation?.phoneNumber}`
													: ''
											}
										/>
										{/* Address */}
										<ListItemWrapper
											label={'Address'}
											text={`${data?.organisation?.address}, ${data?.organisation?.city} ${data?.organisation?.state} ${data?.organisation?.postcode}`}
										/>
										<ListItemWrapper
											label={
												data?.organisation?.settings?.productionStatusTemplates[0]
													?.statusTemplateName
											}
											text={
												data?.organisation?.settings?.productionStatusTemplates[0]
													?.statusTemplateList
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

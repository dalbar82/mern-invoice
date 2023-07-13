import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1'

import {
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	List,
	Modal,
	Stack,
	Typography,
} from '@mui/material'
import ListItemWrapper from '../../../components/ListItemWrapper'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../../components/Spinner'
import { logOut } from '../../../features/auth/authSlice'
import {
	useDeleteMyAccountMutation,
	useGetUserProfileQuery,
} from '../usersApiSlice'

const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	borderRadius: '25px',
	boxShadow: 24,
	p: 4,
}

const ProfilePage = () => {
	const navigate = useNavigate()
	const { data, error, isLoading, isError } = useGetUserProfileQuery()

	const dispatch = useDispatch()

	const [open, setOpen] = useState(false)

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const [deleteMyAccount] = useDeleteMyAccountMutation()

	const deleteHandler = async (e) => {
		e.preventDefault()

		try {
			await deleteMyAccount().unwrap()
			dispatch(logOut())
			toast.success('Your account has been deleted. Sad to see you go 😢')
		} catch (err) {
			const message = err.data.message
			toast.error(message)
		}
	}

	useEffect(() => {
		if (isError) {
			const message = error.data.message
			toast.error(message)
		}
	}, [isError, error])

	return (
		<Container
			component='main'
			maxWidth='xl'
			sx={{ mt: 14, ml: 15, width: '90%' }}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'start',
					alignItems: 'center',
					borderBottom: '1px solid #e1e1e1',
					paddingBottom: '20px',
					marginBottom: '20px',
				}}>
				<Typography variant='h6'>Profile</Typography>
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
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'left',
							padding: '20px',
							backgroundColor: 'white',
							borderRadius: '5px',
						}}>
						{data.userProfile?.avatar ? (
							<Avatar
								src={data.userProfile.avatar}
								sx={{ width: '60px', height: '60px', marginRight: '20px' }}
							/>
						) : (
							<AccountCircleIcon
								sx={{ fontSize: '6rem' }}
								color='info'
							/>
						)}
						<Box>
							<Typography variant='h6'>{`${data.userProfile.firstName} ${data.userProfile.lastName}`}</Typography>
							<Typography variant='p'>{`${data.userProfile.email}`}</Typography>
						</Box>
					</Box>

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
										mt={'20px'}>
										Information
									</Typography>
									<List
										sx={{
											backgroundColor: 'white',
											width: '100%',
											fontSize: 'small',
											marginTop: '10px',
                      
										}}>
										{/* email */}
										<ListItemWrapper
											label={'Email'}
											text={data.userProfile.email}
										/>
										{/* name */}
										<ListItemWrapper
											label={'Name'}
											text={`${data.userProfile.firstName} ${data.userProfile.lastName}`}
										/>
										{/* username */}
										<ListItemWrapper
											label={'Username'}
											text={data.userProfile.username}
										/>
										{/* address */}
										<ListItemWrapper
											label={'Address'}
											text={
												data.userProfile.address
													? `${data.userProfile.address}, ${data.userProfile?.city} ${data.userProfile?.country}`
													: ''
											}
										/>
										{/* phone */}
										<ListItemWrapper
											label={'Phone'}
											text={
												data.userProfile?.phoneNumber
													? `${data.userProfile.phoneNumber}`
													: ''
											}
										/>
									</List>
								</Stack>
							</Stack>
						</Grid>
					</Grid>
					<Grid
						container
						spacing={2}>
						<Grid
							item
							md={6}>
							<Button
								sx={{ mt: 3, mb: 2, borderRadius: '25px' }}
								fullWidth
								variant='contained'
								color='success'
								size='large'
								endIcon={<EditIcon />}
								onClick={() => navigate('/edit-profile')}>
								<Typography variant='h5'>Edit Profile</Typography>
							</Button>
						</Grid>
						<Grid
							item
							md={6}>
							<Button
								sx={{ mt: 3, mb: 2, borderRadius: '25px' }}
								fullWidth
								variant='contained'
								color='error'
								size='large'
								startIcon={<PersonRemoveAlt1Icon sx={{ color: 'white' }} />}
								onClick={handleOpen}>
								<Typography
									variant='h5'
									sx={{ color: 'white' }}>
									Delete Account?
								</Typography>
							</Button>
						</Grid>
					</Grid>

					{/* modal */}
					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby='modal-modal-title'
						aria-describedby='modal-modal-description'>
						<Box sx={modalStyle}>
							<Typography
								id='modal-modal-title'
								variant='h6'
								component='h2'>
								Are you sure you want to delete your account?
							</Typography>
							<Button
								id='modal-modal-description'
								sx={{ mt: 2 }}
								fullWidth
								variant='contained'
								color='darkRed'
								size='large'
								endIcon={<DeleteForeverIcon sx={{ color: 'white' }} />}
								onClick={deleteHandler}>
								<Typography
									variant='h5'
									sx={{ color: 'white' }}>
									Delete Account
								</Typography>
							</Button>
						</Box>
					</Modal>
				</Box>
			)}
		</Container>
	)
}

export default ProfilePage

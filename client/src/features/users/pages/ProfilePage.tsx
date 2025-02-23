import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import EditIcon from '@mui/icons-material/Edit'
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1'
import CloseIcon from '@mui/icons-material/Close'
import DoneIcon from '@mui/icons-material/Done'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import {
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	List,
	Modal,
	Stack,
} from '@mui/material'
import Typography from '../../../components/Typography/Typography'
import Tooltip from '@mui/material/Tooltip'
import ListItemWrapper from '../../../components/ListItemWrapper'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../../components/Spinner'
import { logOut } from '../../auth/authSlice'
import {
	useDeleteMyAccountMutation,
	useGetUserProfileQuery,
} from '../usersApiSlice'

const modalStyle = {
	position: 'absolute',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
}

const ProfilePage = () => {
	const navigate = useNavigate()
	const { data, error, isLoading, isError } = useGetUserProfileQuery(undefined)

	const dispatch = useDispatch()

	const [open, setOpen] = useState(false)

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const [deleteMyAccount] = useDeleteMyAccountMutation()

	const deleteHandler = async (e: React.MouseEvent<HTMLButtonElement> ) => {
		e.preventDefault()

		try {
			await deleteMyAccount(data._id).unwrap()
			dispatch(logOut())
			toast.success('Your account has been deleted.')
		} catch (err: unknown) {
			if (err instanceof Error) {
				const message = err?.message
			toast.error(message)
			} else {
				console.error("Unknown error:", err);
			}
			
		}
	}

	// useEffect(() => {
	// 	if (isError) {
	// 		const message = error.data.message
	// 		toast.error(message)
	// 	}
	// }, [isError, error])

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
				<Typography elementType='h6' text='Profile'/>
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

							padding: '20px',
							backgroundColor: 'white',
							borderRadius: '5px',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}>
						<Box
							sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
							{data.userProfile?.avatar ? (
								<Avatar
									src={data.userProfile?.avatar}
									sx={{ width: '60px', height: '60px', marginRight: '20px' }}
								/>
							) : (
								<AccountCircleIcon
									sx={{ fontSize: '6rem' }}
									color='info'
								/>
							)}
							<Box>
								<Typography text={`${data.userProfile?.firstName} ${data.userProfile?.lastName}`} elementType='h6'/>
								<Typography text={`${data.userProfile?.email}`} elementType='p'/>
							</Box>
						</Box>

						<Box sx={{}}>
							<Tooltip title='Edit Profile'>
								<Button
									sx={{ p: '15px 0px 15px 10px', color: '#a6aeb3' }}
									variant='text'
									startIcon={<EditIcon />}
									onClick={() => navigate('/edit-profile')}></Button>
							</Tooltip>
							<Tooltip title='Delete Profile'>
								<Button
									sx={{ p: '15px 0px 15px 10px', color: '#a6aeb3' }}
									variant='text'
									startIcon={<PersonRemoveAlt1Icon />}
									onClick={handleOpen}></Button>
							</Tooltip>
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
										elementType='span'
										style={{
											marginTop: '20px',
											marginBottom: '20px'
										}}
										text='Information'
										/>
									<List
										sx={{
											backgroundColor: 'white',
											width: '100%',
											fontSize: 'small',
											marginTop: '10px',
											paddingBottom: '0',
										}}>
										{/* email */}
										<ListItemWrapper
											label={'Email'}
											text={data.userProfile?.email}
										/>
										{/* name */}
										<ListItemWrapper
											label={'Name'}
											text={`${data.userProfile?.firstName} ${data.userProfile?.lastName}`}
										/>
										{/* username */}
										<ListItemWrapper
											label={'Username'}
											text={data.userProfile?.username}
										/>
										{/* address */}
										<ListItemWrapper
											label={'Address'}
											text={
												data.userProfile?.address
													? `${data.userProfile?.address || ''} ${
															data.userProfile?.city || ''
													  } ${data.userProfile?.country || ''}`
													: ''
											}
										/>
										{/* phone */}
										<ListItemWrapper
											label={'Phone'}
											text={
												data.userProfile?.phoneNumber
													? `${data.userProfile?.phoneNumber}`
													: ''
											}
										/>
										{/* roles */}
										<ListItemWrapper
											label={'Roles'}
											text={data.userProfile?.roles}
										/>
									</List>
								</Stack>
							</Stack>
						</Grid>
					</Grid>

					{/* modal */}
					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby='modal-modal-title'
						aria-describedby='modal-modal-description'>
						<Box sx={modalStyle}>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
									borderBottom: '1px solid #e1e1e1',
									paddingBottom: '20px',
									marginBottom: '20px',
									width: '100%',
								}}>
								<Typography
									id='modal-modal-title'
									elementType='h6'
									style={{ fontSize: 'medium' }}
									text='Delete Account?'
									/>
								<Box>
									<Tooltip title='Yes'>
										<Button
											sx={{
												color: '#a6aeb3',
											}}
											id='modal-modal-description'
											variant='text'
											size='large'
											onClick={deleteHandler}>
											<DoneIcon />
										</Button>
									</Tooltip>
									<Tooltip title='No'>
										<Button
											sx={{
												color: '#a6aeb3',
											}}
											id='modal-modal-description'
											variant='text'
											size='large'
											onClick={handleClose}>
											<CloseIcon />
										</Button>
									</Tooltip>
								</Box>
							</Box>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									width: '100%',
									marginTop: '10px',
									backgroundColor: '#ff000066',
									padding: '10px',
									borderRadius: '5px',
								}}>
								<WarningAmberRoundedIcon sx={{ marginRight: '10px', color: 'red' }} />
								<Typography
									elementType='p'
									text="Please note you can't undo this action!"
									style={{ fontSize: 'small', color: 'white' }}>
								</Typography>
							</Box>
						</Box>
					</Modal>
				</Box>
			)}
		</Container>
	)
}

export default ProfilePage

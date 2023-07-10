import Logout from '@mui/icons-material/Logout'
import SentimentSatisfiedAltTwoToneIcon from '@mui/icons-material/SentimentSatisfiedAltTwoTone'
import SpeedTwoToneIcon from '@mui/icons-material/SpeedTwoTone'
import {
	Avatar,
	Box,
	ButtonBase,
	Divider,
	Grid,
	ListItemIcon,
	Menu,
	MenuItem,
	Stack,
	styled,
	Typography,
} from '@mui/material'
import { blueGrey, lightBlue } from '@mui/material/colors'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useLogoutUserMutation } from '../../features/auth/authApiSlice'
import useAuthUser from '../../hooks/useAuthUser'
import MenuText from '../MenuText'

const StyledMenuItem = styled(MenuItem)({
	'&:hover': {
		backgroundColor: '#555a64',
	},
	width: 240,
	height: 50,
})

const StyledProfileDivider = styled(Divider)({
	height: '2px',
	borderColor: blueGrey[900],
})

const ProfileInfo = ({ user }) => {
	const { isAdmin } = useAuthUser()
	const navigate = useNavigate()

	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)

	const handleOpenUserMenu = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleCloseUserMenu = () => {
		setAnchorEl(null)
	}

	const [logoutUser, { data, isSuccess }] = useLogoutUserMutation()

	const handleLogout = async () => {
		try {
			await logoutUser().unwrap()
			navigate('/login')
		} catch (err) {
			toast.error(err)
		}
	}

	useEffect(() => {
		if (isSuccess) {
			const message = data?.message
			toast.success(message)
		}
	}, [isSuccess, data])

	return (
		<Box sx={{ flexShrink: 0, ml: 0.75 }}>
			<ButtonBase
				sx={{
					p: 0.25,
					bgColor: open ? '#E0E0E0' : 'transparent',
					borderRadius: 10,
					'&:hover': { bgcolor: '#555a64' },
				}}
				aria-label='open profile'
				ref={anchorEl}
				aria-controls={open ? 'profile-grow' : undefined}
				aria-haspopup='true'
				onClick={handleOpenUserMenu}>
				{user.avatar ? (
					<Stack
						direction='row'
						spacing={2}
						alignItems='center'
						sx={{ p: 0.5 }}>
						<Avatar
							alt='profile user'
							src={user.avatar}
							sx={{ width: 48, height: 48 }}
						/>
					</Stack>
				) : (
					<Stack
						direction='row'
						spacing={2}
						alignItems='center'
						sx={{ p: 0.5 }}>
						<Avatar
							sx={{ bgcolor: lightBlue[900], fontSize: '1rem', fontWeight: '500' }}>
							{user.firstName.charAt(0).toUpperCase()}
							{user.lastName.charAt(0).toUpperCase()}
						</Avatar>
					</Stack>
				)}
			</ButtonBase>

			{/* Menu Items */}
			<Menu
				sx={{ mt: '45px' }}
				id='account-menu'
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={open}
				onClose={handleCloseUserMenu}
				onClick={handleCloseUserMenu}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						bgcolor: '#202128',
						color: '#ffffff',
						borderRadius: '10px',

						'& .MuiAvatar-root': {
							width: 43,
							height: 42,
							ml: -0.5,
							mr: 1,
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: '#202128',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}>
				<Box>
					<Grid
						container
						justifyContent='space-between'
						alignItems='center'
						color='#c7cbd4'>
						<Stack>
							{/* profile menu item */}
							<StyledMenuItem onClick={() => navigate('/profile')}>
								<Grid item>
									<Stack
										direction='row'
										spacing={1.25}
										alignItems='center'>
										{user.avatar ? (
											<Stack
												direction='row'
												spacing={1.25}
												alignItems='center'
												sx={{ p: 0.5 }}>
												<Avatar
													alt='profile user'
													src={user.avatar}
													sx={{
														width: 48,
														height: 48,
													}}
												/>
												<Stack>
													<Typography variant='h6'>
														{user.firstName} {user.lastName}
													</Typography>
													<Typography variant='body2'>
														{isAdmin ? 'Project Admin' : 'Product User'}
													</Typography>
												</Stack>
											</Stack>
										) : (
											<Stack
												direction='row'
												spacing={1.25}
												alignItems='center'
												sx={{ p: 0.5 }}>
												<Avatar
													sx={{
														bgcolor: blueGrey[700],
														fontSize: '1rem',
														fontWeight: '500',
													}}>
													{user.firstName.charAt(0).toUpperCase()}
													{user.lastName.charAt(0).toUpperCase()}
												</Avatar>
												<Stack>
													<Typography variant='h6'>
														{user.firstName} {user.lastName}
													</Typography>
													<Typography
														variant='body2'
														color='#CFD8DC'>
														{isAdmin ? 'Project Admin' : 'Product User'}
													</Typography>
												</Stack>
											</Stack>
										)}
									</Stack>
								</Grid>
							</StyledMenuItem>
							<StyledProfileDivider />

							{/* view profile */}
							<StyledMenuItem onClick={() => navigate('/profile')}>
								<Grid item>
									<Stack
										direction='row'
										alignItems='center'
										spacing={2}>
										<ListItemIcon>
											<SentimentSatisfiedAltTwoToneIcon
												color='iconsSideNav'
												sx={{ fontSize: 20 }}
											/>
										</ListItemIcon>
										<Typography variant='p'>View Profile</Typography>
									</Stack>
								</Grid>
							</StyledMenuItem>
							<StyledProfileDivider />
							{/* Dashboard */}
							<StyledMenuItem onClick={() => navigate('/dashboard')}>
								<Grid
									item
									color='iconsSideNav'>
									<Stack
										direction='row'
										alignItems='center'
										spacing={2}>
										<ListItemIcon>
											<SpeedTwoToneIcon
												color='iconsSideNav'
												sx={{ fontSize: 20 }}
											/>
										</ListItemIcon>
										<Typography variant='p'>Dashboard</Typography>
									</Stack>
								</Grid>
							</StyledMenuItem>
							<StyledProfileDivider />

							{/* logout */}
							<StyledMenuItem onClick={handleLogout}>
								<Grid item>
									<Stack
										direction='row'
										alignItems='center'
										spacing={2}>
										<ListItemIcon>
											<Logout
												color='iconsSideNav'
												sx={{ fontSize: 20 }}
											/>
										</ListItemIcon>
										<MenuText
											color='iconsSideNav'
											text='Logout'
										/>
									</Stack>
								</Grid>
							</StyledMenuItem>
						</Stack>
					</Grid>
					<Divider />
				</Box>
			</Menu>
		</Box>
	)
}

export default ProfileInfo

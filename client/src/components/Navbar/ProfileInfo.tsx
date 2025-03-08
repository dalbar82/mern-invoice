import Logout from '@mui/icons-material/Logout'
import SentimentSatisfiedAltTwoToneIcon from '@mui/icons-material/SentimentSatisfiedAltTwoTone'
import SpeedTwoToneIcon from '@mui/icons-material/SpeedTwoTone'
import {
	Avatar,
	Grid,
	ListItemIcon,
	Paper,
	Stack,
	styled,
	Menu, 
	MenuItem,
	Box
} from '@mui/material'
// import Menu from '../Menu/Menu/Menu'
// import MenuItem from '../Menu/MenuItems/MenuItems'
// import Box from '../Box/Box'
import Typography from '../Typography/Typography'
import ButtonBase from '../Buttons/ButtonBase/ButtonBase'
import { blueGrey, lightBlue } from '@mui/material/colors'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useLogoutUserMutation } from '../../features/auth/authApiSlice'
import useAuthUser from '../../hooks/useAuthUser'
import MenuText from '../MenuText'
import {User as USER} from '../../types/User'


const StyledMenuItem = styled(MenuItem)({
	'&:hover': {
		backgroundColor: '#555a64',
	},
	width: 240,
	height: 50,
})
type ProfileInfoProps = {
	user?: USER | null;
}

const ProfileInfo:React.FC<ProfileInfoProps> = ({ user }) => {
	const { isAdmin } = useAuthUser()
	const navigate = useNavigate()

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl)

	const handleOpenUserMenu = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorEl(null)
	}

	const [logoutUser, { data, isSuccess }] = useLogoutUserMutation()

	const handleLogout = async () => {
		try {
			await logoutUser().unwrap();
			navigate("/login");
		} catch (err) {
			// Ensure 'err' is handled correctly
			const errorMessage =
				err instanceof Error
					? err.message
					: typeof err === "string"
					? err
					: "An unexpected error occurred";
	
			toast.error(errorMessage);
		}
	};

	useEffect(() => {
		if (isSuccess) {
			const message = data?.message
			toast.success(message)
		}
	}, [isSuccess, data])

	return (
		<Box style={{ flexShrink: 0, marginRight: 1.5 }}>
			<ButtonBase
				className='button-base'
				style={{
					backgroundColor: open ? '#E0E0E0' : 'transparent',
					borderRadius: 10,
				}}
				ref={anchorEl}
				aria-controls={open ? 'profile-grow' : undefined}
				aria-haspopup='true'
				onClick={handleOpenUserMenu}>
				{user?.avatar ? (
					<Stack
						direction='row'
						spacing={2}
						alignItems='center'
						sx={{ m: 0.5 }}>
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
							{user?.firstName?.charAt(0)?.toUpperCase()}
							{user?.lastName?.charAt(0)?.toUpperCase()}
						</Avatar>
					</Stack>
				)}
			</ButtonBase>

			{/* Menu Items */}
			<Menu
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
				>
				<Paper
					style={{boxShadow: 'none'}}>
					<Grid
						container
						justifyContent='space-between'
						alignItems='center'
						color='#c7cbd4'
						>
						<Stack >
							{/* profile menu item */}

								<Grid item>
									<Stack
										direction='row'
										alignItems='center'
										onClick={() => {}}>
										{user?.avatar ? (
											<Stack
												direction='row'
												spacing={1.25}
												alignItems='center'
												sx={{ p: 2.5 }}>
												<Avatar
													alt='profile user'
													src={user.avatar}
													sx={{
														width: 48,
														height: 48,
													}}
												/>
												<Stack>
													<Typography 
														elementType='h3' 
														style={{ fontWeight: 600, marginBottom: '20px', fontFamily: 'Poppins' }}
														text={
															`${user.firstName?.charAt(0)?.toUpperCase()}{' '}
															${user.lastName?.charAt(0)?.toUpperCase()}`
														}>
														
													</Typography>
												</Stack>
											</Stack>
										) : (
											<Stack
												direction='row'
												spacing={1.25}
												alignItems='center'
												sx={{ p: 2.5 }}>
												<Avatar
													sx={{
														bgcolor: blueGrey[700],
														fontSize: '1rem',
														fontWeight: '500',
													}}>
													{user?.firstName?.charAt(0)?.toUpperCase()}
													{user?.lastName?.charAt(0)?.toUpperCase()}
												</Avatar>
												<Stack>
													<Typography 
														elementType='h3' 
														style={{ fontWeight: 600, marginBottom: '20px', fontFamily: 'Poppins' }}
														text={`${user?.firstName?.toUpperCase()} {user?.lastName?.toUpperCase()}`}>
														
													</Typography>
												</Stack>
											</Stack>
										)}
									</Stack>
								</Grid>

							{/* view profile */}
							<StyledMenuItem onClick={() => navigate('/profile')}>
								<Grid item>
									<Stack
										direction='row'
										alignItems='center'
										spacing={2}>
										<ListItemIcon>
											<SentimentSatisfiedAltTwoToneIcon
												// color='iconsSideNav'
												sx={{ fontSize: 20 }}
											/>
										</ListItemIcon>
										<Typography elementType='p' text="View Profile" />
									</Stack>
								</Grid>
							</StyledMenuItem>
							{/* Dashboard */}
							<StyledMenuItem onClick={() => navigate('/dashboard')}>
								<Grid item>
									<Stack
										direction='row'
										alignItems='center'
										spacing={2}>
										<ListItemIcon>
											<SpeedTwoToneIcon
												// color='iconsSideNav'
												sx={{ fontSize: 20 }}
											/>
										</ListItemIcon>
										<Typography elementType='p' text="Dashboard"/>
									</Stack>
								</Grid>
							</StyledMenuItem>

							{/* logout */}
							<StyledMenuItem onClick={handleLogout}>
								<Grid item>
									<Stack
										direction='row'
										alignItems='center'
										spacing={2}>
										<ListItemIcon>
											<Logout
												// color='iconsSideNav'
												sx={{ fontSize: 20 }}
											/>
										</ListItemIcon>
										<Typography elementType='p' text="Logout" />
									</Stack>
								</Grid>
							</StyledMenuItem>
						</Stack>
					</Grid>
				</Paper>
			</Menu>
		</Box>
	)
}

export default ProfileInfo

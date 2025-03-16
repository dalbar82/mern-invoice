import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	styled,
	Tooltip,
	Box
} from '@mui/material'
// import Box from '../Box/Box'
import MenuText from '../MenuText'
import { useNavigate } from 'react-router-dom'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import CorporateFareIcon from '@mui/icons-material/CorporateFare'
import DashboardSharpIcon from '@mui/icons-material/DashboardSharp'
import PersonSearchSharpIcon from '@mui/icons-material/PersonSearchSharp'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import WorkHistorySharpIcon from '@mui/icons-material/WorkHistorySharp'
import useAuthUser from '../../hooks/useAuthUser'

const StyledList = styled(List)({
	'&:hover': {
		backgroundColor: '#eef9ff3d',
	},
})

const MenuList = () => {
	const navigate = useNavigate()

	const { isAdmin } = useAuthUser()

	return (
		<Box
			style={{
				color: '#c7cbd4',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				height: '100%',
			}}>
			<Box>
				{/* <Box height={'10px'}></Box> */}

				<StyledList>
					<ListItem disablePadding>
						<Tooltip title='Projects'>
							<ListItemButton
								onClick={() => navigate('/documents')}
								style={{ paddingTop: '0', paddingBottom: '0' }}>
								<ListItemIcon>
									<WorkHistorySharpIcon
										sx={{ margin: '25px 0', fontSize: 25, color: '#fff' }}
									/>
								</ListItemIcon>
								<MenuText text='Projects' />
							</ListItemButton>
						</Tooltip>
					</ListItem>
				</StyledList>

				<StyledList>
					<ListItem disablePadding>
						<Tooltip title='Customers'>
							<ListItemButton
								onClick={() => navigate('/customers')}
								style={{ paddingTop: '0', paddingBottom: '0' }}>
								<ListItemIcon>
									<PersonSearchSharpIcon
										sx={{ margin: '25px 0', fontSize: 25, color: '#fff' }}
									/>
								</ListItemIcon>
								<MenuText text='Customers' />
							</ListItemButton>
						</Tooltip>
					</ListItem>
				</StyledList>

				<StyledList>
					<ListItem disablePadding>
						<Tooltip title='Schedule'>
							<ListItemButton
								onClick={() => navigate('/scheduler')}
								style={{ paddingTop: '0', paddingBottom: '0' }}>
								<ListItemIcon>
									<CalendarMonthIcon
										sx={{ margin: '25px 0', fontSize: 25, color: '#fff' }}
									/>
								</ListItemIcon>
								<MenuText text='Scheduling' />
							</ListItemButton>
						</Tooltip>
					</ListItem>
				</StyledList>
			</Box>

			{isAdmin && (
				
				<Box>
					<StyledList>
						<ListItem disablePadding>
							<Tooltip title='Reports'>
								<ListItemButton
									onClick={() => navigate('/dashboard')}
									style={{ paddingTop: '0', paddingBottom: '0' }}>
									<ListItemIcon>
										<DashboardSharpIcon
											sx={{ margin: '25px 0', fontSize: 25, color: '#fff' }}
										/>
									</ListItemIcon>
									<MenuText text='Reports' />
								</ListItemButton>
							</Tooltip>
						</ListItem>
					</StyledList>
					<StyledList>
						<ListItem disablePadding>
							<Tooltip title='Settings'>
								<ListItemButton
									onClick={() => navigate('/organisation-edit')}
									style={{ paddingTop: '0', paddingBottom: '0' }}>
									<ListItemIcon>
										<CorporateFareIcon
											sx={{ margin: '25px 0', fontSize: 25, color: '#fff' }}
										/>
									</ListItemIcon>
									<MenuText text='Organisation' />
								</ListItemButton>
							</Tooltip>
						</ListItem>
					</StyledList>
				</Box>
			)}
		</Box>
	)
}

export default MenuList

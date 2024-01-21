import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	styled,
} from '@mui/material'
import MenuText from '../MenuText'
import { useNavigate } from 'react-router-dom'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import DashboardSharpIcon from '@mui/icons-material/DashboardSharp';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import PersonSearchSharpIcon from '@mui/icons-material/PersonSearchSharp'
import WorkHistorySharpIcon from '@mui/icons-material/WorkHistorySharp';
import Payments from '@mui/icons-material/Payments'
import useAuthUser from '../../hooks/useAuthUser'

const StyledList = styled(List)({
	'&:hover': {
		backgroundColor: '#555a64',
	},
})

const MenuList = () => {
	const navigate = useNavigate()

	const { isAdmin } = useAuthUser()

	return (
		<Box
			color='#c7cbd4'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				height: '100%',
			}}>
			<Box>
				{/* <Box height={'10px'}></Box> */}
				<StyledList>
					<ListItem disablePadding>
						<ListItemButton onClick={() => navigate('/documents')} style={{paddingTop: '0', paddingBottom: '0'}}>
							<ListItemIcon>
								<WorkHistorySharpIcon sx={{ margin: '25px 0', fontSize: 25, color: '#c7cbd4' }} />
							</ListItemIcon>
							<MenuText text='Documents' />
						</ListItemButton>
					</ListItem>
				</StyledList>

				<StyledList>
					<ListItem disablePadding>
						<ListItemButton onClick={() => navigate('/customers')} style={{paddingTop: '0', paddingBottom: '0'}}>
							<ListItemIcon>
								<PersonSearchSharpIcon sx={{ margin: '25px 0', fontSize: 25, color: '#c7cbd4' }} />
							</ListItemIcon>
							<MenuText text='Customers' />
						</ListItemButton>
					</ListItem>
				</StyledList>

				<StyledList>
					<ListItem disablePadding>
						<ListItemButton onClick={() => navigate('/dashboard')} style={{paddingTop: '0', paddingBottom: '0'}}>
							<ListItemIcon>
								<DashboardSharpIcon sx={{ margin: '25px 0', fontSize: 25, color: '#c7cbd4' }} />
							</ListItemIcon>
							<MenuText text='Dashboard' />
						</ListItemButton>
					</ListItem>
				</StyledList>

				{isAdmin && (
					<>
					<StyledList>
						<ListItem disablePadding>
							<ListItemButton onClick={() => navigate('/users')} style={{paddingTop: '0', paddingBottom: '0'}}>
								<ListItemIcon>
									<AdminPanelSettingsIcon sx={{ margin: '25px 0', fontSize: 25, color: '#c7cbd4' }} />
								</ListItemIcon>
								<MenuText text='Users' />
							</ListItemButton>
						</ListItem>
					</StyledList>
					<StyledList>
						<ListItem disablePadding>
							<ListItemButton onClick={() => navigate('/organisation')} style={{paddingTop: '0', paddingBottom: '0'}}>
								<ListItemIcon>
									<CorporateFareIcon sx={{ margin: '25px 0', fontSize: 25, color: '#c7cbd4' }} />
								</ListItemIcon>
								<MenuText text='Organisation' />
							</ListItemButton>
						</ListItem>
					</StyledList>
					</>
				)}
			</Box>
			<Box>
				<StyledList>
					<ListItem disablePadding>
						<ListItemButton onClick={() => navigate('/profile')} style={{paddingTop: '0', paddingBottom: '0'}}>
							<ListItemIcon>
								<ManageAccountsIcon sx={{ margin: '25px 0', fontSize: 25, color: '#c7cbd4' }} style={{paddingTop: '0', paddingBottom: '0'}}/>
							</ListItemIcon>
							<MenuText text='Manage Profile' />
						</ListItemButton>
					</ListItem>
				</StyledList>
			</Box>
		</Box>
	)
}

export default MenuList

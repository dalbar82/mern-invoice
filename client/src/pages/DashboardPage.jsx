import { Box, Typography } from '@mui/material'
import { useGetAllUsersQuery } from '../features/users/usersApiSlice'

const DashboardPage = () => {
	const { data: userData } = useGetAllUsersQuery()
	if (userData) localStorage.setItem('users', JSON.stringify(userData.users))

	return (
		<Box
			sx={{
				display: 'flex',
				marginLeft: '250px',
				mt: 10,
			}}>
			<Typography variant='p'>
				This Dashboard page is only allowed to logged in user
			</Typography>
		</Box>
	)
}

export default DashboardPage

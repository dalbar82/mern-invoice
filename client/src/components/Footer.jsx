import { Box, Link, Typography } from '@mui/material'
import { FaMoneyBillWave } from 'react-icons/fa'

function Copyright() {
	return (
		<Typography
			variant='body2'
			align='center'
			sx={{ color: '#ffffff' }}>
			Copyright ©
			<Link
				color='inherit'
				href='www.playworkstudios.com.au'>
				Playwork Studios
			</Link>
			{new Date().getFullYear()}
		</Typography>
	)
}
const Footer = () => {
	return (
		<Box
			sx={{
				position: 'fixed',
				bottom: 0,
				width: '100%',
				bgcolor: '#202128',
				marginTop: 'auto',
			}}>
			<Box
				component='footer'
				sx={{
					py: 1,
					px: 1,
					mt: 'auto',
					bgColor: '#202128',
				}}>
				<Typography
					variant='subtitle1'
					align='center'
					component='p'
					sx={{
						color: '#07f011',
					}}>
					<FaMoneyBillWave /> Because
				</Typography>
				<Copyright />
			</Box>
		</Box>
	)
}

export default Footer

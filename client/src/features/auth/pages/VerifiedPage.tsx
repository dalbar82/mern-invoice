import LockOpenIcon from '@mui/icons-material/LockOpen'
import { Button, Stack } from '@mui/material'
import Typography from '../../../components/Typography/Typography'
import Link from '../../../components/Links/pageLinks/Link'
import { FaCheckCircle } from 'react-icons/fa'
import { Link as ReactLink} from 'react-router-dom'
import useTitle from '../../../hooks/useTitle'

const VerifiedPage = () => {
	useTitle('Verify User - Job Forge')
	return (
		<Stack
			direction='column'
			alignItems='center'
			justifyContent='center'
			spacing={2}
			height='94vh'>
			<FaCheckCircle className='verified' />
			<Typography
				elementType='h2'
				text='Account Verified'
				/>

			<Typography
				elementType='h5'
				text='Your Account has been verified and is ready for use.'
				/>

			<Typography
				elementType='h5'
				text='An Email to confirm the same has been sent'
				/>
			<Button
				startIcon={<LockOpenIcon />}
				endIcon={<LockOpenIcon />}>
				<Link
					component={ReactLink}
					linkTo='/login'
					name='Please login to use our service'
					styles={{ textDecoration: 'none' }}>
					
				</Link>
			</Button>
		</Stack>
	)
}

export default VerifiedPage

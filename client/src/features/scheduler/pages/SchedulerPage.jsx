import React from 'react'
import { Box, Container, Typography, Button, Tooltip } from '@mui/material'
import SchedulingWrapper from './components/SchedulingWrapper'
import useTitle from '../../../hooks/useTitle'

function SchedulerPage() {
	useTitle('Scheduling')
	return (
		<>
			<Container
				component='main'
				maxWidth='xl'
				sx={{ mt: 14, ml: 15, width: '90%' }}>
				<Box className='page-header'>
					<Typography variant='h6'>Scheduling</Typography>
				</Box>
				<SchedulingWrapper />
			</Container>
		</>
	)
}

export default SchedulerPage

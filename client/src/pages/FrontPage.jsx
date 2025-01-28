import React, { createContext, useState, useContext } from 'react'
import { Box, Container, Typography, Button, Tooltip } from '@mui/material'
import { configContext } from '../App'
import useTitle from '../hooks/useTitle'
import './frontpage.css'
import DayView from '../modules/days/DayView'
import WeekView from '../modules/weeks/WeekView'
import MonthView from '../modules/months/MonthView'
import TopNav from '../components/Navigation/TopNav'

export const dateContext = createContext(null)
export const activeViewContext = createContext(null)

function FrontPage() {
	useTitle('Scheduling')
	const config = useContext(configContext)

	const todayDate = new Date()

	const [dateSelected, setDateSelected] = useState(todayDate)
	const [viewSelected, setViewSelected] = useState('day')

	const viewRenderSwitch = (selected) => {
		switch (selected) {
			case 'week':
				return <WeekView />
			case 'month':
				return <MonthView />
			default:
				return <DayView />
		}
	}

	return (
		<>
			<Container
				component='main'
				maxWidth='xl'
				sx={{ mt: 14, ml: 15, width: '90%' }}>
				<Box className='page-header'>
					<Typography variant='h6'>Scheduling</Typography>
				
				</Box>
				<div className='frontpage-container'>
					<dateContext.Provider value={[dateSelected, setDateSelected]}>
						<activeViewContext.Provider value={[viewSelected, setViewSelected]}>
							<TopNav />
							{viewRenderSwitch(viewSelected)}
						</activeViewContext.Provider>
					</dateContext.Provider>
				</div>
			</Container>
		</>
	)
}

export default FrontPage

import { useContext } from 'react'
import { configContext } from '../../App'
import { dateContext } from '../../pages/FrontPage'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import './date-chooser.css'

function DayDateChooser() {
	const config = useContext(configContext)

	const [dateSelected, setDateSelected] = useContext(dateContext)

	const formatter = new Intl.DateTimeFormat('en-AU', {
		timeZone: config.timeZone,
		dateStyle: 'medium',
		timeStyle: 'medium',
	})
	const formattedTodayDate = formatter.format(new Date())

	const yyyymmdd = dateSelected.toISOString().split('T')[0]

	const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newSelectedDate = new Date(e.target.value)
		setDateSelected(newSelectedDate)
	}

	const minusDay = () => {
		const date = new Date(dateSelected)
		date.setDate(date.getDate() - 1)

		setDateSelected(date)
	}
	const addDay = () => {
		const date = new Date(dateSelected)
		date.setDate(date.getDate() + 1)

		setDateSelected(date)
	}

	return (
		<>
			<div className='date-chooser-container'>
				<button
					onClick={minusDay}
					className='date-chooser-select date-chooser-select-left'>
					<IoIosArrowBack style={{ verticalAlign: 'middle' }} />
				</button>
				<div className='date-chooser-date'>
					<input
						type='date'
						className='date-chooser-date-input'
						value={yyyymmdd}
						min={formattedTodayDate}
						onChange={onDateChange}
					/>
				</div>
				<button
					onClick={addDay}
					className='date-chooser-select date-chooser-select-right'>
					<IoIosArrowForward style={{ verticalAlign: 'middle' }} />
				</button>
			</div>
		</>
	)
}

export default DayDateChooser

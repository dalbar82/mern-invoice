import { useContext } from 'react'
import { configContext } from '../../App'
import { dateContext } from '../../pages/FrontPage'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import './date-chooser.css'

function DayDateChooser() {
	// Define types for contexts
	const config = useContext(configContext)
	const [dateSelected, setDateSelected] = useContext(dateContext) as [Date, React.Dispatch<React.SetStateAction<Date>>]

	// Ensure the formatter uses valid config
	// const formatter = new Intl.DateTimeFormat('en-AU', {
	// 	timeZone: config?.timeZone || 'Australia/Sydney',
	// 	dateStyle: 'medium',
	// 	timeStyle: 'medium',
	// })

	// Ensure dateSelected is a valid Date object
	const yyyymmdd = dateSelected instanceof Date ? dateSelected.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]

	const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newSelectedDate = new Date(e.target.value)
		if (!isNaN(newSelectedDate.getTime())) {
			setDateSelected(newSelectedDate)
		}
	}

	const minusDay = () => {
		setDateSelected((prev) => new Date(prev.setDate(prev.getDate() - 1)))
	}

	const addDay = () => {
		setDateSelected((prev) => new Date(prev.setDate(prev.getDate() + 1)))
	}

	return (
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
					min={new Date().toISOString().split('T')[0]}
					onChange={onDateChange}
				/>
			</div>
			<button
				onClick={addDay}
				className='date-chooser-select date-chooser-select-right'>
				<IoIosArrowForward style={{ verticalAlign: 'middle' }} />
			</button>
		</div>
	)
}

export default DayDateChooser

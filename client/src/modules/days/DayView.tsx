import { useCallback, useContext, useEffect, useState } from 'react'
import { AppointmentItemsContext } from '../../App'
import { dateContext } from '../../pages/FrontPage'
import BasicModal from '../../components/Modals/BasicModal/BasicModal'
import { RxViewNone } from 'react-icons/rx'
import AppointmentItemsForm from '../../components/Forms/ScheduleItemForm/AppointmentItemsForm'
import { Appointment } from '../../types/Appointment'
import { User } from '../../types/User'
import './dayview.css'

function DayView() {
	const appointmentItemsContext = useContext(AppointmentItemsContext);
  if (!appointmentItemsContext) {
    throw new Error("AppointmentItemContext must be used within a Provider");
  }
  const { appointments, setAppointments } = appointmentItemsContext;

	const dateSelectedContext = useContext(dateContext)
	if (!dateSelectedContext) {
    throw new Error("dateSelectedContext must be used within a Provider");
  }
	const [dateSelected, setDateSelected] = dateSelectedContext

	const [dateSelectedItemsArray, setDateSelectedItemsArray] = useState<Appointment[]>([])
	const [itemsCountByAssigneeId, setItemsCountByAssigneeId] = useState<Appointment[]>([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedItemId, setSelectedItemId] = useState('')

	const openModal = (e: React.MouseEvent<HTMLElement>) => {
		setSelectedItemId(e.currentTarget.id)
		setIsModalOpen(true)
	}
	const closeModal = () => setIsModalOpen(false)

	const getSelectedDateItems = useCallback((): Appointment[] => {
		return appointments.filter((appointment) => appointment.startDate === dateSelected.toString());
	}, [appointments, dateSelected]);

	const hours = [
		'05',
		'06',
		'07',
		'08',
		'09',
		'10',
		'11',
		'12',
		'13',
		'14',
		'15',
		'16',
		'17',
		'18',
		'19',
	]
	const increment = {
		'00': 0,
		15: 15,
		30: 30,
		45: 45,
	}

	const hoursObject: Record<string, number> = {
		'05': 0,
		'06': 60,
		'07': 120,
		'08': 180,
		'09': 240,
		'10': 300,
		'11': 360,
		'12': 420,
		'13': 480,
		'14': 540,
		'15': 600,
		'16': 660,
		'17': 720,
		'18': 780,
		'19': 840,
	}

	// function getStartTime(time) {
	// 	// Getting minutes
	// 	const getTime = new Date(time)
	// 	let mins = getTime.getMinutes()

	// 	// Getting hours
	// 	let hrs = getTime.getHours()
	// 	let m = (parseInt((mins + 7.5) / 15) * 15) % 60

	// 	// Converting '09:0' to '09:00'
	// 	m = m < 10 ? '0' + m : m
	// 	let h = mins > 52 ? (hrs === 23 ? 0 : ++hrs) : hrs

	// 	// Converting '9:00' to '09:00'
	// 	h = h < 10 ? '0' + h : h
	// 	return h + ':' + m
	// }

	function getItemsListByAssigneeId(items: Appointment[]) {
		let flattenedList: Appointment[] = []
		items.map((item: Appointment) => {
			flattenedList.push(item)
		})
		const sortedFlatList = flattenedList.sort().filter(function (item, pos, ary) {
			return !pos || item !== ary[pos - 1]
		})
		return sortedFlatList
	}

	const formatter = new Intl.DateTimeFormat('en-AU', {
		// timeZone: config.timeZone,
		dateStyle: 'full',
	})
	useEffect(() => {
		setDateSelectedItemsArray(getSelectedDateItems())
	}, [setDateSelectedItemsArray, appointments, dateSelected, getSelectedDateItems])

	const getAssigneeListItems = (id: string) => {
		// const listItems: Appointment[] = []
		const filteredItems: Appointment[] = dateSelectedItemsArray.filter((item) => item.assigneeId === id);

		// dateSelectedItemsArray.map((item) => {
		// 	listItems.push(item.assigneeId === id ? item : false)
		// })
		return filteredItems
	}

	useEffect(() => {
		setItemsCountByAssigneeId(getItemsListByAssigneeId(dateSelectedItemsArray))
	}, [setItemsCountByAssigneeId, dateSelectedItemsArray])

	function findFirstNonNullArgument(args: any[]) {
		return args.find((arg: boolean) => arg !== false)
	}

	const getAssigneeName = (id: string) => {
		const name: (string | boolean)[] = []
		dateSelectedItemsArray.map((item) => {
			name.push(item?.assigneeId === id ? item?.assigneeName : false)
			return ''
		})
		return name
	}

	function test(text: string | any[]) {
		var text_len = text.length
		if (text_len % 2 != 0) {
			let start = (text_len - 1) / 2
			return text.slice(start, start + 1)
		} else {
			let start = text_len / 2 - 1
			return text.slice(start, start + 2)
		}
	}

	return (
		<>
			<div>
				<h3>This is the Day View</h3>
				<div className='calendar-body '>
					<div className='table-header flex-row'>
						{hours.map((hours) => {
							return (
								<div
									className='hours'
									key={hours}>
									<p>{hours}:00</p>
								</div>
							)
						})}
					</div>

					{itemsCountByAssigneeId?.length > 0 ? (
						<div className='table'>
							{itemsCountByAssigneeId.map((assignee) => {
								const assigneeListItems = getAssigneeListItems(assignee.assigneeId)
								const assigneeName = getAssigneeName(assignee.assigneeId)

								return (
									<div
										className='item'
										key={assignee.assigneeId}>
										<div className='assignee-name'>
											{findFirstNonNullArgument(assigneeName)}
										</div>
										{assigneeListItems?.map((item) => {
											return (
												<>
													{item && (
														<div
															className='sub-item flex-row'
															key={item?.itemId}>
															<div className='item-assignee flex-row'>
																<p>{item?.jobName}</p>
															</div>
															<div className='time-line flex-row'>
																<div
																	className='time-tail flex-row'
																	id={item?.itemId.toString()}
																	onClick={openModal}
																	style={{
																		left: `${
																			(hoursObject[item?.startTime?.slice(0, 2)]) +
																			parseInt(item?.startTime?.slice(3, 5))
																		}px`,
																		width: `${item?.duration}px`,
																	}}>
																	<p className='pl5'>{item?.startTime}</p>
																</div>
																{/* <div className='end-time'></div> */}
															</div>
														</div>
													)}
												</>
											)
										})}
									</div>
								)
							})}
						</div>
					) : (
						<div className='no-items flex-row'>
							<div>
								<RxViewNone
									size='80px'
									color='#f0f0f0'
								/>
								<h3>No items for today</h3>
								<p>Click add button above</p>
							</div>
						</div>
					)}
				</div>
			</div>

			<BasicModal
				isOpen={isModalOpen}
				onClose={closeModal}>
				<AppointmentItemsForm
					id={selectedItemId}
					onClose={closeModal}
					title='Item Details'
				/>
			</BasicModal>
		</>
	)
}

export default DayView

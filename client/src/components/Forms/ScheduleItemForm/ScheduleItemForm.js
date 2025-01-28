import React, { useEffect, useState, useContext } from 'react'
import './scheduleItemForm.css' // CSS file for styling
import { scheduleItemsContext } from '../../../App'
import ItemsList from '../../../data/scheduleItems'

const ScheduleItemForm = ({ id, title, onClose }) => {
	const [scheduleItems, setScheduleItems] = useContext(scheduleItemsContext)

	const [formData, setFormData] = useState({
		jobName: '',
		jobNumber: '',
		contactName: '',
		contactPhone: '',
		jobAddressLong: {
			streetNumber: 78,
			streetName: 'Queen Street',
			city: 'Brisbane',
			state: 'QLD',
			postcode: '4000',
		},
		jobAddressShort: '78 Queen St, Brisbane, QLD',
		itemId: 2,
		assigneeId: '',
		assigneeName: '',
		duration: '',
		due: new Date().toISOString().split('T')[0],
		startDate: '',
		startTime: '',
		jobDetails: '',
	})

	const handleInputChange = (e) => {
		const { name, value } = e.target
		
		if (name == 'hourUp') {
			const field = 'duration'
			setFormData((prevData) => ({
			...prevData,
			[field]: parseInt(60) + parseInt(prevData.duration)
			}))
		}
		if (name == 'hourDown') {
			const field = 'duration'
			setFormData((prevData) => ({
			...prevData,
			[field]: parseInt(-60) + parseInt(prevData.duration)
			}))
		}

		if (name == 'minuteUp') {
			const field = 'duration'
			setFormData((prevData) => ({
			...prevData,
			[field]: parseInt(5) + parseInt(prevData.duration)
			}))
		}
		if (name == 'minuteDown') {
			const field = 'duration'
			setFormData((prevData) => ({
			...prevData,
			[field]: parseInt(-5) + parseInt(prevData.duration)
			}))
		}

		if (name.startsWith('jobAddressLong.')) {
			const field = name.split('.')[1]
			setFormData((prevData) => ({
				...prevData,
				jobAddressLong: {
					...prevData.jobAddressLong,
					[field]: value,
				},
			}))
		} else {
			setFormData((prevData) => ({ ...prevData, [name]: value }))
		}
	}

	const getItemDetails = () => {
		const item = scheduleItems.find(({ itemId }) => itemId == id)
		item && setFormData(item)
	}

	useEffect(() => {
		getItemDetails()
	}, [id])

	const handleSubmit = (e) => {
		e.preventDefault()
		//console.log('Form submitted:', formData)
		const updateData = scheduleItems.map(item => {
			if (item.itemId !== formData.itemId) {
				return item
			} else {
				return {
					...formData
				}
			}
		})
		// console.log("inside form",updateData)
		setScheduleItems(updateData)
    	onClose()
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='job-form'>
			<div className='schedule-item-container'>
				<div className='schedule-item-form-left'>
					<h1>{title}</h1>
					<div className='form-group group-row'>
						<label>Job Name:</label>
						<input
							type='text'
							name='jobName'
							value={formData?.jobName}
							onChange={handleInputChange}
						/>
					</div>

					<div className='form-group group-row'>
						<label>Job Number:</label>
						<input
							type='text'
							name='jobNumber'
							value={formData?.jobNumber}
							onChange={handleInputChange}
						/>
					</div>

					<div className='form-group group-row'>
						<label>Contact Name:</label>
						<input
							type='text'
							name='contactName'
							value={formData?.contactName}
							onChange={handleInputChange}
						/>
					</div>

					<div className='form-group group-row'>
						<label>Contact Phone:</label>
						<input
							type='text'
							name='contactPhone'
							value={formData?.contactPhone}
							onChange={handleInputChange}
						/>
					</div>

					<div className='form-group group-row'>
						<label>Assignee ID:</label>
						<input
							type='text'
							name='assigneeId'
							value={formData?.assigneeId}
							onChange={handleInputChange}
						/>
					</div>

					<div className='form-group group-row'>
						<label>Assignee Name:</label>
						<input
							type='text'
							name='assigneeName'
							value={formData.assigneeName}
							onChange={handleInputChange}
						/>
					</div>

					<div className='form-group group-row'>
						<label>Start Date:</label>
						<input
							type='date'
							name='startDate'
							value={
								formData.startDate
									? new Date(formData?.startDate).toISOString().split('T')[0]
									: ''
							}
							onChange={handleInputChange}
						/>
					</div>
					<div className='form-group group-row'>
						<label>Start Time:</label>
						<input
							type='time'
							name='startTime'
							value={
								formData?.startTime || '07:30'
							}
							onChange={handleInputChange}
						/>
					</div>

						<div className='form-group group-row '>
							<label>Duration:</label>
							<input
								type='number'
								name='hours'
								value={formData.duration}
								onChange={handleInputChange}
								readOnly
							/>
						</div>
					<div className='form-group group-row '>
						
							<label>Add/Rem 1 hour:</label>
							<div className='flex-row'>
							<button 
								className='count-button'
								type='button'
								name='hourDown'
								onClick={handleInputChange}
								style={{marginRight: '20px'}}
								>-</button>
							<button 
								className='count-button'
								type='button'
								name='hourUp'
								onClick={handleInputChange}
								>+</button>
							</div>
						
							<label>Add/Rem 5 minutes:</label>
							<div className='flex-row'>
								<button 
									className='count-button'
									type='button'
									name='minuteDown'
									onClick={handleInputChange}
									style={{marginRight: '20px'}}
									>-</button>
								<button 
									className='count-button'
									type='button'
									name='minuteUp'
									onClick={handleInputChange}
									>+</button>
							</div>
					</div>

					<div className='form-group group-row'>
						<label>Job Details:</label>
						<textarea
							name='jobDetails'
							value={formData.jobDetails}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className='schedule-item-form-right'>
					<fieldset className='address-fieldset'>
						<legend className='address-header'>Job Address</legend>

						{/* <div className="form-group group-row">
            <label>Job Address (Short):</label>
            <input
            type="text"
            name="jobAddressShort"
            value={formData.jobAddressShort}
            onChange={handleInputChange}
            />
        </div> */}

						<div className='form-group group-row'>
							<label>Street Number:</label>
							<input
								type='number'
								name='jobAddressLong.streetNumber'
								value={formData?.jobAddressLong?.streetNumber}
								onChange={handleInputChange}
							/>
						</div>

						<div className='form-group group-row'>
							<label>Street Name:</label>
							<input
								type='text'
								name='jobAddressLong.streetName'
								value={formData?.jobAddressLong?.streetName}
								onChange={handleInputChange}
							/>
						</div>

						<div className='form-group group-row'>
							<label>City:</label>
							<input
								type='text'
								name='jobAddressLong.city'
								value={formData?.jobAddressLong?.city}
								onChange={handleInputChange}
							/>
						</div>

						<div className='form-group group-row'>
							<label>State:</label>
							<input
								type='text'
								name='jobAddressLong.state'
								value={formData?.jobAddressLong?.state}
								onChange={handleInputChange}
							/>
						</div>

						<div className='form-group group-row'>
							<label>Postcode:</label>
							<input
								type='text'
								name='jobAddressLong.postcode'
								value={formData?.jobAddressLong?.postcode}
								onChange={handleInputChange}
							/>
						</div>
					</fieldset>
					<button
						type='submit'
						className='submit-button'>
						Submit
					</button>
				</div>
			</div>
		</form>
	)
}

export default ScheduleItemForm

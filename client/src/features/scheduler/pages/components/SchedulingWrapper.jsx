// import { useState, useRef } from 'react'
// import {
// 	useGetAllAppointmentsQuery,
// 	useCreateAppointmentMutation,
// } from '../../schedulerApiSlice'
// import { useGetAllUsersQuery } from '../../../users/usersApiSlice'

// import {
// 	ScheduleComponent,
// 	Day,
// 	Week,
// 	Month,
// 	Agenda,
// 	Inject,
// 	ResourcesDirective,
// 	ResourceDirective,
// } from '@syncfusion/ej2-react-schedule'
// import { registerLicense, createElement } from '@syncfusion/ej2-base'
// import { L10n } from '@syncfusion/ej2-base';

// L10n.load({
//   'en-US': {
//     'schedule': {
//       'saveButton': 'Add',
//       'cancelButton': 'Close',
//       'deleteButton': 'Remove',
//       'newEvent': 'Add Event',
//     },
//   }
// });

// // Registering Syncfusion license key
// registerLicense(
// 	'Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXtceXVcRmBeU0V2VkA='
// )

// const fieldsData = {
// 	id: '_id',
// 	subject: { name: 'subject' },
// 	location: { name: 'location' },
// 	description: { name: 'description' },
// 	startTime: { name: 'startTime' },
// 	endTime: { name: 'endTime' },
// }
// function SchedulingWrapper() {
// 	const { data: appointmentData } = useGetAllAppointmentsQuery()

// 	const [createAppointment, { isLoading, isSuccess }] =
// 		useCreateAppointmentMutation()

// 	const { data: users } = useGetAllUsersQuery()

// 	const eventSettings = {
// 		dataSource: appointmentData?.myAppointments,
// 		fields: fieldsData,
// 	}
// 	const validation = (e) => {
// 		// this is the "context" for the function.  In this case
// 		// the element that changed.
// 		var value = e.target.value
// 		console.log(value)
// 	}

// 	const onPopupOpen = (args) => {
// 		if (args.type === 'Editor') {
// 			if (!args.element.querySelector('.custom-field-row')) {
// 				let row = createElement('div', { className: 'custom-field-row' })
// 				let formElement = args.element.querySelector('.e-schedule-form')
// 				formElement.firstChild.insertBefore(row, formElement.firstChild.firstChild)
// 				let container = createElement('div', {
// 					className: 'custom-field-container',
// 				})
// 				let inputEle = createElement('input', {
// 					className: 'e-field e-input',
// 					attrs: {
// 						type: 'text',
// 						name: 'contactEmail',
// 						value: args?.data?.contacts?.map((contact) => contact.contactEmail) || '',
// 					},
// 				})
// 				inputEle.oninput = validation
// 				container.appendChild(inputEle)
// 				row.appendChild(container)
// 				inputEle.setAttribute('name', 'EventType')
// 			}
// 		}
// 	}
// 	const saveUpdateAppointment = async (properties) => {
// 		console.log('hjgjhhjjhjh', properties)
// 		try {
// 			const appointmentInfo = {
// 				subject: properties?.data?.subject,
// 				description: properties?.data?.description,
// 				contacts: properties?.data?.contactEmail,
// 				location: properties?.data?.location,
// 				startTime: properties?.data?.startTime,
// 				endTime: properties?.data?.endTime,
// 				assignedUsers: properties?.data?.emails,
// 			}
// 			await createAppointment(appointmentInfo)
// 		} catch (err) {
// 			console.error(err)
// 		}
// 	}
// 	return (
// 		<>
// 			<ScheduleComponent
// 				eventSettings={eventSettings}
// 				popupOpen={onPopupOpen}
// 				popupClose={saveUpdateAppointment}
// 				height='80vh'>
// 				<ResourcesDirective>
// 					<ResourceDirective
// 						field='email'
// 						title='Staff Assigned'
// 						name='email'
// 						allowMultiple={true}
// 						dataSource={users?.users}
// 						textField='email'
// 						value='_id'
// 						idField='_id'></ResourceDirective>
// 				</ResourcesDirective>
// 				<Inject services={[Day, Week, Month, Agenda]} />
// 			</ScheduleComponent>
// 		</>
// 	)
// }

// export default SchedulingWrapper

import { useState } from 'react'

import {
	ScheduleComponent,
	Day,
	Week,
	Month,
	Agenda,
	Inject,
} from '@syncfusion/ej2-react-schedule'

import { registerLicense } from '@syncfusion/ej2-base'

// Registering Syncfusion license key
registerLicense(
	'Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXtceXVcRmBeU0V2VkA='
)

const data = [
	{
		Id: 1,
		Subject: 'Meeting - 1',
		StartTime: new Date(2024, 4, 15, 10, 0),
		EndTime: new Date(2024, 4, 16, 12, 30),
		IsAllDay: true,
	},
]

const eventSettings = { dataSource: data }

function SchedulingWrapper() {
	return (
		<>
			<ScheduleComponent
				eventSettings={eventSettings}
				height='80vh'>
				<Inject services={[Day, Week, Month, Agenda]} />
			</ScheduleComponent>
		</>
	)
}

export default SchedulingWrapper

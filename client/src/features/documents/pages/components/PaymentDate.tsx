import { TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

interface PaymentDateProps {
	datePaid: Date
	setDatePaid: (date: Date) => void
}

const PaymentDate: React.FC<PaymentDateProps> = ({ datePaid, setDatePaid }) => {
	const handleChange = (date: Date | null) => {
		if (date) {
			setDatePaid(date)
		}
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DesktopDatePicker
				label='Date Paid'
				format='dd/MM/yyyy'
				value={datePaid}
				onChange={handleChange}
				slots={{
					textField: (params) => (
						<TextField
							{...params}
							sx={{ width: '100%' }}
							variant='standard'
						/>
					),
				}}
			/>
		</LocalizationProvider>
	)
}

export default PaymentDate

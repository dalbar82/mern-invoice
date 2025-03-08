import PaidIcon from '@mui/icons-material/Paid'
import { Autocomplete, Box, TextField, Typography, Button } from '@mui/material'
import { toast } from 'react-toastify'
import Spinner from '../../../components/Spinner'
import { useEffect, useState } from 'react'
import PaymentDate from './components/PaymentDate'

import {
	useCreatePaymentMutation,
	useUpdateDocMutation,
} from '../documentsApiSlice'

import { JobDocument, PaymentRecord } from '../../../types/JobDocument'

interface PaymentFormProps {
	document: JobDocument
}

const PaymentForm: React.FC<PaymentFormProps> = ({ document }) => {
	const [createPayment, { isLoading, isSuccess, data }] =
		useCreatePaymentMutation()

	const [updateDoc] = useUpdateDocMutation()

	const paymentOptions: string[] = [
		'Mobile Money',
		'Cash',
		'Bank Transfer',
		'PayPal',
		'Credit Card',
		'Others',
	]

	const [datePaid, setDatePaid] = useState<Date>(new Date())
	const [paymentMethod, setPaymentMethod] = useState<string>('')
	const [additionalInfo, setAdditionalInfo] = useState<string>('')
	const [amountPaid, setAmountPaid] = useState<number>(0)
	const [totalAmountReceived, setTotalAmountReceived] = useState<number>(0)

	useEffect(() => {
		if (isSuccess) {
			const message = data?.message || 'Payment recorded successfully'
			toast.success(message)
			setAmountPaid(0)
			setPaymentMethod('')
			setAdditionalInfo('')
		}
	}, [data, isSuccess])

	useEffect(() => {
		let totalReceived = 0
		document?.paymentRecords?.forEach((record: PaymentRecord) => {
			totalReceived += Number(record.amountPaid)
		})
		setTotalAmountReceived(totalReceived)
	}, [document])

	const paymentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			await createPayment({
				id: document._id,
				paidBy: document.customer?.name || 'Unknown',
				datePaid,
				paymentMethod,
				additionalInfo,
				amountPaid,
			}).unwrap()

			await updateDoc({
				id: document._id,
				totalAmountReceived: totalAmountReceived + amountPaid,
				status:
					totalAmountReceived + amountPaid >= (document?.total || 0)
						? 'Paid'
						: 'Not Fully Paid',
			}).unwrap()
		} catch (err: any) {
			const message = err?.data?.message || 'An error occurred'
			toast.error(message)
		}
	}

	return (
		<Box
			sx={{
				mt: '1rem',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
			component='form'
			noValidate
			autoComplete='off'
			onSubmit={paymentHandler}>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<PaymentDate
						datePaid={datePaid}
						setDatePaid={setDatePaid}
					/>
					<TextField
						margin='dense'
						name='amountPaid'
						label='Amount Paid'
						type='number'
						fullWidth
						variant='standard'
						onChange={(e) => setAmountPaid(Number(e.target.value))}
						value={amountPaid}
					/>

					<Autocomplete
						options={paymentOptions}
						sx={{ width: '100%' }}
						renderInput={(params) => (
							<TextField
								{...params}
								label='Payment Method'
								variant='standard'
							/>
						)}
						onChange={(event, value) => setPaymentMethod(value || '')}
					/>

					<TextField
						margin='dense'
						name='additionalInfo'
						label='Additional Info'
						type='text'
						fullWidth
						variant='standard'
						onChange={(e) => setAdditionalInfo(e.target.value)}
						value={additionalInfo}
					/>
				</>
			)}

			<Button
				sx={{ mt: 3, mb: 2 }}
				type='submit'
				fullWidth
				variant='contained'
				color='success'
				size='large'
				startIcon={<PaidIcon />}
				disabled={!amountPaid || !paymentMethod}>
				<Typography variant='h5'>Record Payment</Typography>
			</Button>
		</Box>
	)
}

export default PaymentForm

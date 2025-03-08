import React, { useRef, useState, ChangeEvent } from 'react'
import { Box, Grid, Button, CircularProgress, TextField } from '@mui/material'
import axios from 'axios'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { IOrganisation } from '../../../types/Organisation'

// Define Props Interface
interface OrganisationDetailsProps {
	organisation: IOrganisation["organisation"]
	email: string
	emailUpdate: (value: string) => void
	phoneNumber: string
	phoneNumberUpdate: (value: string) => void
	abn: number
	abnUpdate: (value: number) => void
	name: string
	nameUpdate: (value: string) => void
	streetAddress: string
	streetAddressUpdate: (value: string) => void
	city: string
	cityUpdate: (value: string) => void
	state: string
	stateUpdate: (value: string) => void
	postcode: string
	postcodeUpdate: (value: string) => void
	country: string
	countyUpdate: (value: string) => void
	logo: string
	logoUpdate: (value: string) => void
}

const OrganisationDetails: React.FC<OrganisationDetailsProps> = ({
	organisation,
	email,
	emailUpdate,
	phoneNumber,
	phoneNumberUpdate,
	abn,
	abnUpdate,
	name,
	nameUpdate,
	streetAddress,
	streetAddressUpdate,
	city,
	cityUpdate,
	state,
	stateUpdate,
	postcode,
	postcodeUpdate,
	country,
	countyUpdate,
	logo,
	logoUpdate,
}) => {
	const inputRef = useRef<HTMLInputElement | null>(null)
	const [uploading, setUploading] = useState(false)

	const handleOpenFileInput = () => {
		inputRef.current?.click()
	}

	const uploadFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		const formData = new FormData()
		formData.append('logo', file)
		setUploading(true)

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
			const { data } = await axios.patch('/api/v1/upload', formData, config)

			if (data.success === false) {
				logoUpdate(`Sorry, ${data.message}. Please try again`)
			} else {
				logoUpdate(data)
			}
		} catch (error) {
			console.error('File upload error:', error)
		} finally {
			setUploading(false)
		}
	}

	return (
		<Grid
			rowSpacing={4}
			container
			sx={{
				padding: '24px 24px',
			}}
			justifyContent='space-between'>
			<Grid
				style={{ paddingTop: '0', display: 'flex', flexDirection: 'column' }}
				item
				xs={6}
				mt={3}>
				<Grid
					item
					mt={3}
					xs={12}>
					{organisation && (
						<Grid container rowSpacing={3}>
							<Grid item xs={12}>
								<TextField
									required
									sx={{ marginRight: '20px', width: '96%' }}
									label='Name'
									value={name}
									onChange={(e) => nameUpdate(e.target.value)}
								/>
							</Grid>
							<Grid item md={12}>
								<TextField
									required
									sx={{ marginRight: '20px', width: '96%' }}
									label='Billing Email'
									value={email}
									onChange={(e) => emailUpdate(e.target.value)}
								/>
							</Grid>
							<Grid item md={12}>
								<TextField
									required
									sx={{ marginRight: '20px', width: '96%' }}
									label='ABN'
									value={abn}
									onChange={(e) => abnUpdate(parseInt(e.target.value))}
								/>
							</Grid>
							<Grid item md={12}>
								<TextField
									required
									sx={{ marginRight: '20px', width: '96%' }}
									label='Billing Phone Number'
									value={phoneNumber}
									onChange={(e) => phoneNumberUpdate(e.target.value)}
								/>
							</Grid>
							<Grid item md={12}>
								<TextField
									required
									sx={{ marginRight: '20px', width: '96%' }}
									label='Street'
									value={streetAddress}
									onChange={(e) => streetAddressUpdate(e.target.value)}
								/>
							</Grid>
							<Grid item md={4}>
								<TextField
									required
									sx={{ marginRight: '20px', width: '88%' }}
									label='Suburb/Town'
									value={city}
									onChange={(e) => cityUpdate(e.target.value)}
								/>
							</Grid>
							<Grid item md={4}>
								<TextField
									required
									sx={{ marginRight: '20px', width: '88%' }}
									label='State'
									value={state}
									onChange={(e) => stateUpdate(e.target.value)}
								/>
							</Grid>
							<Grid item md={4}>
								<TextField
									required
									sx={{ marginRight: '20px', width: '88%' }}
									label='Postcode'
									value={postcode}
									onChange={(e) => postcodeUpdate(e.target.value)}
								/>
							</Grid>
							<Grid item md={12}>
								<TextField
									required
									sx={{ marginRight: '20px', width: '96%' }}
									label='Country'
									value={country}
									onChange={(e) => countyUpdate(e.target.value)}
								/>
							</Grid>
						</Grid>
					)}
				</Grid>
			</Grid>

			{/* Logo Box */}
			<Grid item style={{ paddingTop: '23px' }} md={6} sm={12}>
				<Box
					sx={{
						backgroundColor: '#f6fafb',
						borderRadius: '4px',
						margin: '0 0 0 20px',
						width: '90%',
						height: '100%',
						padding: '25px',
					}}>
					<Box
						borderRadius={1}
						sx={{
							display: 'flex',
							alignContent: 'center',
							justifyContent: 'center',
						}}>
						{logo ? (
							<img
								src={logo}
								alt='Company Logo'
								style={{
									width: '350px',
									height: '350px',
									objectFit: 'cover',
									marginBottom: '20px',
								}}
							/>
						) : (
							<AccountCircleIcon
								style={{
									width: '350px',
									height: '350px',
									objectFit: 'cover',
									marginBottom: '20px',
								}}
								color='info'
							/>
						)}
					</Box>

					<Box sx={{ fontWeight: '400', paddingBottom: '20px', marginBottom: '20px' }}>
						<TextField
							sx={{ marginTop: '20px', marginBottom: '10px' }}
							variant='filled'
							fullWidth
							label='Logo URL'
							value={logo}
							onChange={(e) => logoUpdate(e.target.value)}
						/>
						<input
							accept='.jpg, .png'
							type='file'
							style={{ display: 'none' }}
							ref={inputRef}
							onChange={uploadFileHandler}
						/>
						<Button
							sx={{ mt: '5px' }}
							fullWidth
							size='large'
							variant='contained'
							onClick={handleOpenFileInput}
							disabled={uploading}>
							{uploading ? <CircularProgress size={24} /> : 'Upload Company Logo or Paste URL'}
						</Button>
					</Box>
				</Box>
			</Grid>
		</Grid>
	)
}

export default OrganisationDetails

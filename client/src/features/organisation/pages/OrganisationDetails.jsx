import React, { useRef, useState } from 'react'
import { Box, Grid, Button, CircularProgress, TextField } from '@mui/material'
import axios from 'axios'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

function OrganisationDetails({
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
}) {
	const inputRef = useRef(null)

	const handleOpenFileInput = () => {
		inputRef.current.click()
	}
	const [uploading, setUploading] = useState(false)
	const uploadFileHandler = async (e) => {
		const file = e.target.files[0]
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
			console.log('data', data)
			if (data.success === false) {
				logoUpdate(`Sorry, ${data.message}. Please try again`)
			} else {
				setUploading(false)
				logoUpdate(data)
			}
		} catch (error) {
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
						<Grid
							container
							rowSpacing={3}>
							<Grid
								item
								xs={12}>
								<TextField
									required
									sx={{ marginRight: '20px', width: '96%' }}
									label='Name'
									value={name}
									onChange={(e) => {
										nameUpdate(e.target.value)
									}}
								/>
							</Grid>
							<Grid
								item
								md={12}>
								<TextField
									required
									sx={{ marginRight: '20px', width: '96%' }}
									label='Billing email'
									value={email}
									onChange={(e) => {
										emailUpdate(e.target.value)
									}}
								/>
							</Grid>
							<Grid
								item
								md={12}>
								<TextField
									required
									sx={{ marginRight: '20px', width: '96%' }}
									label='ABN'
									value={abn}
									onChange={(e) => {
										abnUpdate(e.target.value)
									}}
								/>
							</Grid>
							<Grid
								item
								md={12}>
								<TextField
									required
									sx={{ marginRight: '20px', width: '96%' }}
									label='Billing phoneNumber number'
									value={phoneNumber}
									onChange={(e) => {
										phoneNumberUpdate(e.target.value)
									}}
								/>
							</Grid>
							<Grid
								item
								md={12}>
								<TextField
									required
									sx={{ marginRight: '20px', width: '96%' }}
									label='Street'
									value={streetAddress}
									onChange={(e) => {
										streetAddressUpdate(e.target.value)
									}}
								/>
							</Grid>
							<Grid
								item
								md={4}>
								<TextField
									required
									sx={{ marginRight: '20px', width: '88%' }}
									label='Suburb/Town'
									value={city}
									onChange={(e) => {
										cityUpdate(e.target.value)
									}}
								/>
							</Grid>
							<Grid
								item
								md={4}>
								<TextField
									required
									sx={{ marginRight: '20px', width: '88%' }}
									label='State'
									value={state}
									onChange={(e) => {
										stateUpdate(e.target.value)
									}}
								/>
							</Grid>
							<Grid
								item
								md={4}>
								<TextField
									required
									sx={{ marginRight: '20px', width: '88%' }}
									label='Postcode'
									value={postcode}
									onChange={(e) => {
										postcodeUpdate(e.target.value)
									}}
								/>
							</Grid>
							<Grid
								item
								md={12}>
								<TextField
									required
									sx={{ marginRight: '20px', width: '96%' }}
									label='Country'
									value={country}
									onChange={(e) => {
										countyUpdate(e.target.value)
									}}
								/>
							</Grid>
						</Grid>
					)}
				</Grid>
			</Grid>
			{/* logo box */}
			<Grid
				item
				style={{ paddingTop: '23px' }}
				md={6}
				sm={12}>
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
								alt='logo'
								style={{
									width: '350px',
									height: '350px',
									objectFit: 'cover',
									marginBotton: '20px',
								}}
							/>
						) : (
							<AccountCircleIcon
								style={{
									width: '350px',
									height: '350px',
									objectFit: 'cover',
									marginBotton: '20px',
								}}
								color='info'
							/>
						)}
					</Box>
					<Box
						sx={{
							fontWeight: '400',
							paddingBottom: '20px',
							marginBottom: '20px',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}>
						<TextField
							sx={{
								marginTop: '20px',
								marginBottom: '10px',
							}}
							variant='filled'
							fullWidth
							id='logo'
							name='logo'
							label='Logo Url'
							value={logo}
							onChange={(e) => {
								logoUpdate(e.target.value)
							}}
						/>
						<label
							htmlFor='logo'
							style={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
							}}>
							<input
								accept='.jpg, .png'
								id='logo'
								name='logo'
								type='file'
								style={{ display: 'none' }}
								ref={inputRef}
								onChange={uploadFileHandler}
							/>
							{!uploading ? (
								<label>
									<Button
										sx={{ mt: '5px' }}
										fullWidth
										size='large'
										variant='contained'
										component='span'
										onClick={handleOpenFileInput}>
										Upload Company Logo or Paste Url
									</Button>
								</label>
							) : (
								<CircularProgress
									size={60}
									sx={{ margin: 'auto' }}
								/>
							)}
						</label>
					</Box>
				</Box>
			</Grid>
		</Grid>
	)
}

export default OrganisationDetails

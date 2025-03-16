import ClearIcon from '@mui/icons-material/Clear'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import DoneIcon from '@mui/icons-material/Done'
import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	Container,
	Grid,
	styled,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import validator from 'validator'
import Spinner from '../../../components/Spinner'
import useTitle from '../../../hooks/useTitle'
import '../../../styles/drawer.css'

import {
	useGetUserProfileQuery,
	useUpdateUserProfileMutation,
} from '../usersApiSlice'

const Input = styled('input')({
	display: 'none',
})

const EditProfileForm = () => {
	useTitle('Edit Profile')
	
	const navigate = useNavigate()
	const goBack = () => navigate(-1)

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [username, setUsername] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const isValidPhoneNumber = phoneNumber
		? validator.isMobilePhone(phoneNumber)
		: ''

	const [address, setAddress] = useState('')
	const [businessName, setBusinessName] = useState('')
	const [city, setCity] = useState('')
	const [country, setCountry] = useState('')

	const [avatar, setAvatar] = useState('')
	const [uploading, setUploading] = useState(false)

	const { data } = useGetUserProfileQuery(undefined)

	const [updateMyProfile, { data: updateData, isLoading, isSuccess }] =
		useUpdateUserProfileMutation()

	useEffect(() => {
		const userProfile = data?.userProfile
		if (userProfile) {
			setFirstName(userProfile?.firstName)
			setLastName(userProfile?.lastName)
			setUsername(userProfile?.username)
			setPhoneNumber(userProfile?.phoneNumber)
			setBusinessName(userProfile?.businessName)
			setCity(userProfile?.city)
			setAddress(userProfile?.address)
			setCountry(userProfile?.country)
			setAvatar(userProfile?.avatar)
		}
	}, [data])

	useEffect(() => {
		if (isSuccess) {
			navigate('/profile')
			const message = updateData?.message
			toast.success(message)
		}
	}, [updateData, isSuccess, navigate])

	const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
	
		if (!e.target.files || e.target.files.length === 0) {
			console.warn("No file selected");
			return; // ✅ Exit if no file is selected
		}
	
		const file = e.target.files[0]; // ✅ Safe access
		const formData = new FormData();
		formData.append("logo", file);
		setUploading(true);
	
		try {
			const config = {
				headers: { "Content-Type": "multipart/form-data" },
			};
	
			const { data } = await axios.patch("/api/v1/upload", formData, config);
			setAvatar(data);
		} catch (error) {
			console.error("Upload failed:", error);
		} finally {
			setUploading(false);
		}
	};
	

	const updateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const userData = {
				firstName,
				lastName,
				username,
				phoneNumber,
				businessName,
				address,
				city,
				country,
				avatar,
			}
			await updateMyProfile(userData).unwrap()
		} catch (err: unknown) {
			if (err instanceof Error) {
			const message = err?.message
			toast.error(message)
		} else {
			console.error("Unknown error:", err);
		}
		}
	}

	return (
		<div className='drawer'>
			<Container
				className='drawer-page'
				component='main'
				sx={{
					mt: 14,
					ml: 15,
				}}>
				{isLoading ? (
					<Spinner />
				) : (
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
						component='form'
						noValidate
						autoComplete='off'
						onSubmit={updateHandler}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								borderBottom: '1px solid #e1e1e1',
								paddingBottom: '20px',
								marginBottom: '20px',
								width: '100%',
							}}>
							<Typography variant='h6'>Edit</Typography>

							<Box>
								<Tooltip title='Submit'>
									<Button
										color='success'
										sx={{ p: '15px 0px 15px 10px', color: '#a6aeb3' }}
										variant='text'
										startIcon={<DoneIcon />}
										type='submit'></Button>
								</Tooltip>
								<Tooltip title='Cancel'>
									<Button
										sx={{ p: '15px 0px 15px 10px', color: '#a6aeb3' }}
										variant='text'
										startIcon={<ClearIcon />}
										onClick={goBack}></Button>
								</Tooltip>
							</Box>
						</Box>
						<Grid
							container
							spacing={2}>
							<Grid
								item
								md={6}>
								{/* firstName */}
								<TextField
									variant='filled'
									required
									fullWidth
									id='firstname'
									label='First Name'
									name='firstname'
									margin='normal'
									value={firstName || ''}
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</Grid>
							<Grid
								item
								md={6}>
								{/* lastName */}
								<TextField
									variant='filled'
									required
									fullWidth
									id='lastname'
									label='Last Name'
									name='lastname'
									margin='normal'
									value={lastName || ''}
									onChange={(e) => setLastName(e.target.value)}
								/>
							</Grid>
							<Grid
								item
								md={6}>
								{/* username */}
								<TextField
									variant='filled'
									required
									fullWidth
									id='username'
									label='Username'
									name='username'
									margin='normal'
									value={username || ''}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</Grid>

							<Grid
								item
								md={6}>
								{/* phoneNumber */}
								<TextField
									variant='filled'
									required
									fullWidth
									error={!isValidPhoneNumber}
									id='phonenumber'
									label={!isValidPhoneNumber ? 'Mobile Number Required' : 'Phone Number'}
									name='phonenumber'
									margin='normal'
									helperText={
										!isValidPhoneNumber &&
										'A valid mobile phone number is required in the format of +(country-code) then followed by the number. e.g +254123456789'
									}
									value={phoneNumber || ''}
									onChange={(e) => setPhoneNumber(e.target.value)}
								/>
							</Grid>
							<Grid
								item
								md={6}>
								{/* business name */}
								<TextField
									variant='filled'
									fullWidth
									id='businessName'
									label='Name of Business'
									name='businessName'
									margin='normal'
									value={businessName || ''}
									onChange={(e) => setBusinessName(e.target.value)}
								/>
							</Grid>
							<Grid
								item
								md={6}>
								{/* address */}
								<TextField
									variant='filled'
									fullWidth
									id='address'
									label='Address'
									name='address'
									margin='normal'
									value={address || ''}
									onChange={(e) => setAddress(e.target.value)}
								/>
							</Grid>
							<Grid
								item
								md={6}>
								{/* City */}
								<TextField
									variant='filled'
									fullWidth
									id='city'
									label='City'
									name='city'
									margin='normal'
									value={city || ''}
									onChange={(e) => setCity(e.target.value)}
								/>
							</Grid>
							<Grid
								item
								md={6}>
								{/* Country */}
								<TextField
									variant='filled'
									fullWidth
									id='country'
									label='Country'
									name='country'
									margin='normal'
									value={country || ''}
									onChange={(e) => setCountry(e.target.value)}
								/>
							</Grid>
						</Grid>
						{/* avatar logo */}
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								width: '100%',
								alignItems: 'center',
								marginBottom: '40px',
							}}>
							<Box sx={{ width: '73%' }}>
								<TextField
									sx={{
										marginTop: '20px',
										marginBottom: '10px',
									}}
									variant='filled'
									fullWidth
									id='avatar'
									name='avatar'
									label='Avatar Url'
									value={avatar || ''}
									onChange={(e) => setAvatar(e.target.value)}
								/>
								<label
									htmlFor='logo'
									style={{
										width: '100%',
										display: 'flex',
										flexDirection: 'column',
									}}>
									<Input
										accept='image/*'
										id='logo'
										name='logo'
										type='file'
										onChange={uploadFileHandler}
									/>
									{/* {!uploading ? (
										<Button
											sx={{ mt: '5px' }}
											fullWidth
											size='large'
											variant='contained'
											component='span'>
											Upload/paste avatar
										</Button>
									) : (
										<CircularProgress
											size={60}
											sx={{ margin: 'auto' }}
										/>
									)} */}
								</label>
							</Box>
							<Box
								borderRadius={1}
								sx={{
									display: 'flex',
									alignContent: 'center',
									justifyContent: 'center',
									backgroundColor: 'rgba(0, 0, 0, 0.06)',
									width: '23%',
									height: '100%',
									marginTop: '20px',
								}}>
								{avatar ? (
									<Avatar
										src={avatar}
										sx={{ width: '90px', height: '90px', margin: '12px ' }}
									/>
								) : (
									<AccountCircleIcon
										sx={{ fontSize: '6rem' }}
										color='info'
									/>
								)}
							</Box>
						</Box>
					</Box>
				)}
			</Container>
		</div>
	)
}

export default EditProfileForm

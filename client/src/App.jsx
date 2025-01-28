import { createContext, useState } from 'react'
import './App.css'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Layout from './components/Layout'
import NotFound from './components/NotFound'
import { customTheme } from './customTheme'
import useTitle from './hooks/useTitle'
import { useSelector } from 'react-redux'
import Navbar from './components/Navbar/Index'
import HomePage from './pages/HomePage'
import RegisterPage from './features/auth/pages/RegisterPage'
import FrontPage from './pages/FrontPage'
import VerifiedPage from './features/auth/pages/VerifiedPage'
import LoginPage from './features/auth/pages/LoginPage'
import ResendEmailTokenPage from './features/auth/pages/ResendEmailTokenPage'
import PasswordResetRequestPage from './features/auth/pages/PasswordResetRequestPage'
import PasswordResetPage from './features/auth/pages/PasswordResetPage'
import { ROLES } from './config/roles'
import UsersList from './features/users/pages/UsersListPage'
import DashboardPage from './features/dashboard/pages/DashboardPage'
import AuthRequired from './components/AuthRequired'
import HomePageNav from './components/HomePageNav'
import './styles/loggingPages.css'
import EditProfileForm from './features/users/pages/EditProfileForm'
import ProfilePage from './features/users/pages/ProfilePage'
import CustomerListPage from './features/customers/pages/CustomersListPage'
import CustomerCreateForm from './features/customers/pages/CustomerCreateForm'
import CustomerEditForm from './features/customers/pages/CustomerEditForm'
import SingleCustomerPage from './features/customers/pages/SingleCustomerPage'
import DocCreateEditForm from './features/documents/pages/DocCreateEditForm'
import DocumentsPage from './features/documents/pages/DocumentsPage'
import SingleDocumentPage from './features/documents/pages/SingleDocumentPage'
import OrganisationView from './features/organisation/pages/OrganisationView'
import OrganisationEditForm from './features/organisation/pages/OrganisationEditForm'
import React from 'react'
import scheduleItemList from './data/scheduleItems'

export const configContext = createContext(null)
export const scheduleItemsContext = createContext(null)

const App = () => {
	const defaultConfig = {
		timezone: 'Australia/Sydney',
	}
	const [config, setConfig] = useState(defaultConfig)
	const [scheduleItems, setScheduleItems] = useState(scheduleItemList || [])

	useTitle('Job Forge - Home')
	const { user } = useSelector((state) => state.auth)
	return (
		<ThemeProvider theme={customTheme}>
			<configContext.Provider value={[config, setConfig]}>
				<scheduleItemsContext.Provider value={[scheduleItems, setScheduleItems]}>
					<CssBaseline />
					{!user && <HomePageNav />}
					{user && <Navbar />}
					<Routes>
						<Route
							path='/'
							element={<Layout />}>
							<Route
								index
								element={<HomePage />}
							/>
							<Route
								path='auth/verify'
								element={<VerifiedPage />}
							/>
							<Route
								path='login'
								element={<LoginPage />}
							/>
							<Route
								path='resend'
								element={<ResendEmailTokenPage />}
							/>
							<Route
								path='reset_password_request'
								element={<PasswordResetRequestPage />}
							/>
							<Route
								path='auth/reset_password'
								element={<PasswordResetPage />}
							/>
							{/* Private Routes - Users */}
							<Route
								element={
									<AuthRequired
										allowedRoles={[ROLES.Admin, ROLES.User, ROLES.Basic, ROLES.Mobile]}
									/>
								}>
								<Route
									path='profile'
									element={<ProfilePage />}
								/>

								<Route
									path='customers'
									element={<CustomerListPage />}
								/>
								<Route
									path='scheduler'
									element={<FrontPage />}
								/>
								<Route
									path='create-customer'
									element={<CustomerCreateForm />}
								/>
								<Route
									path='edit-customer/:custId'
									element={<CustomerEditForm />}
								/>
								<Route
									path='single-customer/:custId'
									element={<SingleCustomerPage />}
								/>
								<Route
									path='*'
									element={<NotFound />}
								/>
								<Route
									path='documents'
									element={<DocumentsPage />}
								/>
								<Route
									path='create-doc'
									element={<DocCreateEditForm />}
								/>
								<Route
									path='edit-doc/:id'
									element={<DocCreateEditForm />}
								/>
								<Route
									path='document/:id'
									element={<SingleDocumentPage />}
								/>
								<Route
									path='dashboard'
									element={<DashboardPage />}
								/>
							</Route>

							{/* Private Routes - Admin Users only */}
							<Route element={<AuthRequired allowedRoles={[ROLES.Admin]} />}>
								<Route
									path='edit-profile'
									element={<EditProfileForm />}
								/>
								<Route
									path='organisation'
									element={<OrganisationView />}
								/>
								<Route
									path='organisation-edit'
									element={<OrganisationEditForm />}
								/>
								<Route
									path='register'
									element={<RegisterPage />}
								/>
							</Route>
						</Route>
					</Routes>
					<ToastContainer theme='dark' />
				</scheduleItemsContext.Provider>
			</configContext.Provider>
		</ThemeProvider>
	)
}

export default App

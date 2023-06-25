import {CssBaseline} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { Route, Routes} from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import NotFound from './components/NotFound'
// import Footer from './components/Footer'
import Layout from './components/Layout'
import {customTheme} from './customTheme'
import useTitle from './hooks/useTitle'
import { useSelector } from 'react-redux'
import Navbar from './components/Navbar/Index'

import HomePage from './pages/HomePage'
import RegisterPage from './features/auth/pages/RegisterPage'
import VerifiedPage from './features/auth/pages/VerifiedPage'
import LoginPage from './features/auth/pages/LoginPage'
import ResendEmailTokenPage from './features/auth/pages/ResendEmailTokenPage'
import PasswordResetPage from './features/auth/pages/PasswordResetPage'
import PasswordResetRequestPage from './features/auth/pages/PasswordResetRequestPage'
import {ROLES} from './config/roles'
import UserListPage from './features/users/pages/UsersListPage'
import DashboardPage from './pages/DashboardPage'
import AuthRequired from './components/AuthRequired'


const App = () => {
  useTitle("Job Forge - Home")
  const {user} = useSelector((state) => state.auth)
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline/>
      {user && <Navbar />}
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path='register' element={<RegisterPage/>} />
          <Route path='auth/verify' element={<VerifiedPage/>}/>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='resend' element={<ResendEmailTokenPage />} />
          <Route path='reset_password_request' element={<PasswordResetRequestPage/>} />
          <Route path='auth/reset_password' element={<PasswordResetPage/>} />
          {/* Private routes - Users */}
          <Route element={<AuthRequired allowedRoles={[ROLES.User]}/>}>
            <Route path='dashboard' element={<DashboardPage />}/>
          </Route>
          {/* Private routes - Admin users only */}
          <Route element={<AuthRequired allowedRoles={[ROLES.User]}/>}>
            <Route path='users' element={<UserListPage />}/>
          </Route>

          {/* keep notFound as the bottom most route */}
          <Route path='*' element={<NotFound />}/>
        </Route>
      </Routes>
      {/* <Footer /> */}
      <ToastContainer theme='dark' />
    </ThemeProvider>

  )
}

export default App
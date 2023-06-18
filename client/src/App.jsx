import {CssBaseline} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { Route, Routes} from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import NotFound from './components/NotFound'
import Footer from './components/Footer'
import Layout from './components/Layout'
import {customTheme} from './customTheme'
import useTitle from './hooks/useTitle'
import HomePage from './pages/HomePage'

const App = () => {
  useTitle("Job Forge - Home")
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline/>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage/>}/>

          {/* keep notFound as the bottom most route */}
          <Route path='*' element={<NotFound />}/>
        </Route>
      </Routes>
      <Footer />
      <ToastContainer theme='dark' />
    </ThemeProvider>

  )
}

export default App
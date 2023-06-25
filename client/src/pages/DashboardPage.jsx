import { Box, Typography} from '@mui/material'

const DashboardPage = () => {
  return (
    <Box sx={{
      display: 'flex',
      marginLeft: '250px',
      mt: 10
    }}>
      <Typography variant='p'>
        This Dashboard page is only allowed to logged in user
      </Typography>
    </Box>
  )
}

export default DashboardPage
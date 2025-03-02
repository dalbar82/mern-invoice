import { Box } from '@mui/material'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

const Layout:FC<React.PropsWithChildren> = () => {
	return (
		<Box>
			<Outlet />
		</Box>
	)
}

export default Layout

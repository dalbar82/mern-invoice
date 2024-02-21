import { createTheme } from '@mui/material'

export const customTheme = createTheme({
	typography: {
		fontFamily: ['Poppins'],
		color: 'rgb(31, 31, 31)'
	},
	palette: {
		background: {
			default: '#f5f5fc',
		},
		textLabel: {
			main: '#6610f2',
		},
		textLight: {
			main: '#4b6380',
		},
		textTopNav: {
			main: '#8b8a8a',
		},
		iconsSideNav: {
			main: '#9298a4',
		},
		yellow: {
			main: '#f57c00',
		},
		darkRed: {
			main: '#7f0000',
		},
	},
	components: {
		MuiDrawer: {
			styleOverrides: {
				// Name of the slot
				paper: {
					// Some CSS
					background: 'linear-gradient(94deg, rgba(0,117,180,1) 0%, rgba(65,162,215,1) 100%)',
					color: '#fff',
					borderRight: 'none'
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: '#202128',
					color: '#fff',
				},
			},
		},
		MuiListItemText: {
			styleOverrides: {
				primary: {
					fontSize: 'small',
				},
			},
		},
	},
})

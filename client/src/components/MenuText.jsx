import { Typography } from '@mui/material'

const MenuText = ({ text, color }) => {
	return (
		<Typography
			style={{
				fontWeight: '600',
				color: '#fff'
			}}
			variant='span'
			color={color}>
			{text}
		</Typography>
	)
}

export default MenuText

import { Typography } from '@mui/material'

const MenuText = ({ text, color }) => {
	return (
		<Typography
			variant='span'
			color={color}>
			{text}
		</Typography>
	)
}

export default MenuText

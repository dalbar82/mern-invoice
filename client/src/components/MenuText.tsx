// import { Typography } from '@mui/material'
import Typography from '../components/Typography/Typography'

type MenuTextProps = {
	text: string,
	color?: string
}

const MenuText: React.FC<MenuTextProps> = ({ text, color }) => {
	return (
		<Typography
			style={{
				fontWeight: '600',
				color: '#fff'
			}}
			elementType='span'
			color={color}
			text={text}
			>
			
		</Typography>
	)
}

export default MenuText

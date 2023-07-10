import { Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const Logo = (fontSize) => {
	return (
		<>
			<Link
				component={RouterLink}
				to='/'
				sx={{
					textDecoration: 'none',
					color: '#c7cbd4',
					cursor: 'pointer',
					fontSize: fontSize,
					fontWeight: '500',
					fontFamily: 'Rubik Dirt',
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
				}}>
				<div
					style={{
						transform: 'rotate(90deg)',
						marginRight: '5px',
						height: '48px',
						fontFamily: 'Londrina Sketch',
					}}>
					[=]
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						fontWeight: '600',
						fontFamily: 'Quicksand',
						fontSize: fontSize,
						margin: 0,
					}}>
					<p style={{ fontFamily: 'Quicksand', color: '#c7cbd4' }}>Job</p>
					<p style={{ fontFamily: 'Quicksand', color: 'rgb(25 142 189)' }}>Forge</p>
				</div>
			</Link>
		</>
	)
}

export default Logo

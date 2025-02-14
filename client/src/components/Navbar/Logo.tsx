// import { Link } from '@mui/material'
import Link from '../Links/pageLinks/Link'
import { Link as RouterLink } from 'react-router-dom'

type LogoProps = {
	fontSize: string
}

const Logo:React.FC<LogoProps> = ({fontSize}) => {
	return (
		<>
			<Link
				name='EazyFlow'
				styles={{
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
				<RouterLink to='/'/>
				<div
					style={{
						transform: 'rotate(90deg)',
						marginRight: '5px',
						height: '48px',
						fontFamily: 'Londrina Sketch',
					}}>
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
					<p style={{ fontFamily: 'Quicksand', color: '#c7cbd4' }}>Eazy</p>
					<p style={{ fontFamily: 'Quicksand', color: 'rgb(25 142 189)' }}>Flow</p>
				</div>
			</Link>
		</>
	)
}

export default Logo

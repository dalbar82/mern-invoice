import { Grid, Box, Typography } from '@mui/material'
import Moment from 'react-moment'
const simpleListItem = ({ data }) => {
	return (
		<>
			<Grid
				item
				xs={12}
				style={{
					padding: '25px 25px',
					flexGrow: '0',
					backgroundColor: ' white',
					margin: '7px 0',
					boxShadow: 'rgba(224, 228, 229, 0.96) 0px 0px 2px 1px',
					borderRadius: '8px',
					display: 'flex',
					justifyContent: 'space-between',
				}}>
				<Box>
					<Typography
						sx={{
							fontWeight: '700',
							fontSize: 'small',
							width: 'fit-content',
							color: '#50abdf',
						}}>
						{data.documentNumber}
					</Typography>
					<Typography
						variant='subtitle2'
						sx={{
							fontSize: 'small',
							textTransform: 'uppercase',
						}}>
						{data.name}
					</Typography>
				</Box>

				<Typography
					variant='subtitle2'
					sx={{
						fontSize: 'small',
						textTransform: 'uppercase',
					}}>
					<Moment
						format='DD/MM/YYYY'
						date={data.dueDate}
					/>
				</Typography>
			</Grid>
		</>
	)
}

export default simpleListItem

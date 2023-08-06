import { Grid, Box, Typography } from '@mui/material'

const simpleListItem = ({ data }) => {
	console.log(data);
	return (
		<>
			<Grid
				item
				xs={12}
				sx={{
					padding: '20px 0',
					display: 'flex',
					borderBottom: '1px solid #dcdcdcbf',
				}}>
				<Typography
					sx={{
						fontSize: 'small',
						width: 'fit-content',
						color: '#fd7e8b',
						paddingRight: '5px',
					}}>
					{data.documentNumber}
				</Typography>
				<Typography
					variant='subtitle2'
					sx={{
						fontSize: 'small',
						textTransform: 'uppercase'
					}}>
					- {data.name}
				</Typography>
			</Grid>
		</>
	)
}

export default simpleListItem

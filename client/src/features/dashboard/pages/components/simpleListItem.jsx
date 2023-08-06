import { Grid, Box } from '@mui/material'

const simpleListItem = ({ data }) => {
	return (
		<>
			<Grid container>
				<Grid
					item
					xs={2}>
					<Box
						p={2}
						sx={{
							fontSize: 'small',
							backgroundColor: '#7e838670',
							borderRadius: '10px',
							height: '10px',
						}}>
						{data.documentNumber}
					</Box>
				</Grid>
				<Grid
					item
					xs={10}
					display={'flex'}>
					<Box>{data.name}</Box>
					
				</Grid>
			</Grid>
		</>
	)
}

export default simpleListItem

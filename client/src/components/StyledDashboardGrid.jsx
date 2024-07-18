import { Box, Grid, styled } from '@mui/material'

const StyledBox = styled(Box)({
	width: '92%',
	minHeight: '250px',
	marginTop: '20px',
	borderRadius: '10px',
	backgroundColor: '#fff',
	padding: '20px',
	boxShadow: ' 1px 1px 4px #eaedee',
})

const StyledDashboardGrid = ({ children, boxColor }) => {
	return (
		<Grid
			item
			md={6}>
			<StyledBox>{children}</StyledBox>
			{/* <div
				style={{
					height: '170px',
					width: '92%',
					background: `${boxColor}`,
					borderRadius: '0 0 10px 10px',
				}}>
					
				</div> */}
		</Grid>
	)
}

export default StyledDashboardGrid

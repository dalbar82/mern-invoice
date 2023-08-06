import { styled, TableCell, tableCellClasses } from '@mui/material'

const TableCellStyled = styled(TableCell)(({ theme, width }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.white,
		color: '#222222de',
		height: '75px',
		width: width,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 15,
		color: '#222222de',
		borderBottom: '1px solid #efefef',
		height: '65px',
		padding: '11px 16px',
	},
}))

const StyledTableCell = ({ width, children, fontWeight }) => {
	return (
		<TableCellStyled
			width={width}
			sx={{fontWeight: {fontWeight}}}>
			{children}
		</TableCellStyled>
	)
}

export default StyledTableCell

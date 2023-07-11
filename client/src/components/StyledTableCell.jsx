import { styled, TableCell, tableCellClasses } from '@mui/material'

const TableCellStyled = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.white,
		color: '#222222de',
		height: '75px' 
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 15,
		color: '#222222de',
		borderBottom: '1px solid #efefef',
		height: '50px',
		padding: '12px 16px'
	},
}))

const StyledTableCell = ({ children }) => {
	return <TableCellStyled>{children}</TableCellStyled>
}

export default StyledTableCell

import { styled, TableRow } from '@mui/material'

const TableRowStyled = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.white,
		color: 'black'
	},
	'&:last-child td, &:last-child th': {
		borderBottom:' 1px solid #efefef',
	},
}))

const StyledTableRow = ({ children }) => {
	return <TableRowStyled>{children}</TableRowStyled>
}

export default StyledTableRow

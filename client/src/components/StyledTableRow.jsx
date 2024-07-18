import { styled, TableRow } from '@mui/material'

const TableRowStyled = styled(TableRow)(({ theme }) => ({
	// '&:last-child td, &:last-child th': {
	// 	boxShadow: ' 2px 1px #efefef',
	// },
}))

const StyledTableRow = ({ children, bgColor }) => {
	return (
		<TableRowStyled
			style={{
				background: { bgColor },
			}}>
			{children}
		</TableRowStyled>
	)
}

export default StyledTableRow

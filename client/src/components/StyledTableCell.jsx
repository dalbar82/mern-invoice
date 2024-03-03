import { styled, TableCell, tableCellClasses } from '@mui/material'

const TableCellStyled = styled(TableCell)(
	({ theme, width, radius, leftborder }) => ({
		[`&.${tableCellClasses.head}`]: {
			// backgroundColor: theme.palette.common.white,
			color: '#fff',
			height: '75px',
			width: width,
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 15,
			color: '#222222de',
			borderBottom: '1px solid #efefef',
			height: '85px',
			padding: '11px 16px',
			background: 'white',
			borderRadius: `${radius}`,
			borderLeft: `${leftborder}`,
		},
	})
)

const StyledTableCell = ({
	width,
	children,
	fontWeight,
	fontColor,
	radius,
	leftborder,
}) => {
	return (
		<TableCellStyled
			radius={radius}
			leftborder={leftborder}
			width={width}
			sx={{ fontWeight: { fontWeight } }}
			style={{
				color: { fontColor },
			}}>
			{children}
		</TableCellStyled>
	)
}

export default StyledTableCell

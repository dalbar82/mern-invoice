import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import StyledTableCell from '../StyledTableCell'

import { visuallyHidden } from '@mui/utils'

export default function EnhancedTableHead(props) {
	const { order, orderBy, onRequestSort, headCells } = props
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property)
	}

	return (
		<TableHead>
			<TableRow
				style={{
					background: 'linear-gradient(194deg, rgb(0, 117, 180) 0%, rgb(65, 162, 215) 100%)',
				}}>
				{headCells?.map((headCell) => (
					<StyledTableCell
						key={headCell?.id}
						align={headCell?.numeric ? 'right' : 'left'}
						padding={headCell?.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell?.id ? order : false}
						bg='white'
						fontColor='#fff'>
						<TableSortLabel
							active={orderBy === headCell?.id}
							direction={orderBy === headCell?.id ? order : 'asc'}
							onClick={createSortHandler(headCell?.id)}>
							{headCell?.label}
							{orderBy === headCell?.id ? (
								<Box
									component='span'
									sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</StyledTableCell>
				))}
			</TableRow>
		</TableHead>
	)
}

EnhancedTableHead.propTypes = {
	onRequestSort: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
}

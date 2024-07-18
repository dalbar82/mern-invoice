import Moment from 'react-moment'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import './table.css'

const TableBody = ({ tableData, columns }) => {
	return (
		<tbody>
			{tableData.map((data) => {
				return (
					<tr
						className='table-rows'
						key={data._id}>
						{columns.map(({ accessor, types, navigateTo }) => {
							const tData = data[accessor]
							if (types === 'string') return <td key={accessor}>{tData}</td>
							if (types === 'date')
								return (
									<td key={accessor}>
										<Moment
											format='DD/MM/YYYY'
											date={tData}
										/>
									</td>
								)
							if (types === 'link') {
								return (
									<td key={accessor}>
										<div>
											<VisibilityRoundedIcon
												color='success'
												fontSize='medium'
												sx={{
													cursor: 'pointer',
												}}
												onClick={() => navigateTo(data._id)}
											/>
										</div>
									</td>
								)
							}
							if (types === 'boolean')
								return (
									<td
										key={accessor}
										className={tData ? 'table-data-true' : 'table-data-false'}>
										{tData ? <CheckCircleIcon /> : <CancelIcon />}
									</td>
								)
							return '-'
						})}
					</tr>
				)
			})}
		</tbody>
	)
}

export default TableBody

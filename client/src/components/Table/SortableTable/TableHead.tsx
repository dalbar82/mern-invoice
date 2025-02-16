import { useState } from 'react'
import './table.css'
import { boolean } from 'yup'

type ColumnData = {
  accessor: string;
  types: string;
  sortable: boolean;
  label: string;
};

type TableHeadProps = {
	columns: ColumnData[]
	,
	handleSorting:(accessor: string, sortOrder: "asc" | "desc")=>void
}

const TableHead: React.FC<TableHeadProps> = ({ columns, handleSorting }) => {
	const [sortField, setSortField] = useState('')
	const [order, setOrder] = useState('')

	const handleSortingChange = (accessor: string) => {
		const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc'
		setSortField(accessor)
		setOrder(sortOrder)
		handleSorting(accessor, sortOrder)
	}

	return (
		<thead className='table-head'>
			<tr className='header-rows'>
				{columns.map(({ label, accessor, sortable }) => {
					const cl = sortable
						? sortField === accessor && order === 'asc'
							? 'up table-head-item'
							: sortField === accessor && order === 'desc'
							? 'down table-head-item'
							: 'default table-head-item'
						: ''
					return (
						<th
							key={accessor}
							onClick={sortable ? () => handleSortingChange(accessor) : undefined}
							className={cl}>
							{label}
						</th>
					)
				})}
			</tr>
		</thead>
	)
}

export default TableHead

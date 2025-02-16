import { useState } from 'react'
import TableHead from './TableHead'
import TableBody from './TableBody'
import './table.css'

type ColumnData = {
  accessor: string;
  types: string;
  sortable: boolean;
  label: string;
};



type SortableTableProps = {
	children?: React.ReactNode,
	rowData: any,
	columnData: ColumnData[]
}

const SortableTable: React.FC<SortableTableProps> = ({ children, rowData, columnData }) => {
	const [tableData, setTableData] = useState(rowData)

	const handleSorting = (sortField: string, sortOrder: string) => {
		if (sortField) {
			const sorted = [...tableData].sort((a, b) => {
				if (a[sortField] === null) return 1
				if (b[sortField] === null) return -1
				if (a[sortField] === null && b[sortField] === null) return 0
				return (
					a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {
						numeric: true,
					}) * (sortOrder === 'asc' ? 1 : -1)
				)
			})
			setTableData(sorted)
		}
	}

	return (
		<>
			<table className='sortable-table'>
				<TableHead
					columns={columnData}
					handleSorting={handleSorting}
				/>
				<TableBody
					columns={columnData}
					tableData={tableData}
				/>
				{children}
			</table>
		</>
	)
}

export default SortableTable

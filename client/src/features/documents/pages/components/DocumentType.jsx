import { Box, Input, styled } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

const StyledSelect = styled(Select)({
	fontSize: '1rem',
	textTransform: 'uppercase',
	fontWeight: 'bold',
})

const DocumentType = ({ documentType, setDocumentType }) => {
	const handleChange = (e) => {
		setDocumentType(e.target.value)
	}
	return (
		<Box>
			<FormControl>
				<StyledSelect
					input={<Input />}
					labelId='doc-helper-label'
					id='doc-select-helper'
					value={documentType}
					label='Select Document'
					onChange={handleChange}>
					<MenuItem value=''>
						<em>Select Document Type</em>
					</MenuItem>
					<MenuItem value='Invoice'>Invoice</MenuItem>
					<MenuItem value='Paid'>Paid</MenuItem>
					<MenuItem value='Open'>Open</MenuItem>
					<MenuItem value='Order'>Order</MenuItem>
					<MenuItem value='Quotation'>Quotation</MenuItem>
				</StyledSelect>
				<FormHelperText sx={{ marginLeft: '0' }}>
					Select a Document to generate, defaults to Quotation
				</FormHelperText>
			</FormControl>
		</Box>
	)
}

export default DocumentType

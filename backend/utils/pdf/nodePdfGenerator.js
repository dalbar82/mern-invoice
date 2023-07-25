const fs = require('fs')
const pdf = require('pdfkit')

function generatePDF() {
	/**
	 * This function generates a PDF server-side.
	 *
	 * Returns:
	 * string: The path of the generated PDF file.
	 */

	try {
		// Create a new PDF document
		const doc = new pdf()

		// Set up the file path and name for the generated PDF
		const filePath = 'path/to/your/pdf/file.pdf'

		// Pipe the PDF document to a writable stream
		doc.pipe(fs.createWriteStream(filePath))

		// Add content to the PDF
		doc.fontSize(16).text('Hello, World!', 50, 50)

		// Finalize the PDF and close the stream
		doc.end()

		return filePath
	} catch (error) {
		// Log the error
		console.error('Error generating PDF:', error)
		return null
	}
}

// Example usage
const generatedPDFPath = generatePDF()
if (generatedPDFPath) {
	console.log('PDF generated successfully:', generatedPDFPath)
} else {
	console.log('Failed to generate PDF.')
}

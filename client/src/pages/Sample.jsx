import { useState } from 'react'
import { processStreamBuffer } from '../utils/processStreamBuffer.js'

const FileUpload = () => {
	const [output, setOutput] = useState([])

	const handleSubmit = async (e) => {
		e.preventDefault()
		const file = e.target.elements.pdf.files[0]

		const formData = new FormData()
		formData.append('pdf', file)

		const response = await fetch('https://sbrjt-test2.hf.space/pdf', {
			method: 'POST',
			body: formData,
		})

		const reader = response.body.getReader()

		await processStreamBuffer(reader, (json) =>
			setOutput((prev) => [...prev, json])
		)
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type='file' name='pdf' accept='application/pdf' />
				<button type='submit'>Upload PDF</button>
			</form>

			<br />
			<br />

			{output.map((item, index) => (
				<div key={index}>
					<pre>{JSON.stringify(item, null, 2)}</pre>
					<br />
				</div>
			))}
		</div>
	)
}

export default FileUpload

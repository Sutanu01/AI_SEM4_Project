import { useState } from 'react'

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
		const decoder = new TextDecoder('utf-8')

		let buffer = ''

		while (true) {
			const { done, value } = await reader.read()
			if (done) break

			buffer += decoder.decode(value, { stream: true })

			let lines = buffer.split('\n')

			buffer = lines.pop()

			for (let line of lines) {
				if (line.trim() === '') continue

				if (line.startsWith('data:')) {
					line = line.replace(/^data:\s*/, '')
				}

				try {
					const json = JSON.parse(line)
					setOutput((prev) => [...prev, json])
				} catch (err) {
					console.error('Failed to parse JSON:', line)
				}
			}
		}
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

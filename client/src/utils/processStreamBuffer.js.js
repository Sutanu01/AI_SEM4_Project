export const processStreamBuffer = async (reader, onJSON) => {
	const decoder = new TextDecoder('utf-8')
	let buffer = ''

	while (true) {
		const { done, value } = await reader.read()
		if (done) break

		buffer += decoder.decode(value, { stream: true })

		let lines = buffer.split('\n')
		buffer = lines.pop() // carry over incomplete line

		for (let line of lines) {
			if (line.trim() === '') continue

			if (line.startsWith('data:')) {
				line = line.replace(/^data:\s*/, '')
			}

			try {
				const json = JSON.parse(line)
				onJSON(json)
			} catch (err) {
				console.error('Failed to parse JSON:', line)
			}
		}
	}
}

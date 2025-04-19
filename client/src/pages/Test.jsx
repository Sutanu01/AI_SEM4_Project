import "katex/dist/katex.min.css"; // KaTeX styles
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

const markdown = `
# Hello World
- This is a list
- **Bold text**
- [Link](https://example.com)

## Math Example
Inline math: $E = mc^2$

Block math:

$$
\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
$$
`;

function MarkdownComponent() {
	return (
		<ReactMarkdown
			children={markdown}
			remarkPlugins={[remarkMath]}
			rehypePlugins={[rehypeKatex]}
		/>
	);
}

export default MarkdownComponent;

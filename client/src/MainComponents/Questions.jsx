import React from "react";
import Loading from "../Loaders/QuestionLoader"
import QuestionBlock from "../StyledComponents/QuestionBlock";

const Questions = (props) => {
	const { setInput, QuestionsArray } = props;
	return (
		<>
			{QuestionsArray.length > 0 ? (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						paddingBottom: "1rem",
					}}
				>
					{QuestionsArray.map((elm, index) => (
						<QuestionBlock
							key={index}
							question={elm.content}
							question_number={index + 1}
							unit={elm.unit}
							subtopic={elm.subtopic}
							difficulty={elm.difficulty}
							setInput={setInput}
						/>
					))}
				</div>
			) : (
				<div
					style={{
						height: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						position: "relative",
					}}
				>
					<Loading />
				</div>
			)}
		</>
	);
};

export default Questions;

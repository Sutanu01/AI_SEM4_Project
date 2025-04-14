import React from 'react';
import QuestionBlock from "../StyledComponents/QuestionBlock";
// import dummy_data1 from '../DummyData/dummy_data1';

const Questions = (props) => {
  const {setInput,QuestionsArray}=props
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center",paddingBottom:"1rem"}}>
      {QuestionsArray.map((elm, index) => (
        <QuestionBlock
          key={index}
          question={elm.content}
          question_number={index+1}
          unit={elm.unit}
          subtopic={elm.subtopic}
          difficulty={elm.difficulty}
          setInput={setInput}
        />
      ))}
    </div>
  );
};

export default Questions;

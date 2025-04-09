import React from 'react';
import QuestionBlock from "../StyledComponents/QuestionBlock";
import dummy_data1 from '../DummyData/dummy_data1';

const Questions = (props) => {
  const {setInput}=props
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center",paddingBottom:"1rem"}}>
      {dummy_data1.map((elm, index) => (
        <QuestionBlock
          key={index}
          question={elm.question}
          question_number={elm.question_number}
          unit={elm.unit}
          subtopic={elm.subtopic}
          setInput={setInput}
        />
      ))}
    </div>
  );
};

export default Questions;

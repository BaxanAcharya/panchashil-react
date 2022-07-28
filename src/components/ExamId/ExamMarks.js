import React from "react";
import TextField from "./TextField";

const ExamMarks = ({ subjects, selectedStudent }) => {
  return (
    <div>
      {subjects.map((s) => (
        <TextField key={s.id} s={s} selectedStudent={selectedStudent} />
      ))}
    </div>
  );
};

export default ExamMarks;

import React from "react";
import TextField from "./TextField";

const ExamMarks = ({ subjects, selectedStudent, studentResult }) => {
  return (
    <div>
      {subjects.map((s) => (
        <TextField
          key={s.id}
          s={s}
          selectedStudent={selectedStudent}
          studentResult={studentResult}
        />
      ))}
    </div>
  );
};

export default ExamMarks;

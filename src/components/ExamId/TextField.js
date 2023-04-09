import { TextField } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { db } from "../../utils/config/firebase";

const TextFieldCustom = ({ s, selectedStudent, studentResult }) => {
  let key = s.data.subjectName;

  let mark = 0;
  if (studentResult) {
    if (
      s.data.subjectName === "Handwriting" ||
      typeof studentResult[s.data.subjectName] === "undefined"
    ) {
      mark = studentResult["Writing"];
    } else {
      mark = studentResult[s.data.subjectName];
    }
  }

  const [marks, setMarks] = useState(studentResult ? mark : 0);
  const { id } = useParams();

  let obj = {};
  obj[key] = parseInt(marks);

  const addExamStudentMarks = () => {
    try {
      const examRef = doc(db, id, selectedStudent);
      setDoc(examRef, obj, { merge: true });
      alert("Marks added.");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <TextField
        type="number"
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
        id="marks"
        name={`marks${key}`}
        label={`Marks in ${key}`}
        fullWidth
        autoComplete="marksin"
        variant="standard"
      />
      <br />
      <br />
      <Button disabled={!id || !marks} onClick={addExamStudentMarks}>
        {studentResult ? "Edit" : "Add"}
      </Button>
      <br />
      <br />
    </>
  );
};

export default TextFieldCustom;

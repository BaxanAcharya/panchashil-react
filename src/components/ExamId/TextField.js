import { TextField } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { db } from "../../utils/config/firebase";

const TextFieldCustom = ({ s, selectedStudent }) => {
  const [marks, setMarks] = useState(0);
  const { id } = useParams();

  const key = s.data.subjectName;

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

  //   useEffect(() => {
  //     const getMarks = async () => {
  //       try {
  //         const citiesRef = collection(db, id);
  //         let marks = await setDoc(doc(citiesRef, selectedStudent, key));
  //         console.log(marks);
  //       } catch (error) {
  //         alert(error);
  //       }
  //     };

  //     getMarks();
  //   }, [id, marks, selectedStudent, key]);

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
        Add
      </Button>
      <br />
      <br />
    </>
  );
};

export default TextFieldCustom;

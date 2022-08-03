import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ResultCom from "../../components/ExamId/Result";
import { db } from "../../utils/config/firebase";

const Result = () => {
  const { examId, studentId } = useParams();
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const [student, setStudent] = useState(false);
  const [exam, setExam] = useState(null);
  // const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const getResultAndStudent = async () => {
      try {
        const resultRef = doc(db, examId, studentId);
        const docSnap = await getDoc(resultRef);
        if (docSnap.exists()) {
          setResult(docSnap.data());

          const studentRef = doc(db, "students", studentId);
          const studentSnap = await getDoc(studentRef);

          if (studentSnap.exists()) {
            setStudent(studentSnap.data());
          }

          const examRef = doc(db, "exams", examId);
          const examSnap = await getDoc(examRef);

          if (examSnap.exists()) {
            setExam(examSnap.data());
          }
        } else {
          alert("Result not added");
        }
      } catch (error) {
        alert(error);
        navigate(-1);
      }
    };

    getResultAndStudent();
  }, [examId, navigate, studentId]);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title"> Result</h3>
        </div>
        <div className="card-body">
          {!result ? (
            <p>Result Not added</p>
          ) : (
            <ResultCom student={student} result={result} exam={exam} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;

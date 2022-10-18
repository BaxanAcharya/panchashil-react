import { CircularProgress, Grid } from "@mui/material";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../utils/config/firebase";
import StudentTable from "../students/StudentTable";

const SelectClass = ({ className, classes, setClassName }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const getClassStudent = () => {
    const getClassStudents = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, "classes", className);
        const docSnap = await getDoc(docRef);
        const q = query(
          collection(db, "students"),
          orderBy("rollNo", "asc"),
          where("className", "==", docSnap.data().class)
        );

        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.length > 0) {
          let studentArr = [];
          querySnapshot.forEach((doc) => {
            let obj = {};
            obj.id = doc.id;
            obj.data = doc.data();
            studentArr.push(obj);
          });

          setStudents(studentArr);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        alert(error);
        setLoading(false);
      }
    };

    getClassStudents();
  };
  return (
    <div className="col-md-12">
      <Grid container spacing={1}></Grid>
      <select
        className="form-select"
        defaultValue={className}
        onChange={(e) => setClassName(e.target.value)}
        aria-label="Default select example"
      >
        <option value={"Select Class"}>Select class</option>
        {classes.map((classItem) => {
          return (
            <option key={classItem.id} value={classItem.id}>
              {classItem.data.class}
            </option>
          );
        })}
      </select>

      <br />
      <button
        className="btn btn-primary"
        disabled={className === "Select class"}
        onClick={getClassStudent}
      >
        Get Students
      </button>
      <br />
      <br />
      {loading ? (
        <CircularProgress />
      ) : (
        <StudentTable students={students} filtered={[]} search={[]} />
      )}
    </div>
  );
};

export default SelectClass;

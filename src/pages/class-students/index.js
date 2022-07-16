import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../utils/config/firebase";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import ViewAdmitCard from "../../components/class/class-students/ViewAdmitCard";
import StudentTable from "../../components/students/StudentTable";

const Index = () => {
  const { id } = useParams();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getClassStudents = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "classes", id);
        const docSnap = await getDoc(docRef);
        const q = query(
          collection(db, "students"),
          where("className", "==", docSnap.data().class)
        );

        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.length > 0) {
          let classesArr = [];
          querySnapshot.forEach((doc) => {
            let obj = {};
            obj.id = doc.id;
            obj.data = doc.data();
            classesArr.push(obj);
          });

          setClasses(classesArr);
        }
      } catch (error) {
        alert(error);
      }
      setLoading(false);
    };

    getClassStudents();
  }, [id]);
  return (
    <Container className="mt-3">
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <ViewAdmitCard classes={classes} />
          <StudentTable students={classes} filtered={[]} search={[]} />
        </div>
      )}
    </Container>
  );
};

export default Index;

import { CircularProgress } from "@mui/material";
import { Container } from "@mui/system";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SelectClass from "../../components/ExamId/SelectClass";
import { db } from "../../utils/config/firebase";

const ExamId = () => {
  const { id } = useParams();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [className, setClassName] = useState("Select class");

  useEffect(() => {
    setLoading(true);
    let unsub;
    try {
      unsub = onSnapshot(collection(db, "classes"), (snap) => {
        setClasses(
          snap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
      setLoading(false);
    } catch (e) {
      alert(e);
      setLoading(false);
    }

    if (unsub) {
      return () => {
        unsub();
      };
    }
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title"> Exam Detail </h3>
        </div>
      </div>
      <div className="card-body">
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <Container>
            <SelectClass
              id={id}
              className={className}
              classes={classes}
              setClassName={setClassName}
            />
          </Container>
        )}
      </div>
    </div>
  );
};

export default ExamId;

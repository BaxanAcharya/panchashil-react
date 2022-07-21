import {
  CircularProgress,
  //   CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../utils/config/firebase";
import AddSubject from "../../components/subjects/AddSubject";
import { addSubjectValidationSchema } from "../../utils/validation/validation";
import SubjectTable from "../../components/subjects/SubjectTable";

const initialValues = {
  subjectName: "",
  class: "Select Here",
};

const Index = () => {
  const [open, setOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);

  const formik = useFormik({
    initialValues,
    validationSchema: addSubjectValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        const subjectRef = collection(db, "subjects");
        const queryDb = query(
          subjectRef,
          where("subjectName", "==", values.subjectName),
          where("class", "==", values.class)
        );

        const querySnapshot = await getDocs(queryDb);
        if (querySnapshot.size === 0) {
          await addDoc(collection(db, "subjects"), values);
          handleClose();
        } else {
          alert("The subject you want to add already exists for this class");
        }
        setSubmitting(false);
      } catch (error) {
        alert(error);
        setSubmitting(false);
      }
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    formik.values.subjectName = "";
    formik.values.class = "Select Here";
    setOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    let unsub;
    try {
      unsub = onSnapshot(collection(db, "subjects"), (snap) => {
        setSubjects(
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3 className="card-title"> Subjects</h3>
          <div style={{ flex: 1 }}></div>
          <div className="card-tools">
            <IconButton color="success" onClick={handleClickOpen}>
              <AddIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="card-body">
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <SubjectTable subjects={subjects} />
        )}
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Subjects"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Add the subject for the classes, please fill up the below form
            and click add button.
          </DialogContentText>
          <br />
          <AddSubject classes={classes} formik={formik} />
        </DialogContent>
        <DialogActions>
          <button className="btn  btn-danger" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={formik.handleSubmit}
            disabled={
              formik.values.class === "Select Here" ||
              formik.errors.subjectName ||
              !formik.values.subjectName
            }
          >
            Add
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Index;

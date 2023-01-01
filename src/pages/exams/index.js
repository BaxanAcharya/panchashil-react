import AddIcon from "@mui/icons-material/Add";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import AddExams from "../../components/exams/AddExams";
import ExamTable from "../../components/exams/ExamTable";
import { db } from "../../utils/config/firebase";
import { addExamValidationSchema } from "../../utils/validation/validation";

const initialValues = {
  examName: "",
  examYear: "Select Here",
};

const Index = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [exams, setExams] = useState([]);

  const formik = useFormik({
    initialValues,
    validationSchema: addExamValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      let objExam = { examName: values.examName, examYear: values.examYear };
      setSubmitting(true);
      try {
        const examRef = collection(db, "exams");
        const queryDb = query(
          examRef,
          where("examName", "==", values.examName),
          where("examYear", "==", values.examYear)
        );

        const querySnapshot = await getDocs(queryDb);
        if (querySnapshot.size === 0) {
          await addDoc(collection(db, "exams"), objExam);
          handleClose();
        } else {
          alert("The exam you want to add already exist");
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
    formik.values.examName = "";
    formik.values.examYear = "Select Here";
    setOpen(false);
  };

  useEffect(() => {
    let unsub;

    try {
      unsub = onSnapshot(collection(db, "exams"), (snap) => {
        setExams(
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
          <h3 className="card-title"> Exams</h3>
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
          <ExamTable exams={exams} />
        )}
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Exam"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Add the exam for the school, please fill up the below form and
            click add button.
          </DialogContentText>
          <br />

          <AddExams formik={formik} />
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
              formik.values.examYear === "Select Here" ||
              formik.errors.examName ||
              !formik.values.examName
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

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Container, Table } from "react-bootstrap";
import * as humandate from "human-date";
import { useState } from "react";
import ExamMarks from "../ExamId/ExamMarks";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../utils/config/firebase";
import { Link, useParams } from "react-router-dom";

const StudentTable = ({ students, filtered, search }) => {
  const { id } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  // const [selectedResult, setSelectResult] = useState(null);

  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewOpen = () => {
    setViewOpen(true);
  };

  const handleViewClose = () => {
    setViewOpen(false);
  };

  // const viewResult = async (className, studentId) => {
  //   handleViewOpen();
  //   try {
  //     const resultRef = doc(db, id, studentId);
  //     const docSnap = await getDoc(resultRef);
  //     if (docSnap.exists()) {
  //       setSelectResult(docSnap.data());
  //     } else {
  //       alert("Result not added");
  //     }
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  const addResult = (className, studentId) => {
    handleClickOpen();

    const getClassSubjects = async () => {
      try {
        setLoading(true);
        const q = query(
          collection(db, "subjects"),
          where("class", "==", className)
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

          setSubjects(studentArr);
          setSelectedStudent(studentId);
          setLoading(false);
        }
      } catch (error) {
        alert(error);
        setLoading(false);
      }
    };

    getClassSubjects();
  };

  return (
    <Container className="mt-3">
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          striped
          bordered
          hover
        >
          <TableHead>
            <TableRow>
              <TableCell>SN</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Create Date</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {search.length > 1
              ? filtered.map((studentItem, i) => (
                  <TableRow
                    key={studentItem.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{studentItem.data.fullName}</TableCell>
                    <TableCell>{studentItem.data.className}</TableCell>
                    <TableCell>{studentItem.data.dateOfBirth}</TableCell>
                    <TableCell>
                      {humandate.prettyPrint(studentItem.data.createdAt)}
                    </TableCell>
                    <TableCell>
                      <a
                        target="_blank"
                        href={studentItem.data.imageUrl}
                        rel="noreferrer"
                      >
                        <image
                          src={studentItem.data.imageUrl}
                          height={50}
                          width={50}
                          alt="Not loaded"
                        />
                      </a>
                    </TableCell>
                    <TableCell>
                      <button
                        className="btn"
                        disabled={!id}
                        onClick={() =>
                          addResult(studentItem.data.className, studentItem.id)
                        }
                      >
                        Add Result
                      </button>

                      {id && (
                        <Link to={`/result/${id}/${studentItem.id}`}>
                          View Result
                        </Link>
                      )}

                      {/* <button
                        className="btn"
                        disabled={!id}
                        onClick={() =>
                          viewResult(studentItem.data.className, studentItem.id)
                        }
                      >
                        View Result
                      </button> */}
                    </TableCell>
                  </TableRow>
                ))
              : students.map((studentItem, i) => (
                  <TableRow
                    key={studentItem.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{studentItem.data.fullName}</TableCell>
                    <TableCell>{studentItem.data.className}</TableCell>
                    <TableCell>{studentItem.data.dateOfBirth}</TableCell>
                    <TableCell>
                      {humandate.prettyPrint(studentItem.data.createdAt)}
                    </TableCell>
                    <TableCell>
                      <a
                        target="_blank"
                        href={studentItem.data.imageUrl}
                        rel="noreferrer"
                      >
                        <img
                          src={studentItem.data.imageUrl}
                          height={50}
                          width={50}
                          alt="Not loaded"
                        />
                      </a>
                    </TableCell>
                    <TableCell>
                      <button
                        className="btn"
                        disabled={!id}
                        onClick={() =>
                          addResult(studentItem.data.className, studentItem.id)
                        }
                      >
                        Add Result
                      </button>

                      {id && (
                        <Link to={`/result/${id}/${studentItem.id}`}>
                          View Result
                        </Link>
                      )}
                      {/* <button
                        className="btn"
                        disabled={!id}
                        onClick={() =>
                          viewResult(studentItem.data.className, studentItem.id)
                        }
                      >
                        View Result
                      </button> */}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddMarksModal
        open={open}
        handleClose={handleClose}
        loading={loading}
        subjects={subjects}
        selectedStudent={selectedStudent}
      />
    </Container>
  );
};

const AddMarksModal = ({
  open,
  handleClose,
  loading,
  subjects,
  selectedStudent,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Add Student marks"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          To Add the exam marks of the students, please fill up the below form
          and click add button.
        </DialogContentText>
        <br />
        {loading ? (
          <CircularProgress />
        ) : (
          <ExamMarks subjects={subjects} selectedStudent={selectedStudent} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentTable;

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
  TextField,
} from "@mui/material";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import * as humandate from "human-date";
import { useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import { db } from "../../utils/config/firebase";
import ExamMarks from "../ExamId/ExamMarks";

const StudentTable = ({ students, filtered, search }) => {
  const location = useLocation();
  const { id } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentResult, setSutentResult] = useState(null);
  const [attendence, setAttendence] = useState("");

  const [open, setOpen] = useState(false);

  // const [viewOpen, setViewOpen] = useState(false);

  // const [file, setFile] = useState(null);

  // const ref = useRef(null);

  // const handleFileChange = (e) => {
  //   if (e.target.files.length !== 1) {
  //     return alert("Please select one excel file");
  //   }

  //   const fileType = e.target.files[0].name;
  //   const types = fileType.split(".");
  //   if (types[1] !== "xlsx") {
  //     alert("You can upload excel files only !!!");
  //     ref.current.value = "";
  //   } else {
  //     setFile(e.target.files[0]);
  //   }
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStudent(null);
  };

  // const handleViewOpen = () => {
  //   setViewOpen(true);
  // };

  // const handleViewClose = () => {
  //   setViewOpen(false);
  // };

  // const importResult = () => {
  //   const promise = new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsArrayBuffer(file);

  //     fileReader.onload = (e) => {
  //       const bufferArray = e.target.result;

  //       const wb = XLSX.read(bufferArray, { type: "buffer" });

  //       const wsname = wb.SheetNames[0];

  //       const ws = wb.Sheets[wsname];

  //       const data = XLSX.utils.sheet_to_json(ws);

  //       resolve(data);
  //     };

  //     fileReader.onerror = (error) => {
  //       setLoading(false);
  //       reject(error);
  //     };
  //   });

  //   promise.then((d) => {
  //     let students = [];
  //     students = d;

  //     students.forEach(async (element) => {
  //       let subjectInfo = {};

  //       subjectInfo.Dancing = element.Dancing;
  //       subjectInfo.Dictation = element.Dictation;
  //       subjectInfo.Drawing = element.Drawing;
  //       subjectInfo.English = element.English;
  //       subjectInfo["English Oral"] = element["English Oral"];
  //       subjectInfo["G.K."] = element["G.K."];
  //       subjectInfo.HandWriting = element.HandWriting;
  //       subjectInfo.Math = element.Math;
  //       subjectInfo.Nepali = element.Nepali;
  //       subjectInfo["Nepali Oral"] = element["Nepali Oral"];
  //       subjectInfo.Science = element.Science;

  //       let studentId = element.StudentId;

  //       const examRef = doc(db, id, studentId);
  //       setDoc(examRef, subjectInfo, { merge: true });
  //     });
  //     alert("Marks added.");
  //     // setLoading(false);
  //     // navigate("/student");
  //   });

  //   promise.catch((err) => {
  //     alert(err);
  //     setLoading(false);
  //   });
  // };

  const addResult = (className, studentId) => {
    handleClickOpen();

    const getResultOfSutdent = async () => {
      try {
        const examRef = doc(db, id, studentId);
        const resultSnap = await getDoc(examRef);

        if (resultSnap.exists()) {
          setSutentResult(resultSnap.data());
          setAttendence(resultSnap.data()?.attendence);
        } else {
          setSutentResult(null);
        }
      } catch (error) {
        alert(error);
      }
    };

    const getClassSubjects = async () => {
      try {
        setLoading(true);
        const q = query(
          collection(db, "subjects"),
          orderBy("order", "asc"),
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
          getResultOfSutdent();
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
      {/* <input type={"file"} onChange={handleFileChange} ref={ref} />

      <button disabled={true} onClick={importResult}>
        Import
      </button> */}
      <TableContainer component={Paper}>
        <p
          align="center"
          style={{
            fontSize: 20,
          }}
        >
          Total Student - {search.length > 1 ? search.length : students.length}
        </p>
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
              <TableCell>Roll No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Create Date</TableCell>
              <TableCell>Image</TableCell>
              {id && !location.pathname.includes("class-students") && (
                <TableCell>Action</TableCell>
              )}
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
                    <TableCell>{studentItem.data.rollNo}</TableCell>
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
                    {id && !location.pathname.includes("class-students") && (
                      <TableCell>
                        <button
                          className="btn"
                          disabled={!id}
                          onClick={() =>
                            addResult(
                              studentItem.data.className,
                              studentItem.id
                            )
                          }
                        >
                          Add Result
                        </button>
                        <Link to={`/result/${id}/${studentItem.id}`}>
                          View Result
                        </Link>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              : students.map((studentItem, i) => (
                  <TableRow
                    key={studentItem.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{studentItem.data.rollNo}</TableCell>
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
                    {id && !location.pathname.includes("class-students") && (
                      <TableCell>
                        <button
                          className="btn"
                          disabled={!id}
                          onClick={() =>
                            addResult(
                              studentItem.data.className,
                              studentItem.id
                            )
                          }
                        >
                          Add/Edit Result
                        </button>

                        <Link to={`/result/${id}/${studentItem.id}`}>
                          View Result
                        </Link>
                      </TableCell>
                    )}
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
        studentResult={studentResult}
        selectedStudent={selectedStudent}
        attendence={attendence}
        setAttendence={setAttendence}
      />
    </Container>
  );
};

const AddMarksModal = ({
  open,
  handleClose,
  loading,
  subjects,
  studentResult,
  selectedStudent,
  attendence,
  setAttendence,
}) => {
  const { id } = useParams();
  const addAttendence = () => {
    try {
      let obj = {};
      obj["attendence"] = parseInt(attendence);
      const examRef = doc(db, id, selectedStudent);
      setDoc(examRef, obj, { merge: true });
      alert("Attendence added.");
    } catch (error) {
      alert(error);
    }
  };
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
          <>
            <TextField
              type="number"
              value={attendence}
              onChange={(e) => setAttendence(e.target.value)}
              id="marks"
              name={`attendence`}
              label={`Attendence`}
              fullWidth
              autoComplete="attendence"
              variant="standard"
            />
            <br />
            <br />
            <button
              className="btn btn-primary"
              disabled={!id || !attendence}
              onClick={addAttendence}
            >
              {studentResult ? "Edit" : "Add"}
            </button>
            <br />
            <br />
            <ExamMarks
              subjects={subjects}
              selectedStudent={selectedStudent}
              studentResult={studentResult}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentTable;

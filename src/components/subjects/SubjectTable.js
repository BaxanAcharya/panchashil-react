import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { db } from "../../utils/config/firebase";

const SubjectTable = ({ subjects }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  // const [editValues, setEditValues] = useState(null);
  const [fullMarks, setFullMarks] = useState("");
  const [order, setOrder] = useState("");

  useEffect(() => {
    const getSubject = async () => {
      try {
        const subjectRef = doc(db, "subjects", selectedClass);
        const docs = await getDoc(subjectRef);
        if (docs.exists()) {
          const values = docs.data();
          values.fullMarks && setFullMarks(values.fullMarks);
          values.order && setOrder(values.order);
        }
      } catch (error) {
        alert(error);
      }
    };

    if (selectedClass) {
      getSubject();
    }
  }, [selectedClass]);

  const handleClose = () => {
    setIsEditOpen(false);
    setFullMarks("");
    setOrder("");
    setSelectedClass(null);
  };

  const openSelected = (id) => {
    setSelectedClass(id);
    setIsEditOpen(true);
  };

  const editSubject = () => {
    try {
      const subjectRef = doc(db, "subjects", selectedClass);
      const updateObject = {
        fullMarks: fullMarks,
        order: order,
      };
      setDoc(subjectRef, updateObject, { merge: true });
      alert("Subject updated");
      setIsEditOpen(false);
      setFullMarks("");
      setSelectedClass(null);
      setOrder("");
    } catch (error) {
      alert(error);
    }
  };

  const deleteSubject = async (id) => {
    let isConfirm = window.confirm(
      "Are you sure you want to delete this subject?"
    );
    try {
      isConfirm && (await deleteDoc(doc(db, "subjects", id)));
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Container className="mt-5">
        <TableContainer component={Paper}>
          <p
            align="center"
            style={{
              fontSize: 20,
            }}
          >
            Total Subjects - {subjects.length}
          </p>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Class</TableCell>
                <TableCell>Subject Name</TableCell>
                <TableCell>Full marks</TableCell>
                <TableCell>Order</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects.map((subjectItem) => (
                <TableRow
                  key={subjectItem.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{subjectItem.data.class}</TableCell>
                  <TableCell align="left">
                    {subjectItem.data.subjectName}
                  </TableCell>
                  <TableCell align="left">
                    {subjectItem.data?.fullMarks
                      ? subjectItem.data?.fullMarks
                      : "Not added"}
                  </TableCell>
                  <TableCell align="left">
                    {subjectItem.data?.order
                      ? subjectItem.data?.order
                      : "Not added"}
                  </TableCell>
                  <TableCell align="right">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => deleteSubject(subjectItem.id)}
                    >
                      Delete
                    </button>
                    <br />
                    <br />
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => openSelected(subjectItem.id)}
                    >
                      Edit
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Dialog
        open={isEditOpen && selectedClass != null}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit Subjects"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Edit the subject for the classes, please fill up the below form
            and click edit button.
          </DialogContentText>

          <br />
          <input
            type="number"
            value={order}
            placeholder="Enter the subject order"
            onChange={(e) => setOrder(e.target.value)}
          />
          <br />
          <br />
          <input
            type="number"
            value={fullMarks}
            placeholder="Enter the subject full marks"
            onChange={(e) => setFullMarks(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <button className="btn  btn-danger" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() => editSubject()}
            disabled={!fullMarks || !order}
          >
            Update
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SubjectTable;

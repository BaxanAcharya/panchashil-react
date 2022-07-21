import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { Container } from "react-bootstrap";
import { db } from "../../utils/config/firebase";

const SubjectTable = ({ subjects }) => {
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
    <Container className="mt-5">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Class</TableCell>
              <TableCell>Subject Name</TableCell>
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
                <TableCell align="right">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteSubject(subjectItem.id)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default SubjectTable;

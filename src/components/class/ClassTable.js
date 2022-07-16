import {
  IconButton,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { Container, Table } from "react-bootstrap";
import { db } from "../../utils/config/firebase";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
// import Link from "next/link";

const ClassTable = ({ classes }) => {
  const deleteClass = async (id) => {
    let isConfirm = window.confirm(
      "Are you sure you want to delete this class?"
    );
    try {
      isConfirm && (await deleteDoc(doc(db, "classes", id)));
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
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((classItem) => (
              <TableRow
                key={classItem.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">
                  {classItem.data.class.toLowerCase()}
                </TableCell>
                <TableCell align="right">
                  <Link to={`/class-students/${classItem.id}`}>
                    <IconButton
                      color="info"
                      className="icon-btn"
                      style={{ margin: "10px" }}
                    >
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </Link>

                  <button
                    disabled={true}
                    className="btn btn-outline-danger"
                    onClick={() => deleteClass(classItem.id)}
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

export default ClassTable;

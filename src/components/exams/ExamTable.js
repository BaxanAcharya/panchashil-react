import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  IconButton,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const ExamTable = ({ exams }) => {
  return (
    <Container className="mt-5">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Id</TableCell>
              <TableCell align="left">Exam Name</TableCell>
              <TableCell align="left">Exam Year</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.map((examItem) => (
              <TableRow
                key={examItem.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{examItem.id}</TableCell>
                <TableCell>{examItem.data.examName}</TableCell>

                <TableCell>{examItem.data.examYear}</TableCell>
                <TableCell align="right">
                  <Link to={`/exam/${examItem.id}`}>
                    <IconButton
                      color="info"
                      className="icon-btn"
                      style={{ margin: "10px" }}
                    >
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ExamTable;

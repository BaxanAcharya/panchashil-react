import {
  IconButton,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import * as humandate from "human-date";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const StudentTable = ({ students, filtered, search }) => {
  const location = useLocation();
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
              <TableCell>
                {location.pathname.includes("class-students")
                  ? "Print"
                  : "Action"}{" "}
              </TableCell>
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
                      <IconButton>
                        <RemoveRedEyeIcon />
                      </IconButton>
                      <button className="btn">Add Result</button>
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
                      <IconButton>
                        <RemoveRedEyeIcon />
                      </IconButton>
                      <button className="btn">Add Result</button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default StudentTable;

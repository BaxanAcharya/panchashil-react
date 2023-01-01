import React from "react";

import AddIcon from "@mui/icons-material/Add";
import { CircularProgress, IconButton } from "@mui/material";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StudentTable from "../../components/students/StudentTable";
import { db } from "../../utils/config/firebase";

const Index = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [className, setClassName] = useState("Sort By Class");
  const [search, setSearch] = useState("");

  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    let unsub;
    const getAllStudentsList = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, "classes", className);
        await getDoc(docRef);
        const q = query(
          collection(db, "students"),
          orderBy("rollNo", "asc"),
          orderBy("className", "asc")
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

          setStudents(studentArr);
        }
        setLoading(false);
      } catch (e) {
        alert(e);
        setLoading(false);
      }
    };

    getAllStudentsList();

    if (unsub) {
      return () => {
        unsub();
      };
    }
    // eslint-disable-next-line
  }, []);

  const searchByClass = async (e) => {
    setClassName(e.target.value);
    if (e.target.value !== "Sort By Class" && e.target.value !== "All") {
      const q = query(
        collection(db, "students"),
        where("className", "==", e.target.value)
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length > 0) {
        let search = [];
        querySnapshot.forEach((doc) => {
          let obj = {};
          obj.id = doc.id;
          obj.data = doc.data();
          search.push(obj);
        });

        setStudents(search);
      } else {
        alert("No students found");
        // setClassName("All");
        setStudents([]);
      }
    } else if (e.target.value === "All") {
      try {
        onSnapshot(collection(db, "students"), (snap) => {
          setStudents(
            snap.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
      } catch (e) {
        alert(e);
      }
    }
  };

  const searchByName = (e) => {
    setSearch(e.target.value);
    if (search) {
      //search in the students array
      const filteredStudents = students.filter((student) => {
        return student.data.fullName
          .toLowerCase()
          .includes(search.toLowerCase());
      });

      setFiltered(filteredStudents);
    }
  };
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3 className="card-title"> Student</h3>
            <div style={{ flex: 1 }}></div>
            <div className="card-tools">
              <Link to="/student/add">
                <IconButton color="primary">
                  <AddIcon />
                </IconButton>
              </Link>
            </div>
          </div>
        </div>
        <div className="card-body">
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <>
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={search}
                        onChange={searchByName}
                        placeholder="Search By Name"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>
                  <div className="col-md-4" />
                  <div className="col-md-4">
                    <select
                      className="form-select"
                      defaultValue={className}
                      onChange={searchByClass}
                      aria-label="Default select example"
                    >
                      <option disabled>Sort By Class</option>
                      <option value={"All"}>All</option>
                      <option value="P.NURSERY">play nursery</option>
                      <option value="NURSERY">nursery</option>
                      <option value="JKG">jkg</option>
                      <option value="KG">kg</option>
                      <option value="ONE">one</option>
                      <option value="TWO">two</option>
                      <option value="THREE">three</option>
                    </select>
                  </div>
                </div>
              </div>

              <StudentTable
                students={students}
                filtered={filtered}
                search={search}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;

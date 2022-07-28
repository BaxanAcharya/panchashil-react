import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/private/PrivateRoute";
import { useEffect, useState } from "react";
import { auth } from "./utils/config/firebase";
import { Backdrop, CircularProgress } from "@mui/material";

import NavBar from "./components/nav/NavBar";

import Dashboard from "./pages/dasboard";
import Auth from "./pages/auth";
import Class from "./pages/classes";
import Student from "./pages/student";
import AddStudent from "./pages/student/Add";
import ClassStudents from "./pages/class-students";
import Exams from "./pages/exams";
import Subjects from "./pages/subjects";
import ExamId from "./pages/exams/ExamId";
import Result from "./pages/exams/Result";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
        setLoading(false);
      });

      return unsubscribe;
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  }, []);

  return (
    <Router>
      {loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="success" />
        </Backdrop>
      ) : (
        <>
          {user && <NavBar />}
          <Routes>
            <Route
              exact
              path="/"
              element={<Auth user={user} setUser={setUser} />}
            />

            <Route
              exact
              path="/dashboard"
              element={
                <PrivateRoute user={user}>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="/class"
              element={
                <PrivateRoute user={user}>
                  <Class />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="/student"
              element={
                <PrivateRoute user={user}>
                  <Student />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="/student/add"
              element={
                <PrivateRoute user={user}>
                  <AddStudent />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="/exams"
              element={
                <PrivateRoute user={user}>
                  <Exams />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="/subjects"
              element={
                <PrivateRoute user={user}>
                  <Subjects />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="/exam/:id"
              element={
                <PrivateRoute user={user}>
                  <ExamId />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="/result/:examId/:studentId"
              element={
                <PrivateRoute user={user}>
                  <Result />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="/class-students/:id"
              element={
                <PrivateRoute user={user}>
                  <ClassStudents />
                </PrivateRoute>
              }
            />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;

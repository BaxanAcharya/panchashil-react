import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/private/PrivateRoute";
import { useEffect, useState } from "react";
import { auth } from "./utils/config/firebase";
import { Backdrop, CircularProgress } from "@mui/material";

import Dashboard from "./pages/dasboard";
import Auth from "./pages/auth";
import Class from "./pages/classes";
import NavBar from "./components/nav/NavBar";

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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

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
      </Routes>
    </Router>
  );
}

export default App;

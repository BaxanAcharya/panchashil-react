import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth";
import PrivateRoute from "./utils/private/PrivateRoute";
import Dashboard from "./pages/dasboard";
import { useEffect, useState } from "react";
import { auth } from "./utils/config/firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;

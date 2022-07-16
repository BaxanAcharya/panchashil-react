import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth";
// import { auth } from "./utils/config/firebase";

// const user = auth.currentUser;

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;

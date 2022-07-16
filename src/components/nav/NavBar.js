import { Menu, MenuItem, Skeleton } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { auth, db } from "../../utils/config/firebase";
import "./Navbar.css";
const NavBar = () => {
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = auth.currentUser;
  useEffect(() => {
    setLoading(true);
    let unsubscribe;
    if (user) {
      try {
        unsubscribe = onSnapshot(doc(db, "logos", user.uid), (doc) => {
          setLogo(doc.data().image);
          setLoading(false);
        });
      } catch (e) {
        setLoading(false);
        alert(e);
      }
    }

    if (unsubscribe) {
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Link to={"/dashboard"}>
          <Navbar.Brand>
            {loading ? (
              <Skeleton
                variant="circular"
                animation="wave"
                width={50}
                height={50}
              />
            ) : (
              logo && <img src={logo} width={50} height={50} alt="logo" />
            )}
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>
              <Link
                to="/dashboard"
                className={`${location.pathname === "/dashboard" && "active"}`}
              >
                Home
              </Link>
            </Nav.Link>

            <Nav.Link>
              <Link
                to="/class"
                className={`${
                  (location.pathname === "/class" ||
                    location.pathname.includes("class-students")) &&
                  "active"
                }`}
              >
                Class
              </Link>
            </Nav.Link>

            <Nav.Link>
              <Link
                to="/student"
                className={`${
                  (location.pathname === "/student" ||
                    location.pathname === "/student/add") &&
                  "active"
                }`}
              >
                Student
              </Link>
            </Nav.Link>

            <div>
              <Nav.Link
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                Settings
              </Nav.Link>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          </Nav>

          <button
            className="btn btn-outline-danger"
            onClick={() => {
              auth.signOut();

              navigate("/");
            }}
          >
            Logout
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

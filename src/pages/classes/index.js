import React from "react";

import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../utils/config/firebase";
import AddIcon from "@mui/icons-material/Add";
import ClassTable from "../../components/class/ClassTable";
import AddClass from "../../components/class/AddClass";

const Index = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    let unsub;
    try {
      unsub = onSnapshot(collection(db, "classes"), (snap) => {
        setClasses(
          snap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
      setLoading(false);
    } catch (e) {
      alert(e);
      setLoading(false);
    }

    if (unsub) {
      return () => {
        unsub();
      };
    }
  }, []);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3 className="card-title"> Class</h3>
            <div style={{ flex: 1 }}></div>
            <div className="card-tools">
              <IconButton color="success" onClick={handleClickOpen}>
                <AddIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="card-body">
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <ClassTable classes={classes} />
          )}
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add class"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Add the subject for the classes, please fill up the below form
            and click add button.
          </DialogContentText>
          <br />
          <AddClass classes={classes} />
        </DialogContent>
        <DialogActions>
          <button className="btn btn-danger" onClick={handleClose} autoFocus>
            Close
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Index;

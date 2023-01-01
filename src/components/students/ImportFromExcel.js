import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { db } from "../../utils/config/firebase";

const ImportFromExcel = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFile(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length !== 1) {
      return alert("Please select one excel file");
    }

    const fileType = e.target.files[0].name;
    const types = fileType.split(".");
    if (types[1] !== "xlsx") {
      alert("You can upload excel files only !!!");
      ref.current.value = "";
    } else {
      setFile(e.target.files[0]);
    }
  };

  const uplaodData = () => {
    setLoading(true);

    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        setLoading(false);
        reject(error);
      };
    });

    promise.then((d) => {
      let students = [];
      students = d;

      //   return;

      //   let i = 0;

      students.forEach(async (element) => {
        let studentInfo = {};
        studentInfo.fullName = element.Name;
        studentInfo.fatherName = element.FatherName;
        studentInfo.motherName = element.motherName;
        studentInfo.previousSchool = element.previousSchool;
        studentInfo.entranceMarks = element.entranceMarks;
        studentInfo.className = element.class;
        studentInfo.physicalDisability = element["phy.lDisability"];
        studentInfo.dateOfBirth = element["DOB"] ? element["DOB"] : "-";
        studentInfo.gender = element.gender;
        studentInfo.gfullName = element.gaurdainfullName;
        studentInfo.gaddress = element.guardainaddress;
        studentInfo.municipalityVdc = element["municipality/Vdc"];
        studentInfo.profession = element.profession;
        studentInfo.height = element.height.trim();
        studentInfo.weight = element.weight.trim();
        studentInfo.contactNumber = element.contactNumber;
        studentInfo.pdateOfBirth = element.parentdateOfBirth;
        studentInfo.optional = "";
        studentInfo.feeSchedule = element["fee(Monthly)"];
        studentInfo.routeType = element["routeType(walking/bus)"];
        studentInfo.paySchedule =
          element["paySchedule(1 month/6 month/1 year)"];
        studentInfo.createdDate = serverTimestamp();
        studentInfo.imageUrl =
          "https://firebasestorage.googleapis.com/v0/b/school-management-system-3aeea.appspot.com/o/student%2F852307618300CircleLogo.png?alt=media&token=13ec68d1-e704-49c6-a4c4-318341505c10";
        studentInfo.rollNo = element.rollNo;
        studentInfo.admissionDate = new Date();
        studentInfo.section = element.section;

        await addDoc(collection(db, "students"), studentInfo);
      });
      setLoading(false);
      navigate("/student");
    });

    promise.catch((err) => {
      alert(err);
      setLoading(false);
    });
  };

  return (
    <div style={{ display: "flex", marginTop: "10px" }}>
      <div style={{ flex: 1 }}></div>
      <div style={{ marginRight: "50px" }}>
        <button className="btn btn-outline-success" onClick={handleClickOpen}>
          Import Students
        </button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Import Students Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To bulk upload the student information from excel file, please
            select the file from below and click add button.
          </DialogContentText>
          <br />
          {loading && <CircularProgress />}
          <input
            type={"file"}
            id="photo"
            className="form-control"
            name="photo"
            onChange={handleFileChange}
            ref={ref}
          />
        </DialogContent>
        <DialogActions>
          <button className="btn  btn-danger" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            disabled={!file}
            onClick={uplaodData}
          >
            Add
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ImportFromExcel;

import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../../utils/config/firebase";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import Person from "../../assets/img/person.png";

const PersonalInformation = ({ formik, image, setImage, setUploadImage }) => {
  const [classes, setClasses] = useState([]);
  const ref = useRef(null);

  const handleFileChange = (e) => {
    if (!e.target.files.length < 0) {
      return;
    }
    const fileType = e.target.files[0].type;
    if (
      fileType === "image/png" ||
      fileType === "image/jpeg" ||
      fileType === "image/jpg"
    ) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setUploadImage(e.target.files[0]);
    } else {
      alert("Please select a valid image");
      ref.current.value = "";
    }
  };

  useEffect(() => {
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
    } catch (e) {
      alert(e);
    }

    if (unsub) {
      return () => {
        unsub();
      };
    }
  }, []);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.fullName && formik.touched.fullName}
            name="fullName"
            label={`${
              formik.errors.fullName && formik.touched.fullName
                ? formik.errors.fullName
                : " Full name"
            } `}
            fullWidth
            autoComplete="full-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="fatherName"
            name="fatherName"
            value={formik.values.fatherName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.fatherName && formik.touched.fatherName}
            label={`${
              formik.errors.fatherName && formik.touched.fatherName
                ? formik.errors.fatherName
                : " Father's name"
            } `}
            fullWidth
            autoComplete="father-name"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="motherName"
            name="motherName"
            value={formik.values.motherName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.motherName && formik.touched.motherName}
            label={`${
              formik.errors.motherName && formik.touched.motherName
                ? formik.errors.motherName
                : "Mother's name"
            } `}
            fullWidth
            autoComplete="mother-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="previousSchool"
            name="previousSchool"
            value={formik.values.previousSchool}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Previous School"
            fullWidth
            autoComplete="previous-school"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            value={formik.values.entranceMarks}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.entranceMarks && formik.touched.entranceMarks}
            type="number"
            id="marksGainedInEntranceExam"
            name="entranceMarks"
            label=" Marks gained in entrance exam"
            fullWidth
            autoComplete="marks-gained-in-entrance-exam"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="class-simple-select-label">Class *</InputLabel>
            <Select
              labelId="class-simple-select-label"
              id="class-simple-select"
              value={formik.values.className}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="className"
              label="Class"
            >
              <MenuItem value={"Select Here"} disabled>
                Select Here
              </MenuItem>
              {classes.map((classItem) => {
                return (
                  <MenuItem value={classItem.data.class} key={classItem.id}>
                    {classItem.data.class}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            value={formik.values.physicalDisability}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="physicalDisability"
            name="physicalDisability"
            label="If any physical problem (No any problem)"
            fullWidth
            autoComplete="physical-disability"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={formik.values.rollNo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="rollNo"
            name="rollNo"
            error={formik.errors.rollNo && formik.touched.rollNo}
            label={`${
              formik.errors.rollNo && formik.touched.rollNo
                ? formik.errors.rollNo
                : "Roll No"
            } `}
            fullWidth
            type={"number"}
            autoComplete="rollNo"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel
            id="date-of-birth"
            variant="standard"
            style={{
              color: `${
                formik.errors.dateOfBirth && formik.touched.dateOfBirth
                  ? "#D32F2F"
                  : "#666666"
              }`,
            }}
          >
            {formik.errors.dateOfBirth && formik.touched.dateOfBirth
              ? formik.errors.dateOfBirth
              : "Date of Birth *"}
          </InputLabel>
          <TextField
            required
            max={new Date().getFullYear()}
            type="date"
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.dateOfBirth && formik.touched.dateOfBirth}
            id="dateOfBirth"
            name="dateOfBirth"
            fullWidth
            autoComplete="date-of-birth"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="gender-simple-select-label">Gender *</InputLabel>
            <Select
              labelId="gender-simple-select-label"
              id="gender-simple-select"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="gender"
              label="Gender"
            >
              <MenuItem value={"Select Here"} disabled>
                Select Here
              </MenuItem>
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Others"}>Others</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel
            id="date-of-birth"
            variant="standard"
            style={{
              color: `${
                formik.errors.admissionDate && formik.touched.admissionDate
                  ? "#D32F2F"
                  : "#666666"
              }`,
            }}
          >
            {formik.errors.admissionDate && formik.touched.admissionDate
              ? formik.errors.admissionDate
              : "Admission Date *"}
          </InputLabel>
          <TextField
            required
            max={new Date().getFullYear()}
            type="date"
            value={formik.values.admissionDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.admissionDate && formik.touched.admissionDate}
            id="admissionDate"
            name="admissionDate"
            fullWidth
            autoComplete="adminssion-date"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            value={formik.values.section}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="section"
            name="section"
            label="Section"
            fullWidth
            autoComplete="section"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={image ? 10 : 0}>
          <input
            type={"file"}
            id="photo"
            className="form-control"
            name="photo"
            onChange={handleFileChange}
            ref={ref}
          />
        </Grid>

        {image && (
          <Grid item xs={12} sm={2}>
            <Tooltip title="Clear Photo">
              <IconButton
                onClick={() => {
                  setImage(null);
                  setUploadImage(null);
                  ref.current.value = "";
                }}
              >
                <ClearAllIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        )}

        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {image ? (
            <img src={image} height={200} width={200} alt="Not loaded" />
          ) : (
            <img src={Person} height={200} width={200} alt="Not loaded" />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default PersonalInformation;

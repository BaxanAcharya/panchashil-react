import { Fragment, useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { steps } from "../../utils/steps/addStudent";
import PersonalInformation from "./PersonalInformation";
import GaurdainInformation from "./GaurdainInformation";
import ExtraInformation from "./ExtraInformation";
import { useFormik } from "formik";
import { addStudentValidationSchema } from "../../utils/validation/validation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../utils/config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const initialValues = {
  fullName: "",
  fatherName: "",
  motherName: "",
  previousSchool: "",
  entranceMarks: "",
  className: "Select Here",
  physicalDisability: "",
  dateOfBirth: "",
  gender: "Select Here",
  gfullName: "",
  gaddress: "",
  municipalityVdc: "",
  profession: "",
  height: "",
  weight: "",
  contactNumber: "",
  pdateOfBirth: "",
  optional: "",
  feeSchedule: "",
  routeType: "Select Here",
  paySchedule: "Select Here",
  createdDate: serverTimestamp(),
  imageUrl: "",
  rollNo: "",
  admissionDate: "",
  section: "",
};

const AddStudent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [image, setImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const formik = useFormik({
    initialValues,
    validationSchema: addStudentValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      if (!uploadImage) return alert("Please select an image");
      try {
        const randomNumber = Math.floor(Math.random() * 1000000000000);
        const studentsRef = ref(
          storage,
          `student/${randomNumber + uploadImage.name}`
        );

        const uploadTask = uploadBytesResumable(studentsRef, uploadImage);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const pro =
              Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(pro);
          },
          (err) => alert(err),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              values.imageUrl = url;
              addDoc(collection(db, "students"), values);
              setSubmitting(false);
              setActiveStep(activeStep + 1);
            });
          }
        );
      } catch (error) {
        alert(error);
        setSubmitting(false);
      }
    },
  });

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <PersonalInformation
            formik={formik}
            setImage={setImage}
            image={image}
            setUploadImage={setUploadImage}
          />
        );
      case 1:
        return <GaurdainInformation formik={formik} />;
      case 2:
        return <ExtraInformation formik={formik} progress={progress} />;
      default:
        throw new Error("Unknown step");
    }
  };

  const handleNext = () => {
    if (activeStep === 2) {
      formik.handleSubmit();
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const displableNextStep = () => {
    let disabled = true;
    if (activeStep === 0) {
      if (
        !formik.errors.fullName &&
        !formik.errors.fatherName &&
        !formik.errors.rollNo &&
        !formik.errors.admissionDate &&
        !formik.errors.motherName &&
        !formik.values.className !== "Select Here" &&
        !formik.errors.dateOfBirth &&
        formik.values.gender !== "Select Here" &&
        image != null
      ) {
        disabled = false;
      } else {
        disabled = true;
      }
    } else if (activeStep === 1) {
      if (
        !formik.errors.gfullName &&
        !formik.errors.gaddress &&
        !formik.errors.municipalityVdc &&
        !formik.errors.profession &&
        !formik.errors.contactNumber &&
        !formik.errors.pdateOfBirth
      ) {
        disabled = false;
      } else {
        disabled = true;
      }
    } else if (activeStep === 2) {
      if (
        !formik.errors.feeSchedule &&
        formik.values.routeType !== "Select Here" &&
        formik.values.paySchedule !== "Select Here"
      ) {
        disabled = false;
      } else {
        disabled = true;
      }
    }
    return disabled;
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Add Student Information
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Fragment>
          {activeStep === steps.length ? (
            <Fragment>
              <Typography variant="h5" gutterBottom>
                Student has been added successfully
              </Typography>
              <Link to="/student">
                <Button variant="contained">Students List</Button>
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={displableNextStep()}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Add" : "Next"}
                </Button>
              </Box>
            </Fragment>
          )}
        </Fragment>
      </Paper>
    </Container>
  );
};

export default AddStudent;

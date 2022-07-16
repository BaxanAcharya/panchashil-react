import { Box, CircularProgress, Grid, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { classValidationSchema } from "../../utils/validation/validation";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../utils/config/firebase";

const initialValues = {
  class: "",
};

const onSubmit = async (values, { setSubmitting }) => {
  addClass(values, setSubmitting);
};

const addClass = async (values, setSubmitting) => {
  try {
    await addDoc(collection(db, "classes"), values);
    setSubmitting(false);
    values.class = "";
  } catch (error) {
    alert(error);
    setSubmitting(false);
  }
};

const AddClass = ({ classes }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: classValidationSchema,
  });

  const findClass = classes.find(
    (classItem) =>
      classItem.data.class.toLowerCase() === formik.values.class.toLowerCase()
  );

  return (
    <Grid
      item
      component={Paper}
      elevation={6}
      square
      className="mt-5"
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "15px",
      }}
    >
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <p className="text-success">Add Class</p>
        {findClass && (
          <p className="text-danger">
            {formik.values.class} class already exist
          </p>
        )}
        {formik.isSubmitting && <CircularProgress color="secondary" />}
        <TextField
          margin="normal"
          required
          fullWidth
          id="text"
          value={formik.values.class}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Class Name"
          name="class"
          autoComplete="class"
        />
        {formik.touched.class && formik.errors.class ? (
          <div className="mb-3" style={{ color: "red" }}>
            {formik.errors.class}
          </div>
        ) : null}
        <button
          type="submit"
          className="btn btn-outline-primary mt-3"
          disabled={!formik.values.class || findClass}
        >
          Add
        </button>
      </Box>
    </Grid>
  );
};

export default AddClass;

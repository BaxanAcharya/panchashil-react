import React from "react";

import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const AddSubject = ({ classes, formik }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {formik.isSubmitting && <CircularProgress />}
        <TextField
          value={formik.values.subjectName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.subjectName && formik.touched.subjectName}
          type="text"
          id="subject"
          name="subjectName"
          label={
            `${formik.errors.subjectName && formik.touched.subjectName}`
              ? formik.errors.subjectName
              : "Subject Name"
          }
          fullWidth
          autoComplete="subjectName"
          required
          variant="standard"
        />
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth variant="standard">
          <InputLabel id="class-simple-select-label">Class *</InputLabel>
          <Select
            labelId="class-simple-select-label"
            id="class-simple-select"
            value={formik.values.examYear}
            onChange={formik.handleChange}
            name="class"
            label="Class"
          >
            <MenuItem value={"Select Here"} disabled>
              Select Here
            </MenuItem>

            {classes.map((c) => (
              <MenuItem key={c.id} value={c?.data?.class}>
                {c.data.class}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          value={formik.values.fullMarks}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.fullMarks && formik.touched.fullMarks}
          type="number"
          id="fullMarks"
          name="fullMarks"
          label={
            `${formik.errors.fullMarks && formik.touched.fullMarks}`
              ? formik.errors.fullMarks
              : "Full marks"
          }
          fullWidth
          autoComplete="fullMarks"
          required
          variant="standard"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          value={formik.values.order}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.order && formik.touched.order}
          type="number"
          id="order"
          name="order"
          label={
            `${formik.errors.order && formik.touched.order}`
              ? formik.errors.order
              : "Order"
          }
          fullWidth
          autoComplete="order"
          required
          variant="standard"
        />
      </Grid>
    </Grid>
  );
};

export default AddSubject;

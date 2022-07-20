import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import NepaliDate from "nepali-date-converter";

const AddExams = ({ formik }) => {
  const nepaliDate = new NepaliDate(new Date());
  let nepaliYear = nepaliDate.getYear();
  let years = [nepaliYear];
  for (var i = 0; i < 10; i++) {
    nepaliYear++;
    years.push(nepaliYear);
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {formik.isSubmitting && <CircularProgress />}
        <TextField
          value={formik.values.examName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.examName && formik.touched.examName}
          type="text"
          id="examName"
          name="examName"
          label="Exam name"
          fullWidth
          autoComplete="examName"
          variant="standard"
        />
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth variant="standard">
          <InputLabel id="gender-simple-select-label">Exam Year *</InputLabel>
          <Select
            labelId="gender-simple-select-label"
            id="gender-simple-select"
            value={formik.values.examYear}
            onChange={formik.handleChange}
            name="examYear"
            label="Exam year"
          >
            <MenuItem value={"Select Here"} disabled>
              Select Here
            </MenuItem>

            {years.map((y, i) => (
              <MenuItem key={i} value={y}>
                {y}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default AddExams;

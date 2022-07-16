import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const ExtraInformation = ({ formik, progress }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Accounting Information
      </Typography>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          {formik.isSubmitting && <CircularProgress color="secondary" />}

          {progress !== 0 && (
            <p className="text-success">Uploading the image {progress}%</p>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="fullName"
            value={formik.values.feeSchedule}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.feeSchedule && formik.touched.feeSchedule}
            name="feeSchedule"
            label={`${
              formik.errors.feeSchedule && formik.touched.feeSchedule
                ? formik.errors.feeSchedule
                : " Fee Schedule (Per Month)"
            } `}
            fullWidth
            autoComplete="full-name"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="route-simple-select-label">Route Type *</InputLabel>
            <Select
              labelId="route-simple-select-label"
              id="route-simple-select"
              value={formik.values.routeType}
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="routeType"
            >
              <MenuItem value={"Select Here"} disabled>
                Select Here
              </MenuItem>
              <MenuItem value={"Walking"}>Walking</MenuItem>
              <MenuItem value={"Bus Route"}>Bus Route</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="route-simple-select-label">
              Fee paying Schedule Option Months *
            </InputLabel>
            <Select
              labelId="route-simple-select-label"
              id="route-simple-select"
              value={formik.values.paySchedule}
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="paySchedule"
              label="Gender"
            >
              <MenuItem value={"Select Here"} disabled>
                Select Here
              </MenuItem>
              <MenuItem value={"1 month"}>In 1 months</MenuItem>
              <MenuItem value={"3 month"}>In 3 months</MenuItem>
              <MenuItem value={"6 month"}>In 6 months</MenuItem>
              <MenuItem value={"1 year"}>In 1 year</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default ExtraInformation;

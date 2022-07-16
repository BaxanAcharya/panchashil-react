import { Grid, InputLabel, TextField, Typography } from "@mui/material";

const GaurdainInformation = ({ formik }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Gaurdain Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="gfullName"
            name="gfullName"
            label={`${
              formik.errors.gfullName && formik.touched.gfullName
                ? formik.errors.gfullName
                : "Full name"
            } `}
            error={formik.errors.gfullName && formik.touched.gfullName}
            value={formik.values.gfullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            autoComplete="gfull-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="gaddress"
            name="gaddress"
            value={formik.values.gaddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label={`${
              formik.errors.gaddress && formik.touched.gaddress
                ? formik.errors.gaddress
                : "Address"
            } `}
            error={formik.errors.gaddress && formik.touched.gaddress}
            fullWidth
            autoComplete="g-address"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="municipality/vdc"
            name="municipalityVdc"
            value={formik.values.municipalityVdc}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label={`${
              formik.errors.municipalityVdc && formik.touched.municipalityVdc
                ? formik.errors.municipalityVdc
                : "Municipality/VDC"
            } `}
            error={
              formik.errors.municipalityVdc && formik.touched.municipalityVdc
            }
            fullWidth
            autoComplete="municipality/vdc"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="profession"
            required
            name="profession"
            label={`${
              formik.errors.profession && formik.touched.profession
                ? formik.errors.profession
                : "Profession"
            } `}
            error={formik.errors.profession && formik.touched.profession}
            value={formik.values.profession}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            autoComplete="profession"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="height"
            name="height"
            type={"number"}
            label="Height"
            value={formik.values.height}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            autoComplete="height"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type={"number"}
            id="weight"
            name="weight"
            value={formik.values.weight}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Weight"
            fullWidth
            autoComplete="weight"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="number"
            id="contactNumber"
            name="contactNumber"
            value={formik.values.contactNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label={`${
              formik.errors.contactNumber && formik.touched.contactNumber
                ? formik.errors.contactNumber
                : "Contact Number"
            } `}
            error={formik.errors.contactNumber && formik.touched.contactNumber}
            fullWidth
            autoComplete="contact-number"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel
            id="date-of-birth"
            style={{
              color: `${
                formik.errors.pdateOfBirth && formik.touched.pdateOfBirth
                  ? "#D32F2F"
                  : "#666666"
              }`,
            }}
          >
            {`${
              formik.errors.pdateOfBirth && formik.touched.pdateOfBirth
                ? formik.errors.pdateOfBirth
                : " Date of birth *"
            } `}
          </InputLabel>
          <TextField
            required
            type="date"
            id="pdateOfBirth"
            name="pdateOfBirth"
            value={formik.values.pdateOfBirth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.pdateOfBirth && formik.touched.pdateOfBirth}
            fullWidth
            autoComplete="pdate-of-birth"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="optional"
            name="optional"
            value={formik.values.optional}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Optional"
            fullWidth
            autoComplete="optional"
            variant="standard"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default GaurdainInformation;

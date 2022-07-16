import {
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import CopyRight from "../copyright/CopyRight";
import { loginValidationSchema } from "../../utils/validation/validation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/config/firebase";
import Logo from "../../assets/img/CircleLogo.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getUser from "../../utils/firebaseUser";

const initialValues = {
  email: "",
  password: "",
};

const onSubmit = async (values, { setSubmitting }) => {
  try {
    const user = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    setSubmitting(false);
    console.log(user);
  } catch (error) {
    console.log(error);
    alert(error.message);
    setSubmitting(false);
  }
};

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: loginValidationSchema,
  });

  useEffect(() => {
    if (getUser) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={Logo}
            alt="Circle Logo"
            height={100}
            width={100}
            className="img img-responsive"
          />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          {formik.isSubmitting && <CircularProgress color="secondary" />}
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />

            {formik.touched.email && formik.errors.email ? (
              <div className="mb-3" style={{ color: "red" }}>
                {formik.errors.email}
              </div>
            ) : null}
            <div
              className={`input-group  ${
                formik.touched.password && formik.errors.password
                  ? null
                  : "mb-3"
              }`}
            ></div>

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="current-password"
            />

            {formik.touched.password && formik.errors.password ? (
              <div className="mb-3" style={{ color: "red" }}>
                {formik.errors.password}
              </div>
            ) : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                formik.values.password.length < 6 || !formik.values.email
              }
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <CopyRight sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;

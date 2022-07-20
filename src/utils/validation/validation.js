import * as Yup from "yup";

export const classValidationSchema = Yup.object({
  class: Yup.string()
    .required("Class name is required")
    .max(10, "Class name must be less than 10 characters"),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const addStudentValidationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  fatherName: Yup.string().required("Father's name is required"),
  motherName: Yup.string().required("Mother's name is required"),
  className: Yup.string().required("Class name is required"),
  rollNo: Yup.number().required("Roll No is required"),
  admissionDate: Yup.string().required("Admission date is required *"),
  dateOfBirth: Yup.string().required("Date of birth is required *"),
  gender: Yup.string().required("Gender name is required"),
  gfullName: Yup.string().required("Full name is required"),
  gaddress: Yup.string().required("Address is required"),
  municipalityVdc: Yup.string().required("Municipality/VDC is required"),
  profession: Yup.string().required("Profession is required"),
  contactNumber: Yup.string().required("Contact number is required"),
  pdateOfBirth: Yup.string().required("Date of birth is required *"),
  feeSchedule: Yup.string().required("Fee Schedule (Per Month) is required"),
});

export const addExamValidationSchema = Yup.object({
  examName: Yup.string().required("Exam name is required"),
});

export const addSubjectValidationSchema = Yup.object({
  subjectName: Yup.string().required("Subject name is required"),
});

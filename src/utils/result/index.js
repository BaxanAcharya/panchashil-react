export const getGrade = (subject, result) => {
  let subjectName = subject.subjectName;
  const subjectFullMarks = parseInt(subject.fullMarks);
  if (
    !result.hasOwnProperty("Nepali.Oral") &&
    subject.subjectName === "Nepali.Oral"
  ) {
    subjectName = "Nepali Oral";
  }
  const mark = result[subjectName];
  return grade(mark, subjectFullMarks);
};

export const getOverallGrade = (sum, subjects) => {
  return grade(sum, getTotalMarksOfClass(subjects));
};

export const grade = (mark, total) => {
  const percentage = (mark / total) * 100;
  if (percentage >= 90) {
    return "A+";
  } else if (percentage >= 80) {
    return "A";
  } else if (percentage >= 70) {
    return "B+";
  } else if (percentage >= 60) {
    return "B";
  } else if (percentage >= 50) {
    return "C+";
  } else if (mark >= 40) {
    return "C";
  } else if (percentage >= 20) {
    return "D+";
  } else if (percentage >= 1) {
    return "E";
  } else {
    return "Not Applicable";
  }
};

export const getRemarks = (grade) => {
  let remarks = "";
  switch (grade) {
    case "A+":
      remarks = "Excellent";
      break;
    case "A":
      remarks = "Very Good";
      break;
    case "B+":
      remarks = "Good";
      break;
    case "B":
      remarks = "Satisfactory";
      break;
    case "C+":
      remarks = "Poor Study Hard";
      break;
    case "C":
      remarks = "Poor Study Hard";
      break;
    case "D+":
      remarks = "Poor Study Hard";
      break;
    case "E":
      remarks = "Poor Study Hard";
      break;
    default:
      remarks = "Good";
  }
  return remarks;
};

export const getGpa = (subject, result) => {
  let subjectName = subject.subjectName;
  if (
    !result.hasOwnProperty("Nepali.Oral") &&
    subject.subjectName === "Nepali.Oral"
  ) {
    subjectName = "Nepali Oral";
  }
  const subjectFullMarks = parseInt(subject.fullMarks);
  const mark = result[subjectName];
  return Gpa(mark, subjectFullMarks);
};

export const getOverallGpa = (sum, subjects) => {
  return Gpa(sum, getTotalMarksOfClass(subjects));
};

export const Gpa = (mark, total) => {
  const percentage = (mark / total) * 100;
  if (percentage >= 90) {
    return "4";
  } else if (percentage >= 80) {
    return "3.6";
  } else if (percentage >= 70) {
    return "3.2";
  } else if (percentage >= 60) {
    return "2.8";
  } else if (percentage >= 50) {
    return "2.4";
  } else if (mark >= 40) {
    return "2.0";
  } else if (percentage >= 20) {
    return "1.6";
  } else if (percentage >= 1) {
    return "1.2";
  } else {
    return "0";
  }
};

export const getTotalMarksOfClass = (subjects) => {
  const totalMarksOfExam = subjects.reduce((a, b) => {
    return a + parseInt(b.fullMarks);
  }, 0);

  return totalMarksOfExam;
};

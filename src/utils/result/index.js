export const grade = (mark, total) => {
  console.log("total", total);
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

export const getTotalOfSubject = (sub) => {
  let fullMarks;
  switch (sub) {
    case "G.K.":
      fullMarks = 50;
      break;
    case "Nepali":
      fullMarks = 100;
      break;
    case "Social":
      fullMarks = 100;
      break;
    case "Math":
      fullMarks = 100;
      break;
    case "Nepali Oral":
      fullMarks = 25;
      break;
    case "Nepali Ora":
      fullMarks = 25;
      break;
    case "English Oral":
      fullMarks = 25;
      break;
    case "Dance":
      fullMarks = 50;
      break;
    case "Dancing":
      fullMarks = 50;
      break;
    case "Drawing":
      fullMarks = 10;
      break;
    case "Dictation":
      fullMarks = 20;
      break;
    case "Science":
      fullMarks = 100;
      break;
    case "Computer":
      fullMarks = 50;
      break;
    case "Moral":
      fullMarks = 50;
      break;
    case "Grammar":
      fullMarks = 50;
      break;
    case "English":
      fullMarks = 100;
      break;
    case "Handwriting":
      fullMarks = 20;
      break;
    case "HandWriting":
      fullMarks = 20;
      break;
    case "Writing":
      fullMarks = 20;
      break;
    case "Serofero":
      fullMarks = 100;
      break;
    default:
      fullMarks = 100;
      break;
  }

  return fullMarks;
};

export const getOveralTotal = (className) => {
  let overalTotal;
  switch (className) {
    case "KG A":
      overalTotal = 600;
      break;
    case "JKG A":
      overalTotal = 600;
      break;
    case "NURSERY A":
      overalTotal = 500;
      break;
    case "THREE A":
      overalTotal = 800;
      break;
    case "ONE A":
      overalTotal = 800;
      break;
    default:
      overalTotal = 800;
      break;
  }

  return overalTotal;
};

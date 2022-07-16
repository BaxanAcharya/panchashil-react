import React from "react";
import AddStudent from "../../components/students/AddStudent";
import ImportFromExcel from "../../components/students/ImportFromExcel";

const Add = () => {
  return (
    <>
      <ImportFromExcel />
      <AddStudent />
    </>
  );
};

export default Add;

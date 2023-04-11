import React, { useRef } from "react";

import ReactToPrint from "react-to-print";
import CircleLogo from "../../assets/img/CircleLogo.png";
import LargeLogo from "../../assets/img/RectangleLogo.png";
import {
  getGpa,
  getGrade,
  getOverallGpa,
  getOverallGrade,
  getRemarks,
} from "../../utils/result";

const Result = ({ student, results, exam, subjects }) => {
  let result = Object.assign({}, results);
  if (result.hasOwnProperty("Writing")) {
    result["Handwriting"] = result["Writing"];
  }

  console.log({ subjects });

  const ref = useRef();
  let marks = [];
  subjects.forEach((element) => {
    if (element.subjectName === "Nepali.Oral") {
      marks.push(result["Nepali Oral"]);
    } else {
      marks.push(result[element.subjectName]);
    }
  });

  const sum = marks.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

  return (
    <>
      <ReactToPrint
        copyStyles={true}
        documentTitle={`Result of ${student.fullName} ${exam?.examName} ${exam?.examYear}`}
        onPrintError={() =>
          alert("Some thing went worng. Cannot print the invoice")
        }
        trigger={() => (
          <button
            style={{ margin: "0px 37px" }}
            type="button"
            className="btn btn-primary btn-block"
          >
            Print Marksheet
          </button>
        )}
        content={() => ref.current}
      />
      <div
        className="container"
        ref={ref}
        style={{
          paddingRight: "20px",
          paddingLeft: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            border: "1px solid black",

            borderRadius: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              background: "#FECD01",
            }}
            className="mb-1"
          >
            <img src={LargeLogo} alt="Large Logo" style={{ width: "490px" }} />
          </div>
          <div className="d-flex justify-content-center flex-nowrap terminal-text">
            <h5>
              {exam?.examName} {exam?.examYear}
            </h5>
          </div>

          <div
            style={{
              paddingRight: "20px",
              paddingLeft: "20px",
              // marginTop: "-19px",
            }}
          >
            <div
              className="d-flex mt-2 "
              style={{ justifyContent: "space-between" }}
            >
              <div>
                <b>FATHER'S NAME- {student.fatherName}</b>
              </div>
              <div>
                <b>ATTENDENCE- {result?.attendence}</b>
              </div>
            </div>

            <div
              className="d-flex mt-2 "
              style={{ justifyContent: "space-between" }}
            >
              <div>
                <b>STUDENT NAME- {student.fullName}</b>
              </div>
              <div>
                <b>
                  CLASS- {student.className} {student.section}
                </b>
              </div>
              <div>
                {" "}
                <b>ROLL- {student.rollNo}</b>
              </div>
            </div>
          </div>

          <hr />

          <table
            className="table table-hover  table-bordered table-responsive"
            style={{ border: "2px solid black" }}
          >
            <thead>
              <tr>
                <th scope="col">SN</th>
                <th scope="col">Subject</th>
                <th scope="col">Grade</th>
                <th scope="col">GPA</th>
              </tr>
            </thead>

            <tbody>
              {subjects.map((s, i) => {
                return (
                  <tr key={s.id}>
                    <th>{i + 1}</th>
                    <th>{s.subjectName}</th>
                    <th>{getGrade(s, result)}</th>
                    <th>{getGpa(s, result)}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div
            className="d-flex align-items-center"
            style={{
              justifyContent: "space-between",
              paddingRight: "10px",
              paddingLeft: "10px",
            }}
          >
            <div
              style={{ color: "blue", fontWeight: 500 }}
              className="terminal-text"
            >
              GRADE AVERAGE POINT (GPA):{getOverallGpa(sum, subjects)}
              {}
            </div>
            <div>
              <img
                src={CircleLogo}
                style={{
                  height: "100px",
                  width: "100px",
                  objectFit: "contain",
                }}
                alt="Circular Logo"
                className="mb-3"
              />
            </div>
            <div>
              <div
                style={{ color: "blue", fontWeight: 500 }}
                className="terminal-text"
              >
                GRADE: {getOverallGrade(sum, subjects)}
              </div>
            </div>
          </div>
          <div
            style={{
              color: "blue",
              fontWeight: 500,
              paddingRight: "10px",
              paddingLeft: "10px",
            }}
            className="terminal-text"
          >
            Remarks: {getRemarks(getOverallGrade(sum, subjects))}
          </div>

          <hr />
          <div
            style={{
              paddingRight: "20px",
              paddingLeft: "20px",
              marginTop: "-10px",
            }}
          >
            <p>
              <b>Grading System:</b>
            </p>
            <div
              className="d-flex"
              style={{ justifyContent: "space-between", marginTop: "-20px" }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span>90-99.9= A+ or 4</span>
                <span>60-69.9=B or 2.8</span>
                <span>20-39.9=D or 1.6</span>
                <span>40-49.9=C or 2.0</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span>80-89.9=A or 3.6</span>
                <span>50-59.9=C+ or 2.4</span>
                <span>1.19.9=E or 1.2</span>
                <span>20-39.9=D or 1.6</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span>70-79.9=B+ or 3.2</span>
                <span>40-49.9=C or 2.0</span>
                <span>50-59.9=C+ or 2.4</span>
                <span>1-19.9=E or 1.2</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="d-flex align-items-center container-verify"
          style={{
            justifyContent: "space-between",
            paddingRight: "20px",
            paddingLeft: "20px",
          }}
        >
          <div>
            <span>-------------------</span>
            <div>Prepared By</div>
          </div>
          <div>
            <span>-------------------</span>
            <div>Principal Sign</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;

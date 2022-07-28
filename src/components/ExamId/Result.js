import React, { useRef } from "react";

import CircleLogo from "../../assets/img/CircleLogo.png";
import LargeLogo from "../../assets/img/RectangleLogo.png";
import ReactToPrint from "react-to-print";
import { getTotalOfSubject, Gpa, grade } from "../../utils/result";

const Result = ({ student, result, exam }) => {
  const ref = useRef();

  const values = Object.values(result);
  const sum = values.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

  console.log(sum);

  var tifOptions = Object.keys(result).map(function (key, i) {
    return (
      <tr key={key}>
        <th>{i + 1}</th>
        <th>{key}</th>
        <th>{grade(result[key], getTotalOfSubject(key))}</th>
        <th>{Gpa(result[key], getTotalOfSubject(key))}</th>
      </tr>
    );
  });

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
        className="container mt-5"
        ref={ref}
        style={{
          paddingRight: "10px",
          paddingLeft: "10px",
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
            <img
              src={LargeLogo}
              alt="Large Logo"
              style={{ maxWidth: "250px", objectFit: "contain" }}
            />
          </div>
          <div className="d-flex justify-content-center flex-nowrap terminal-text">
            <h5>
              {exam?.examName} {exam?.examYear}
            </h5>
          </div>

          <div>
            <b>Father's Name- {student.fatherName}</b>
          </div>
          <div
            className="d-flex mt-2 "
            style={{ justifyContent: "space-between" }}
          >
            <div>
              <b>Stu Name- {student.fullName}</b>
            </div>
            <div>
              <b>
                Class- {student.className} {student.section}
              </b>
            </div>
            <div>
              {" "}
              <b>Roll No- {student.rollNo}</b>
            </div>
          </div>
          <hr />
          <div className="container mt-1">
            <p>
              <b>Grading System:</b>
            </p>
            <div
              className="d-flex"
              style={{ marginTop: "-10px", justifyContent: "space-between" }}
            >
              <div className="">90-99.9= A+ or 4</div>
              <div className="">80-89.9=A or 3.6 </div>
              <div className=""> 70-79.9=B+ or 3.2</div>
            </div>

            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div>60-69.9=B or 2.8</div>
              <div>50-59.9=C+ or 2.4</div>
              <div>40-49.9=C or 2.0 </div>
            </div>

            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div> 20-39.9=D or 1.6</div>
              <div>1.19.9=E or 1.2</div>
              <div>50-59.9=C+ or 2.4</div>
            </div>

            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div>40-49.9=C or 2.0 </div>
              <div> 20-39.9=D or 1.6</div>
              <div>1.19.9=E or 1.2</div>
            </div>
          </div>

          <div style={{ marginTop: "-35px" }}>
            <table
              className="table table-hover mt-5 table-bordered table-responsive"
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
              <tbody>{tifOptions}</tbody>
            </table>
          </div>

          <div
            className="d-flex align-items-center"
            style={{ justifyContent: "space-between" }}
          >
            <div
              style={{ color: "blue", fontWeight: 500 }}
              className="terminal-text"
            >
              GRADE AVERAGE POINT (GPA):{" "}
              {Gpa(
                sum,
                getTotalOfSubject(`${student.className} ${student.section}`)
              )}
            </div>
            <div>
              <div
                style={{ color: "blue", fontWeight: 500 }}
                className="terminal-text"
              >
                GRADE:{" "}
                {grade(
                  sum,
                  getTotalOfSubject(`${student.className} ${student.section}`)
                )}
              </div>
            </div>
          </div>
          <hr />

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
              <img
                src={CircleLogo}
                style={{
                  height: "100px",
                  width: "100px",
                  objectFit: "contain",
                }}
                alt="Circular Logo"
                className="mb-1"
              />
            </div>
            <div>
              <span>-------------------</span>
              <div>Principal Sign</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;

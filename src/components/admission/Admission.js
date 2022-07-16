import React, { useState } from "react";
// import RectLogo from "../../assets/img/RectangleLogo.png";

const Admission = () => {
  const [guardain, setGuardain] = useState("");
  const [district, setDistrict] = useState("");
  const [vdc, setVdc] = useState("");
  //   const [ward, setWard] = useState("");
  const [gender, setGender] = useState(1);
  const [grade, setGrade] = useState("");

  return (
    <div className="container">
      <div className="row">
        <div
          className="col-md-12"
          style={{
            border: "2px solid #0B3B5F",
          }}
        >
          {/* <img
            src={RectLogo}
            height="250"
            width={300}
            alt="School Management System"
          /> */}
          Image here
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6">
          <div className="mt-4">To, The Principal,</div>
          <div className="mt-1">Panchashil Pathshala</div>
          <div>Chandrapur-4 Rautahat</div>
        </div>
        <div className="col-md-6">
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }} />
            <div
              style={{
                height: "150px",
                width: "150px",
                border: "2px solid black",
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h3 style={{ textDecoration: "underline" }}>
            Application For School Admission {new Date().getFullYear()}
          </h3>
        </div>
        <div className="col-md-3"></div>
      </div>

      <div className="row">
        <div>
          Sir, I Mr./Mrs.{" "}
          <input
            type="text"
            value={guardain}
            onChange={(e) => setGuardain(e.target.value)}
          />{" "}
          an inhabitant of{" "}
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />{" "}
          district,{" "}
          <input
            type="text"
            value={vdc}
            onChange={(e) => setVdc(e.target.value)}
          />{" "}
          VDC/ Municipality ward no <input /> would like to admit my{" "}
          <select
            className="mt-1"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value={1}>son</option>
            <option value={2}>daughter</option>
          </select>{" "}
          in your school grade{" "}
          <input
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="mt-2"
          />
          . I will bear all the responsibility of good guardains. If not, I am
          ready to go under the action against me.
        </div>
      </div>

      <hr />
    </div>
  );
};

export default Admission;

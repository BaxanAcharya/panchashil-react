import styled from "@emotion/styled";
import { Button, Collapse } from "@mui/material";
import React, { useRef, useState } from "react";
import NepaliDate from "nepali-date-converter";
import Logo from "../../../assets/img/CircleLogo.png";
import ReactToPrint from "react-to-print";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <div {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
}));

const nepaliDate = new NepaliDate();

const ViewAdmitCard = ({ classes }) => {
  const [expanded, setExpanded] = useState(false);
  const printRef = useRef();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <Button
          variant="outlined"
          color="secondary"
          disabled={classes.length === 0}
        >
          View Admit Cards
        </Button>
      </ExpandMore>

      <Collapse in={expanded} timeout="auto" unmountOnExit className="mt-3">
        <ReactToPrint
          trigger={() => (
            <Button
              variant="outlined"
              color="success"
              disabled={classes.length === 0}
            >
              Print
            </Button>
          )}
          content={() => printRef.current}
          copyStyles={true}
          documentTitle={`Admit-card-class-${
            classes[0]?.data?.className
          }-${nepaliDate.getYear()}`}
          onPrintError={() =>
            alert("Some thing went worng. Cannot print the invoice")
          }
        />

        <hr />

        <div className="row" ref={printRef}>
          {classes.map((singleClass) => {
            return (
              <div className="col-md-6 " key={singleClass.id}>
                <div
                  style={{
                    border: "1px solid black",
                    margin: "10px",
                    padding: "11px",
                  }}
                >
                  <div style={{ color: "#00B150" }}>
                    <h2 className="text-center">PANCHASHIL PATHSHALA</h2>
                    <p className="text-center" style={{ marginTop: "-5px" }}>
                      Email: panchashilpathshala@gmail.com
                    </p>
                    <p className="text-center" style={{ marginTop: "-10px" }}>
                      Terminal Examination {nepaliDate.getYear()}
                    </p>
                    <p className="text-center" style={{ marginTop: "-10px" }}>
                      <b>Admit Card</b>
                    </p>
                    <div>
                      <img
                        src={Logo}
                        width={90}
                        height={90}
                        alt="Logo of panchashil"
                        style={{ marginTop: "-230px" }}
                      />
                    </div>
                  </div>
                  <span> Name : {singleClass.data?.fullName}</span>
                  <div style={{ display: "flex", marginTop: "15px" }}>
                    <div style={{ flex: 1 }}>
                      Class :{" "}
                      <span style={{ textTransform: "capitalize" }}>
                        {singleClass.data?.className}{" "}
                      </span>
                    </div>

                    <div>
                      Roll No. :
                      {singleClass.data.rollNo
                        ? ` ${singleClass.data.rollNo}`
                        : " --"}
                    </div>
                  </div>

                  <div style={{ display: "flex", marginTop: "15px" }}>
                    <div style={{ flex: 1 }}>
                      Date : {nepaliDate.getYear()}/{nepaliDate.getMonth() + 1}/
                      {nepaliDate.getDate()}
                    </div>
                    <div>
                      <p>------------------</p>
                      <div style={{ marginTop: "-15px", marginLeft: "20px" }}>
                        Principal
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Collapse>
    </div>
  );
};

export default ViewAdmitCard;

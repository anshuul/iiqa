import React from "react";

const colors = ["blue", "teal", "red", "green", "orange"];
const Classes = (props) => {
  const defaultClassName = "child lighten-2";
  const randomize = () => {
    return colors[Math.floor(Math.random() * 5)];
  };
  const finalClassName = `${defaultClassName} ${randomize()}`;
  return (
    <center>
      <div
        className="parent"
        style={{
          height: "250px",
          width: "190px",
          border: "1px solid grey",
          boxShadow: "10px 10px 10px grey",
          marginTop: "10px",
          marginLeft: "10px",
          borderRadius: "10px",
        }}
      >
        <div
          className={finalClassName}
          style={{
            margin: "0px",
            height: "80px",
            borderRadius: "10px 10px 0px 0px",
          }}
        >
          <p style={{ margin: "0px", paddingTop: "5px", paddingLeft: "5px" }}>
            {props.classroom.title}
          </p>
        </div>
      </div>
    </center>
  );
};

export default Classes;

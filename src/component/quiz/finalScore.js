import React from "react";
import "./finalScore.css";

const finalScore = (props) => {
  const buttonHandler = () => {
    props.history.push("/classroom");
  };
  return (
    <div className="finalScore">
      <p>yayyy!! You scored 7/10</p>
      <div
        onClick={buttonHandler}
        className="green darken-2 btn-flat btn-large homeButton"
        style={{
          color: "white",
          borderRadius: "20px",
          marginTop: "2%",
          minWidth: "8%",
          fontSize: 20,
          cursor: "pointer",
        }}
      >
        Go Back
      </div>
    </div>
  );
};

export default finalScore;

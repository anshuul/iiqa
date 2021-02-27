import React from "react";
import Dog from "../../assets/dog.jpg";

const FinalizeQuizModules = (props) => {
  return (
    <div
      className="quizMain"
      style={{
        height: "250px",
        width: "230px",
        border: "1px solid #d3d3d3",
        marginLeft: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxShadow: "5px 5px 5px #d3d3d3",
        borderRadius: "10px",
        marginTop: "10px",
      }}
    >
      <center>
        <div className="image">
          <img src={props.image} alt="" height="100" width="100" />
        </div>
      </center>

      <p className="textClass">{props.question}</p>

      <p className="textClass">
        <strong>Correct Answer: </strong> {props.answer}
      </p>
      <p className="textClass">
        <strong>Other Options: </strong> {props.otherOptions[0]},
        {props.otherOptions[1]},{props.otherOptions[2]}
      </p>
    </div>
  );
};

export default FinalizeQuizModules;

import React from "react";
import Dog from "../../assets/dog.jpg";

const FinalizeQuizModules = (props) => {
  return (
    <div
      className="quizMain"
      style={{
        height: "40%",
        width: "30%",
        minWidth:'230px',
        border: "1px solid #d3d3d3",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems:'center',
        boxShadow: "5px 5px 5px #d3d3d3",
        borderRadius: "10px",
        padding:'20px 0',
        marginTop: "10px",
      }}
    >
      <div className="image">
        <img src={props.image} alt="" height="250" width="200" />
      </div>

      <div>
        <p className="textClass center">{props.question}</p>

        <p className="textClass center">
          <strong>Correct Answer: </strong> {props.answer}
        </p>
        <p className="textClass center">
          <strong>Other Options: </strong> {props.otherOptions[0]}, 
          {props.otherOptions[1]}, {props.otherOptions[2]}
        </p>
      </div>
    </div>
  );
};

export default FinalizeQuizModules;

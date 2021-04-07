import React from "react";
import Dog from "../../assets/dog.jpg";
import { getHeightForMainContainer } from "../../shared/utils";

const FinalizeQuizModules = (props) => {
  const colors = ["red", "blue", "orange", "green", "yellow"];
  const randomize = () => {
    return colors[Math.floor(Math.random() * 5)];
  };

  return (
    <div
      className="quizMain "
      style={{
        // height: "40%",
        width: "60%",
        minWidth: "280px",
        border: "1px solid #d3d3d3",
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        boxShadow: `5px 5px 5px #d3d3d3`,
        borderRadius: "10px",
        padding: "20px 10px",
        marginBottom: "25px",
        marginRight: "15px",
        backgroundColor: "#f0f8ff",
      }}
    >
      <div className="image">
        <img src={props.image} alt="" height="200" width="200" />
      </div>

      <div>
        <p className="textClass ">
          <strong>Question :</strong> {props.question}
        </p>

        <p className="textClass">
          <ol type="a">
            {props.otherOptions.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ol>
        </p>

        <p className="textClass ">
          <strong>Correct Answer: </strong> {props.answer}
        </p>
      </div>
    </div>
  );
};

export default FinalizeQuizModules;

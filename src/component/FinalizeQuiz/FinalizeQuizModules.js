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
      className="finalizeQuizModules"
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

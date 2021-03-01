import React from "react";
import "./FinalScore.css";
import { saveQuizScore } from '../../services/quizServices'

const FinalScore = (props) => {
  console.log(props)
  const buttonHandler = () => {
    const { classroomDocId, studentDocId, quizDocId } = props.location.state
    console.log(props.location.state)
    saveQuizScore(classroomDocId, quizDocId, studentDocId, props.score, props.outOff)
    .then(message => {
      alert(message)
      localStorage.removeItem("quizToken");
      props.history.goBack();
    })
    .catch(err => {
      alert(err.message)
    })
  };
  return (
    <div className="finalScore">
      <p>
        yayyy!! You scored {props.score}/{props.outOff}
      </p>
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

export default FinalScore;

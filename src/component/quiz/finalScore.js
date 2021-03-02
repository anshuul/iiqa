import React, { useState, useEffect } from "react";
import "./finalScore.css";
import { saveQuizScore } from "../../services/quizServices";

const FinalScore = (props) => {
  const [bgImage, setBgImage] = useState();

  const loadAsyncBGImage = () => {
    return new Promise((resolve, reject) => {
      resolve(require("../../assets/score.jpg"));
    });
  };

  useEffect(() => {
    loadAsyncBGImage().then((bgImage) => {
      setBgImage(bgImage);
    });
  }, []);

  console.log(props);
  const buttonHandler = () => {
    const { classroomDocId, studentDocId, quizDocId } = props.location.state;
    console.log(props.location.state);
    if (classroomDocId && studentDocId && quizDocId) {
      saveQuizScore(
        classroomDocId,
        quizDocId,
        studentDocId,
        props.score,
        props.outOff
      )
        .then((message) => {
          alert(message);
          localStorage.removeItem("quizToken");
          props.history.goBack();
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      localStorage.removeItem("quizToken");
      props.history.goBack();
    }
  };
  return (
    <div className="finalScore" style={{ backgroundImage: { bgImage } }}>
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

import React, { useState, useEffect } from "react";
import "./FinalScore.css";
import { saveQuizScore } from "../../services/quizServices";

const FinalScore = (props) => {
  const [bgImage, setBgImage] = useState();
  const [isScoreSaved, setIsScoreSaved] = useState(false);

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

  useEffect(() => {
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
          setIsScoreSaved(true);
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      setIsScoreSaved(true);
    }
  }, []);

  const buttonHandler = () => {
    if (isScoreSaved) {
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

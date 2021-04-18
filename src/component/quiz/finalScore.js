import React, { useState, useEffect } from "react";
import "./finalScore.css";
import { saveQuizScore } from "../../services/quizServices";
import { getHeightForMainContainer } from '../../shared/utils'
import { AuthContext } from '../../context/authContext'

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
          console.log(message);
          this.props.successOpenHandler(message)
          setIsScoreSaved(true);
        })
        .catch((err) => {
          console.log(err.message);
          this.props.errorOpenHandler('Failed to save your score.')
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
    <div className="finalScore" style={{ height:getHeightForMainContainer() }}>
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
      <p>
        yayyy!! You scored {props.score}/{props.outOff}
      </p>
    </div>
  );
};

export default function ComponentWithContext(props){
  return (
      <AuthContext.Consumer>
          {({ currentUser, setCurrentUser, errorOpenHandler, successOpenHandler }) => (
          <FinalScore
              {...props}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              errorOpenHandler={errorOpenHandler}
              successOpenHandler={successOpenHandler}
          />
          )}
      </AuthContext.Consumer>
  )
}

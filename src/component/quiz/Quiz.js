import React, { useState, useEffect } from "react";
import "./Quiz.css";
import FinalScore from "./finalScore";
import Speech from "react-speech";
import { decryptInformationAfterRouting } from "../../services/classroomServices";
import { saveQuizScore } from "../../services/quizServices";
import { textToSpeech } from "../../shared/utils";
import volumeIcon from "../../assets/volume.svg";

function Quiz(props) {
  const [quizData, setQuizData] = useState();
  // const [currentQuestionSet, setCurrentQuestionSet] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    console.log(props);
    // logic to prevent refreshing of quiz
    if (localStorage.getItem("quizToken")) {
      // incase of quiz from dashboard, quizId can be retrieved. So On refresh object for that quizId will be retried and score will be updated and saved/
      props.history.goBack();
      localStorage.removeItem("quizToken");
    } else {
      if (props.location.state.quizData) {
        localStorage.setItem("quizToken", "started");
        console.log(localStorage.getItem("quizToken"));
        setQuizData(props.location.state.quizData);
      } else {
        // get quiz data from quiz id in url
        // const { compoundedInfo } = props.match.params
        // const [ classroomDocId, quizDocId ] = decryptInformationAfterRouting(compoundedInfo)

        console.log("else block");
      }

      console.log("rendered");
      // setCurrentQuestionSet(quizData[currentQuestionIndex]);
    }
  }, []);

  useEffect(() => {
    console.log("quiz data updated");
    // setCurrentQuestionSet(quizData[currentQuestionIndex]);
  }, [quizData]);

  // useEffect(() => {
  //   if (quizData) {
  //     if (currentQuestionIndex === quizData.length) {
  //       setShowScore(true);
  //     }
  //   }
  // }, [currentQuestionIndex]);

  useEffect(() => {
    if (
      quizData &&
      currentQuestionIndex >= 0 &&
      currentQuestionIndex < quizData.length
    )
      textToSpeech(
        `For the above Image, Question is, ${processQuestion(
          quizData[currentQuestionIndex].question
        )}`
      );
  }, [currentQuestionIndex, quizData]);

  const onOptionPressHandler = (event, optionTitle) => {
    event.target.disabled = true;
    if (optionTitle === quizData[currentQuestionIndex].answer.correct_answer) {
      textToSpeech(`Your are right. Correct answer is ${optionTitle}`);
      setScore((score) => score + 1);
      event.target.className = "options green";
    } else {
      textToSpeech(
        `Your are wrong. Correct answer is ${quizData[currentQuestionIndex].answer.correct_answer}`
      );
      event.target.className = "options red";
    }
    setTimeout(() => {
      if (currentQuestionIndex + 1 === quizData.length) {
        setShowScore(true);
      } else {
        setCurrentQuestionIndex(
          (currentQuestionIndex) => currentQuestionIndex + 1
        );
      }
      event.target.className = "options";
    }, 5000);
  };

  const processQuestion = (questionText) => {
    let questionArr = questionText.trim().split(" ");
    if (questionArr[questionArr.length - 2] === "in") {
      questionArr[questionArr.length - 1] = "the image ?";
      return questionArr.join(" ");
    }
    return questionArr.join(" ");
  };

  return showScore ? (
    <FinalScore score={score} outOff={quizData.length} {...props} />
  ) : (
    <div className="quiz">
      {quizData && (
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            className="imageClass"
          >
            <img
              src={quizData[currentQuestionIndex].image_path}
              alt="quizimage"
              height="100%"
              // width="250"
              style={{ margin: "auto" }}
            />
          </div>

          <div className="questionClass">
            <p
              className="question"
              style={{ fontSize: "30px", textAlign: "center" }}
            >
              {processQuestion(quizData[currentQuestionIndex].question)}
            </p>
          </div>

          {quizData[currentQuestionIndex].answer && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
                flex: 1,
                alignContent: "space-evenly",
                width: "40%",
                height: "100%",
              }}
            >
              {quizData[currentQuestionIndex].answer.options.map(
                (optionTitle, index) => (
                  <div className="optionsContainer" key={index}>
                    <div
                      className="options font-quiz text-2xl"
                      onClick={(event) =>
                        onOptionPressHandler(event, optionTitle)
                      }
                    >
                      {optionTitle}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default React.memo(Quiz);

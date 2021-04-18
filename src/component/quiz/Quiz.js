import React, { useState, useEffect } from "react";
import "./Quiz.css";
import FinalScore from "./finalScore";
import Speech from "react-speech";
import { decryptInformationAfterRouting } from "../../services/classroomServices";
import { saveQuizScore, capitalizeQuizData } from "../../services/quizServices";
import { textToSpeech } from "../../shared/utils";
import volumeIcon from "../../assets/volume.svg";
import { getHeightForMainContainer } from '../../shared/utils'

function Quiz(props) {
  const [quizData, setQuizData] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [isOptionSelected, setIsOptionSelected] = useState(false)
  const [isImgLoaded, setIsImgLoaded] = useState(false)

  useEffect(() => {
    console.log(props);
    // setIsImgLoaded(false)
    // logic to prevent refreshing of quiz
    if (localStorage.getItem("quizToken")) {
      // incase of quiz from dashboard, quizId can be retrieved. So On refresh object for that quizId will be retried and score will be updated and saved/
      props.history.goBack();
      localStorage.removeItem("quizToken");
    } else {
      if (props.location.state.quizData) {
        localStorage.setItem("quizToken", "started");
        console.log(localStorage.getItem("quizToken"));
        setQuizData(capitalizeQuizData(props.location.state.quizData));
      } else {

        console.log("else block");
      }

      console.log("rendered");
    }

    const reset = () => setIsImgLoaded(false)

    return () => reset()
  }, []);

  useEffect(() => {
    console.log("quiz data updated");
  }, [quizData]);

  const onImageLoadHandler = () => {
    !isImgLoaded && setIsImgLoaded(true)
    textToSpeech(
      `For the above Image, Question is, ${processQuestion(
        quizData[currentQuestionIndex].question
      )}`
    );
    console.log(isImgLoaded)
  }

  useEffect(() => {
    if (
      quizData &&
      currentQuestionIndex >= 0 &&
      currentQuestionIndex < quizData.length
    )
    {  
      setIsOptionSelected(false)
      isImgLoaded && setIsImgLoaded(false)
    }
  }, [currentQuestionIndex, quizData]);

  const onOptionPressHandler = (event, optionTitle) => {
    if(isOptionSelected){
      return
    } else {
      setIsOptionSelected(true)
    }
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
    <div className="quiz" style={{height:getHeightForMainContainer()}}>
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
              width="100%"
              style={{ margin: "auto" }}
              onLoad={onImageLoadHandler}
            />
          </div>

          <div className="questionClass">
            {isImgLoaded && <p
              className="question"
              style={{ fontSize: "30px", textAlign: "center" }}
            >
              {processQuestion(quizData[currentQuestionIndex].question)}
            </p>}
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
              {isImgLoaded && quizData[currentQuestionIndex].answer.options.map(
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

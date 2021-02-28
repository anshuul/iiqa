import React, { useState, useEffect } from "react";
import "./Quiz.css";
import Dog from "../../assets/dog.jpg";
import FinalScore from "./FinalScore";
import Speech from "react-speech";

function Quiz(props) {
  const [quizData, setQuizData] = useState();
  // const [currentQuestionSet, setCurrentQuestionSet] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    console.log(props.location.state.quizData);
    // logic to prevent refreshing of quiz
    if (localStorage.getItem("quizToken")) {
      // incase of quiz from dashboard, quizId can be retrieved. So On refresh opbejct for that quizId will be retried and score will be updated and saved/
      props.history.push("/selflearn");
      localStorage.removeItem("quizToken");
    } else {
      localStorage.setItem("quizToken", "started");
      if (props.location.state.quizData) {
        setQuizData(props.location.state.quizData);
      } else {
        // get quiz data from quiz id in url
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

  useEffect(() => {
    if (quizData) {
      if (currentQuestionIndex === quizData.length) {
        setShowScore(true);
      }
    }
  }, [currentQuestionIndex]);

  const onOptionPressHandler = (event, optionTitle) => {
    if (optionTitle === quizData[currentQuestionIndex].answer.correct_answer) {
      setScore((score) => score + 1);
      event.target.className = "options green";
    } else {
      event.target.className = "options red";
    }
    setTimeout(() => {
      setCurrentQuestionIndex(
        (currentQuestionIndex) => currentQuestionIndex + 1
      );
      event.target.className = "options";
    }, 2000);
  };

  return showScore ? (
    <FinalScore score={score} outOff={quizData.length} />
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
            style={{
              backgroundImage: `url(${quizData[currentQuestionIndex].image_path})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            {/* <img
              src={currentQuestionSet.image_path}
              alt="image"
              height="230"
              width="250"
              style={{ margin: "auto" }}
            /> */}
          </div>

          <div className="questionClass">
            <p
              className="question"
              style={{ fontSize: "30px", textAlign: "center" }}
            >
              {quizData[currentQuestionIndex].question}
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
                      className="options"
                      onClick={(event) =>
                        onOptionPressHandler(event, optionTitle)
                      }
                    >
                      <p
                        className="font-quiz text-2xl"
                        style={{ fontSize: "20px", width: "100%" }}
                      >
                        {optionTitle}
                      </p>
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

export default Quiz;

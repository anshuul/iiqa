import React, { Component } from "react";
import Dog from "../../assets/dog.jpg";
import FinalizeQuizModules from "./FinalizeQuizModules";
import "./FinalizeQuiz.css";

class FinalizeQuiz extends Component {
  state = {
    quiz: [
      {
        questionId: "1",
        image: Dog,
        question: "What is the animal in the image?",
        answer: "dog",
        otherOptions: ["cat", "lion", "elephant"],
      },
      {
        questionId: "1",
        image: Dog,
        question: "What is the animal in the image?",
        answer: "dog",
        otherOptions: ["cat", "lion", "elephant"],
      },
      {
        questionId: "1",
        image: Dog,
        question: "What is the animal in the image?",
        answer: "dog",
        otherOptions: ["cat", "lion", "elephant"],
      },
      {
        questionId: "1",
        image: Dog,
        question: "What is the animal in the image?",
        answer: "dog",
        otherOptions: ["cat", "lion", "elephant"],
      },
      {
        questionId: "1",
        image: Dog,
        question: "What is the animal in the image?",
        answer: "dog",
        otherOptions: ["cat", "lion", "elephant"],
      },
      {
        questionId: "1",
        image: Dog,
        question: "What is the animal in the image?",
        answer: "dog",
        otherOptions: ["cat", "lion", "elephant"],
      },
      {
        questionId: "1",
        image: Dog,
        question: "What is the animal in the image?",
        answer: "dog",
        otherOptions: ["cat", "lion", "elephant"],
      },
    ],
  };
  render() {
    return (
      <div className="container">
        <h4>This is finalize quiz!</h4>
        <div className="finalizeQuiz">
          {this.state.quiz.map((quiz) => {
            return (
              <FinalizeQuizModules
                key={quiz.questionId}
                image={quiz.image}
                question={quiz.question}
                answer={quiz.answer}
                otherOptions={quiz.otherOptions}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default FinalizeQuiz;

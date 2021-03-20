import React, { Component } from "react";
import Dog from "../../assets/dog.jpg";
import FinalizeQuizModules from "./FinalizeQuizModules";
import "./FinalizeQuiz.css";
import { decryptInformationAfterRouting } from '../../services/classroomServices'
import { getGeneratedQuiz } from '../../services/quizServices'

class FinalizeQuiz extends Component {
  state = {
    dateTimeOfCreation:'',
    quizData: [],
  };

  componentDidMount(){
    const{ classroomDocId, quizDocId } = this.props.location.state
    console.log(classroomDocId, quizDocId)
    getGeneratedQuiz(classroomDocId, quizDocId)
    .then(quizDataResp => {
      const { quizData, dateTimeOfCreation } = quizDataResp
      this.setState({...this.state, quizData, dateTimeOfCreation})
    })
    .catch(err => {
      console.error(err)
    })
  }

  render() {
    return (
      <div className="container">
        <h4>This the Quiz generated</h4>
        <p style={{color:'lightgrey'}}>{this.state.dateTimeOfCreation}</p>
        <div className="finalizeQuiz">
          {this.state.quizData.map((quiz, index) => {
            return (
              <FinalizeQuizModules
                key={index}
                image={quiz.image_path}
                question={quiz.question}
                answer={quiz.answer.correct_answer}
                otherOptions={quiz.answer.options}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default FinalizeQuiz;

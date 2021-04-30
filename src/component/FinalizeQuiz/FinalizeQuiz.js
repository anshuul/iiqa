import React, { Component } from "react";
import Dog from "../../assets/dog.jpg";
import FinalizeQuizModules from "./FinalizeQuizModules";
import "./FinalizeQuiz.css";
import { decryptInformationAfterRouting } from "../../services/classroomServices";
import { getGeneratedQuiz } from "../../services/quizServices";
import { getHeightForMainContainer } from "../../shared/utils";
import { AuthContext, contextWrapper } from '../../context/authContext'

class FinalizeQuiz extends Component {
  state = {
    dateTimeOfCreation: "",
    quizData: [],
    quizName: '',
  };

  componentDidMount() {
    const { classroomDocId, quizDocId } = this.props.location.state;
    console.log(classroomDocId, quizDocId);
    getGeneratedQuiz(classroomDocId, quizDocId)
      .then((quizDataResp) => {
        console.log(quizDataResp)
        const { quizData, dateTimeOfCreation, quizName } = quizDataResp;
        this.setState({ ...this.state, quizData, dateTimeOfCreation, quizName });
      })
      .catch((err) => {
        console.error(err);
        this.props.errorOpenHandler('Failed to get you generated quiz.')
      });
  }

  render() {
    return (
      <div style={{ height: getHeightForMainContainer() }}>
        <div className="container center-align">
          <h4>This your generated Quiz {this.state.quizName && `- ${this.state.quizName}`}</h4>
          <p style={{ color: "lightgrey" }}>{this.state.dateTimeOfCreation}</p>
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
      </div>
    );
  }
}

// export default FinalizeQuiz;

export default contextWrapper(FinalizeQuiz)

// export default function ComponentWithContext(props){
//   return (
//       <AuthContext.Consumer>
//           {({ currentUser, setCurrentUser, errorOpenHandler, successOpenHandler }) => (
//           <FinalizeQuiz
//               {...props}
//               currentUser={currentUser}
//               setCurrentUser={setCurrentUser}
//               errorOpenHandler={errorOpenHandler}
//               successOpenHandler={successOpenHandler}
//           />
//           )}
//       </AuthContext.Consumer>
//   )
// }
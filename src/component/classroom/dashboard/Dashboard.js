import React, { Component } from "react";
import StudentDetails from "./StudentDetails";
import Activities from "./Activities";
import "./Dashboard.css";
import Avatar from "../../../assets/dp.svg";
import {
  encryptInformationForRouting,
  decryptInformationAfterRouting,
  getClassroomData,
} from "../../../services/classroomServices";
import {
  getProfileDataFromDocId,
  getOnlyUserProfile,
} from "../../../services/userServices";
import {
  getQuizzesForClassroom,
  getFilteredActivitiesAccToStudent,
  isStudentEligibleForQuiz,
} from "../../../services/quizServices";
import Loading from "../../layout/Loading";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import Score from "../../scores/scores";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      teacherName: "",
      studentsNameList: [],
      classroomData: {
        title: "",
        displayPicture: "",
        color: "",
        code: "",
      },
      quizActivities: [],
      classroomLoading: false,
      activitiesLoading: false,
      studentsListLoading: false,
      isScoreDisplayed: false,
      selectedQuizActivityDocId: "",
    };
    this.onSelectActivityByStudentHandler = this.onSelectActivityByStudentHandler.bind(
      this
    );
    this.onSelectActivityByTeacherHandler = this.onSelectActivityByTeacherHandler.bind(
      this
    );
    this.onSelectCreateQuizHandler = this.onSelectCreateQuizHandler.bind(this)
  }

  onSelectActivityByStudentHandler = (quizData, quizDocId) => {
    const decryptedQuizData = JSON.parse(quizData);
    console.log(decryptedQuizData);
    isStudentEligibleForQuiz(
      this.state.classroomData.code,
      quizDocId,
      this.props.currentUser.docId
    ).then((isStudentEligible) => {
      if (isStudentEligible) {
        console.log(isStudentEligible);
        this.props.history.push({
          pathname: "/quiz",
          state: {
            quizData: decryptedQuizData,
            quizDocId,
            classroomDocId: this.state.classroomData.code,
            studentDocId: this.props.currentUser.docId,
          },
        });
      } else {
        alert(
          "You are not eligible for the quiz. As you already attended this quiz."
        );
      }
    });
  };

  onSelectActivityByTeacherHandler = (_, quizDocId) => {
    this.setState({
      ...this.state,
      isScoreDisplayed: true,
      selectedQuizActivityDocId: quizDocId,
    });
  };

  onSelectCreateQuizHandler(){
    this.props.history.push({
      pathname: '/set-up-quiz',
      state:{
        classroomDocId: this.props.location.state.classroomDocId
      }
    })
  }

  componentDidMount() {
    localStorage.removeItem("quizToken");
    window.speechSynthesis.cancel()
    // this.loadUserData();
    console.log(this.props)
    const { classroomDocId } = this.props.location.state
    this.setState({ ...this.state, classroomLoading: true });
    getClassroomData(classroomDocId)
      .then((data) => {
        console.log(data)
        const { name: title, displayPicture, color, studentDataList, teacherData } = data;
        const studentsNameList = studentDataList.map((eachData) => {
          return {
            name: `${eachData.fname} ${eachData.lname}`,
            id: eachData.docId,
          };
        });
        this.setState({
          ...this.state,
          classroomData: { title, displayPicture, color, code: classroomDocId },
          teacherName: `${teacherData.fname} ${teacherData.lname}`,
          studentsNameList,
        });
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        this.setState({ ...this.state, classroomLoading: false });
      });

    getQuizzesForClassroom(classroomDocId)
      .then((quizActivitiesData) => {
        console.log(quizActivitiesData);
        this.setState({ ...this.state, quizActivities: quizActivitiesData });
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  render() {
    return (
      <div className="dashboard container" style={{ height: "93vh" }}>
        {this.state.classroomLoading && (
          <Loading message="Getting Classroom Dashboard Ready. Please wait." />
        )}
        {this.state.isScoreDisplayed && (
          <Score
            classroomDocId={this.state.classroomData.code}
            selectedActivityDocId={this.state.selectedQuizActivityDocId}
            history={this.props.history}
            cancelHandler={() =>
              this.setState({ ...this.state, isScoreDisplayed: false })
            }
          />
        )}
        <div className="row">
          <div
            className={`col s12 m12 ${this.state.classroomData.color} lighten-2`}
            style={{
              border: "1px solid lightgrey",
              marginTop: "20px",
              height: "200px",
              borderRadius: "15px",
              boxShadow: "10px 10px 10px #d3d3d3",
            }}
          >
            <div className="content">
              <div className="left" style={{width:'30%',minWidth:'200px'}}>
                <div className="classroom">
                  <p
                    style={{
                      fontSize: "30px",
                      paddingTop: "20px",
                      paddingLeft: "10px",
                      color: "white",
                    }}
                  >
                    {this.state.classroomData.title}
                  </p>
                </div>

                <div className="teacherclass ">
                  <p
                    style={{
                      fontSize: "20px",
                      paddingTop: "10px",
                      paddingLeft: "10px",
                      color: "white",
                    }}
                  >
                    Teacher : {this.state.teacherName}
                  </p>
                </div>
                <div className="teacherclass ">
                  <p
                    style={{
                      fontSize: "15px",
                      paddingTop: "10px",
                      paddingLeft: "10px",
                      color: "white",
                    }}
                  >
                    Code :{" "}
                    <span
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      {this.state.classroomData.code}
                    </span>
                  </p>
                </div>
              </div>
              <div
                className="imageclass right"
              >
                <img
                  id='image'
                  src={this.state.classroomData.displayPicture}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        {this.props.currentUser.isTeacher && (
          <div className="row">
            <div
              className="col s12 m12"
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                height: "100px",
              }}
            >
              <div
                onClick={this.onSelectCreateQuizHandler}
                className="blue darken-2 btn-flat btn-large quiz-button"
                style={{
                  color: "white",
                  borderRadius: "20px",
                  minWidth: "45%",
                  fontSize: "20px",
                  margin: "auto",
                  padding: "0px",
                }}
              >
                Create Quiz
              </div>
            </div>
          </div>
        )}
        <div className="row" style={{ height: "70%" }}>
          <div
            className="col s12 m8 "
            style={{
              border: "1px solid lightgrey",
              marginTop: "20px",
              borderRadius: "15px",
              boxShadow: "10px 10px 10px #d3d3d3",
              height: "80%",
            }}
          >
            <h5 className="center">Activities</h5>
            <div
              className="center student-details"
              style={{
                paddingTop: "5px",
                overflowX: "hidden",
                overflowY: "auto",
                height: "80%",
              }}
            >
              <Activities
                activities={this.state.quizActivities}
                classroomDocId={this.state.classroomData.code}
                onClickActivityHandler={
                  this.props.currentUser.isStudent
                    ? this.onSelectActivityByStudentHandler
                    : this.onSelectActivityByTeacherHandler
                }
              />
            </div>
          </div>
          <div
            className="col s12 m3 offset-m1"
            style={{
              border: "1px solid lightgrey",
              marginTop: "20px",
              borderRadius: "15px",
              boxShadow: "10px 10px 10px #d3d3d3",
              height: "80%",
            }}
          >
            <h5 className="center">Student Names</h5>
            <div
              className="center student-details"
              style={{
                paddingTop: "5px",
                overflowX: "hidden",
                overflowY: "auto",
                height: "80%",
              }}
            >
              <StudentDetails studentsNameList={this.state.studentsNameList} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default function ComponentWithContext(props) {
  return (
    <AuthContext.Consumer>
      {({ currentUser }) => <Dashboard currentUser={currentUser} {...props} />}
    </AuthContext.Consumer>
  );
}

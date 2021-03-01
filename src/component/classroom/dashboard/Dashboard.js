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
import { getQuizzesForClassroom, getFilteredActivitiesAccToStudent, isStudentEligibleForQuiz } from '../../../services/quizServices'
import Loading from "../../layout/Loading";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import Score from '../../scores/scores'

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
      quizActivities:[],
      classroomLoading: false,
      activitiesLoading: false,
      studentsListLoading: false,
      isScoreDisplayed:false,
      selectedQuizActivityDocId:'',
    };
    this.onSelectActivityByStudentHandler = this.onSelectActivityByStudentHandler.bind(this)
    this.onSelectActivityByTeacherHandler = this.onSelectActivityByTeacherHandler.bind(this)
  }

  loadStudentsList(studentIdsList) {
    const promisesForGeneratingStudentsData = studentIdsList.map((docId) =>
      getProfileDataFromDocId(docId)
    );
    return Promise.all(promisesForGeneratingStudentsData);
  }

  loadClassroomDataAsync(teacherId, studentIds) {
    return Promise.all([
      getProfileDataFromDocId(teacherId),
      this.loadStudentsList(studentIds),
    ]);
  }

  loadUserData() {
    getOnlyUserProfile(this.props.currentUser.uid)
      .then((userData) => {
        this.setState({ ...this.state, userData });
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  onSelectActivityByStudentHandler = (quizData, quizDocId) => {
    const decryptedQuizData = JSON.parse(quizData)
    console.log(decryptedQuizData)
    isStudentEligibleForQuiz(this.state.classroomData.code, quizDocId, this.state.userData.docId)
    .then(isStudentEligible => {
      if(isStudentEligible){
        console.log(isStudentEligible)
        this.props.history.push({
          pathname: "/quiz",
          state: { 
            quizData: decryptedQuizData,
            quizDocId,
            classroomDocId: this.state.classroomData.code,
            studentDocId: this.state.userData.docId,
          },
        });
      }
      else {
        alert('You are not eligible for the quiz. As you already attended this quiz.')
      }
    })
  }

  onSelectActivityByTeacherHandler = (_, quizDocId) => {
    this.setState({...this.state, isScoreDisplayed:true, selectedQuizActivityDocId:quizDocId})
  }

  componentDidMount() {
    this.loadUserData();
    const { compoundedInfo } = this.props.match.params;
    const [ogDocId, ogTeacherId] = decryptInformationAfterRouting(
      compoundedInfo
    );
    console.log(ogDocId, ogTeacherId);
    this.setState({ ...this.state, classroomLoading: true });
    getClassroomData(ogDocId)
      .then((data) => {
        const { name: title, displayPicture, color } = data;
        this.setState({
          ...this.state,
          classroomData: { title, displayPicture, color, code: ogDocId },
        });
        console.log(data);
        return this.loadClassroomDataAsync(data.teacherId, data.studentIds);
      })
      .then((dataList) => {
        console.log(dataList);
        const [teacherData, studentsDataList] = dataList;
        const studentsNameList = studentsDataList.map((eachData) => {
          return {
            name: `${eachData.fname} ${eachData.lname}`,
            id: eachData.docId,
          };
        });
        this.setState({
          ...this.state,
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
    
      getQuizzesForClassroom(ogDocId)
      .then(quizActivitiesData => {
        console.log(quizActivitiesData)
        quizActivitiesData.sort((a, b) => a.dateTimeForCreation - b.dateTimeForCreation)
        this.setState({...this.state, quizActivities:quizActivitiesData})
      })
      .catch(err => {
        alert(err.message)
      })
  }

  render() {
    return (
      <div className="dashboard container">
        {this.state.classroomLoading && (
          <Loading message="Getting Classroom Dashboard Ready. Please wait." />
        )}
        {this.state.isScoreDisplayed && <Score classroomDocId={this.state.classroomData.code} selectedActivityDocId = {this.state.selectedQuizActivityDocId}  cancelHandler={()=>this.setState({...this.state, isScoreDisplayed:false})} />}
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
              <div className="left">
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
                style={{
                  backgroundColor: "white",
                  height: "70px",
                  width: "70px",
                  borderRadius: "50px",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <img
                  src={this.state.classroomData.displayPicture}
                  alt=""
                  style={{ height: "45px", width: "45px", margin: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
        {this.state.userData.isTeacher && (
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
              <Link
                to={`/set-up-quiz/${this.props.match.params.compoundedInfo}`}
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
              </Link>
            </div>
          </div>
        )}
        <div className="row">
          <div
            className="col s12 m8 "
            style={{
              border: "1px solid lightgrey",
              marginTop: "20px",
              borderRadius: "15px",
              boxShadow: "10px 10px 10px #d3d3d3",
              height: "350px",
            }}
          >
            <h5 className="center">Activities</h5>
            <div
              className="center student-details"
              style={{
                paddingTop: "5px",
                overflowX: "hidden",
                overflowY: "auto",
                height: "270px",
              }}
            >
              <Activities
                activities={this.state.quizActivities}
                classroomDocId={this.state.classroomData.code}
                onClickActivityHandler={this.state.userData.isStudent ? this.onSelectActivityByStudentHandler : this.onSelectActivityByTeacherHandler} />
            </div>
          </div>
          <div
            className="col s12 m3 offset-m1"
            style={{
              border: "1px solid lightgrey",
              marginTop: "20px",
              borderRadius: "15px",
              boxShadow: "10px 10px 10px #d3d3d3",
              height: "350px",
            }}
          >
            <h5 className="center">Student Names</h5>
            <div
              className="center student-details"
              style={{
                paddingTop: "5px",
                overflowX: "hidden",
                overflowY: "auto",
                height: "270px",
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

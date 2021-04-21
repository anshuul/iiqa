import React, { Component } from "react";
import StudentDetails from "./StudentDetails";
import Activities from "./Activities";
import "./Dashboard.css";
import Avatar from '../../layout/Avatar'
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
import CopyIcon from '../../../assets/copy-icon.png'
import CreateQuizIcon from '../../../assets/create-quiz-icon.png'

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
      loading: false,
      loadingMessage: '',
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
    this.onCopyHandler = this.onCopyHandler.bind(this)
  }

  onSelectActivityByStudentHandler = (quizData, quizDocId) => {
    const decryptedQuizData = JSON.parse(quizData);
    console.log(decryptedQuizData);
    this.setState({...this.state, loading:true, loadingMessage:'Getting your Quiz Ready. Please wait.'})
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
        console.log("You are not eligible for the quiz. As you already attended this quiz.");
        this.props.errorOpenHandler("You are not eligible for the quiz. As you already attended this quiz.")
      }
    })
    .catch(err => {
      this.props.errorOpenHandler('Failed to load your quiz')
    })
    .finally(()=>{
      this.setState({...this.state, loading:false})
    })
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

  onCopyHandler(){
    navigator.clipboard.writeText(this.state.classroomData.code)
  }

  componentDidMount() {
    localStorage.removeItem("quizToken");
    window.speechSynthesis.cancel()
    // this.loadUserData();
    console.log(this.props)
    try {
      const { classroomDocId } = this.props.location.state
      this.setState({ ...this.state, loading: true, loadingMessage:"Getting Classroom Dashboard Ready. Please wait." });
      getClassroomData(classroomDocId)
        .then((data) => { 
          console.log(data)
          const { name: title, displayPicture, color, studentDataList, teacherData } = data;
          const studentsNameList = studentDataList.map((eachData) => ({
            name: `${eachData.fname} ${eachData.lname}`,
            id: eachData.docId,
          }));
          this.setState({
            ...this.state,
            classroomData: { title, displayPicture, color, code: classroomDocId },
            teacherName: `${teacherData.fname} ${teacherData.lname}`,
            studentsNameList,
          });
        })
        .catch((err) => {
          console.log(err.message);
          throw err
        })
        .finally(() => {
          this.setState({ ...this.state, loading: false });
        });

      getQuizzesForClassroom(classroomDocId)
        .then((quizActivitiesData) => {
          console.log(quizActivitiesData);
          this.setState({ ...this.state, quizActivities: quizActivitiesData });
        })
        .catch((err) => {
          console.log(err.message);
          throw err
        });

    } catch (err) {
      this.props.errorOpenHandler('Cound not fetch data for Dashboard')
    }
  }

  render() {
    return (
      <div className="dashboard container" style={{ height: "93vh" }}>
        {this.state.loading && (
          <Loading message={this.state.loadingMessage} />
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
          <div className={`col s12 m12 ${this.state.classroomData.color} lighten-2 customContentContainer`} >
            <div className="content customContent">
              <div className="left customContentClassroomData">
                  <p className="customContentData" id='classroomData'>
                    {this.state.classroomData.title}
                  </p>

                  <p className="customContentData" id='teacherData'>
                    Teacher : {this.state.teacherName}
                  </p>
                  
                  <p className="customContentData" id='codeData'>
                    Code :{' '}
                    <span
                      style={{
                        fontSize: "15px",
                        textAlign:'left'
                      }}
                      id='codeText'
                    >
                     {this.state.classroomData.code}
                    </span>
                    <img alt='copy' src={CopyIcon} id='copyIcon' onClick={this.onCopyHandler}/>
                  </p>
              </div>
              <div className="right customImageClass">
                <Avatar displayPicture={this.state.classroomData.displayPicture}/>
              </div>
            </div>
          </div>
        </div>
        
        <div className='customMainAreaContainer' >
          <div className='customSubMainLeftContainer'>
          <Title>Students</Title>
            <StudentDetails studentsNameList={this.state.studentsNameList} />
          </div>
          <div className='customSubMainRightContainer' >
            {this.props.currentUser.isTeacher && <div className="cardBox cardBoxBoxed" onClick={this.onSelectCreateQuizHandler}>
              <div className='activityDp' id='createDp'>
                <img alt='assignment' src={CreateQuizIcon} width='30px'/>
              </div>
              <div className='activityData'>
                <p>Create New Quiz</p>
              </div>
            </div>}
            <Activities
              activities={this.state.quizActivities}
              classroomDocId={this.state.classroomData.code}
              onClickActivityHandler={
                this.props.currentUser.isStudent
                  ? this.onSelectActivityByStudentHandler
                  : this.onSelectActivityByTeacherHandler
              }
              color={this.state.classroomData.color}
            />
          </div>
        </div>

      </div>
    );
  }
}

const Title = ({children:text}) => (
  <div className='customDashboardTitleContainer'>
    <p>{text}</p>
  </div>
)

export default function ComponentWithContext(props) {
  return (
    <AuthContext.Consumer>
    {({ currentUser, setCurrentUser, errorOpenHandler, successOpenHandler }) => (
      <Dashboard
        {...props}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        errorOpenHandler={errorOpenHandler}
        successOpenHandler={successOpenHandler}
      />
    )}
    </AuthContext.Consumer>
  );
}

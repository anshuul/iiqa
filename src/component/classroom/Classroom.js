import React, { Component } from "react";
import Classes from "./classes/Classes";
import './Classroom.css'
import { AuthContext } from '../../context/authContext'
import { loadClassroomForStudents, loadClassroomsForTeacher, encryptInformationForRouting } from '../../services/classroomServices'
import { getUserProfile } from '../../services/userServices'
import Loading from '../layout/Loading'
import tempImg from '../../assets/dp2.svg' // temp
import CreateBox from './CreateBox'
import JoinBox from './JoinBox'

class ClassroomComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      classrooms: [
        // { id: "1", title: "A" },
        // { id: "2", title: "B" },
        // { id: "3", title: "C" },
        // { id: "1", title: "A" },
        // { id: "2", title: "B" },
        // { id: "1", title: "A" },
        // { id: "2", title: "B" },
      ],
      currentUserData: null,
      loading: false,
      isCreateBoxDisplayed:false,
      isJoinBoxDisplayed:false,
    };
    this.enableCreateBox = this.enableCreateBox.bind(this)
    this.disableCreateBox = this.disableCreateBox.bind(this)
    this.enableJoinBox = this.enableJoinBox.bind(this)
    this.disableJoinBox = this.disableJoinBox.bind(this)
    this.loadClassrooms = this.loadClassrooms.bind(this)
  }

  componentDidMount(){
    this.loadClassrooms()
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.isJoinBoxDisplayed && !this.state.isJoinBoxDisplayed){
      this.loadClassrooms()
    }
    if(prevState.isCreateBoxDisplayed && !this.state.isCreateBoxDisplayed){
      this.loadClassrooms()
    }
  }

  loadClassrooms(){
    console.log(this.props.currentUser)
    this.setState({...this.state, loading:true})
    getUserProfile(this.props.currentUser.uid)
    .then(userData => {
      console.log(userData)
      this.setState({...this.state, currentUserData:userData})
      if(userData){
        if(userData.isStudent){
          loadClassroomForStudents(userData.docId)
          .then(listOfClassrooms => {
            console.log(listOfClassrooms)
            this.setState({classrooms: !listOfClassrooms ? [] : listOfClassrooms })
          })
          .catch(err => {
            throw new Error(err)
          })
        }
        else {
          loadClassroomsForTeacher(userData.docId)
          .then(listOfClassrooms => {
            console.log(listOfClassrooms)
            this.setState({classrooms: !listOfClassrooms ? [] : listOfClassrooms })
          })
          .catch(err => {
            throw new Error(err)
          })
        }
      }
    })
    .catch(err => console.log(err.message))
    .finally(()=>{
      this.setState({...this.state, loading:false})
    })
  }

  enableCreateBox(){
    console.log('clicked')
    this.setState({...this.state, isCreateBoxDisplayed:true})
  }

  disableCreateBox(){
    this.setState({...this.state, isCreateBoxDisplayed:false})
    // this.loadClassrooms() //since setstate is async func, loadclassroms takes place but state doesnot change so shiting this to CDU method
  }

  enableJoinBox(){
    console.log('clicked')
    this.setState({...this.state, isJoinBoxDisplayed:true})
  }

  disableJoinBox(){
    this.setState({...this.state, isJoinBoxDisplayed:false})
    // this.loadClassrooms()
  }

  buttonHandler = () => {
    console.log("Button Clicked");
  };

  render() {
    return (
          <div className='container' style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
            {this.state.isCreateBoxDisplayed && <CreateBox cancelHandler = {this.disableCreateBox}/>}
            {this.state.isJoinBoxDisplayed && <JoinBox cancelHandler = {this.disableJoinBox}/>}
            {this.state.loading && <Loading message='Loading your classrooms. Please wait.'/>}
            {/* button bar */}
            <div
              className="buttonclass customButtonGroup"
            >
              {this.state.currentUserData && this.state.currentUserData.isTeacher && <button
                onClick={this.enableCreateBox}
                className="selection blue darken-2 btn-flat btn-large customButton"
              >
                Create
              </button>}
              {this.state.currentUserData && this.state.currentUserData.isStudent && <button
                onClick={this.enableJoinBox}
                className="red darken-2 btn-flat btn-large customButton"
              >
                Join
              </button>}
            </div>

            {/* class group */}
            <div className='classGroup'>
              {this.state.classrooms.map((classroom) => {
                return <Classes {...classroom} key={classroom.docId} />;
              })}
            </div>
          </div>
    )
  }
}

export default function Classroom(props){
  return (
    <AuthContext.Consumer>
      {({currentUser}) => <ClassroomComponent {...props} currentUser = {currentUser}/>}
    </AuthContext.Consumer>
  )
}
// selection blue darken-2 btn-flat btn-medium"
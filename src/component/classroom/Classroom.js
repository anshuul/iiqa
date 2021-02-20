import React, { Component } from "react";
import Classes from "./classes/Classes";
import './Classroom.css'
import { AuthContext } from '../../context/authContext'
import { loadClassroomForStudents, loadClassroomsForTeacher } from '../../services/classroomServices'
import { getUserProfile } from '../../services/userServices'
import Loading from '../layout/Loading'
import tempImg from '../../assets/dp2.svg' // temp
import CreateBox from '../classroom/CreateBox'

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
  }

  componentDidMount(){
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
            this.setState({classrooms: listOfClassrooms})
          })
          .catch(err => {
            throw new Error(err)
          })
        }
        else {
          loadClassroomsForTeacher(userData.docId)
          .then(listOfClassrooms => {
            console.log(listOfClassrooms)
            this.setState({classrooms: listOfClassrooms})
          })
          .catch(err => {
            throw new Error(err)
          })
        }
      }
    })
    .catch(err => alert(err.message))
    .finally(()=>{
      this.setState({...this.state, loading:false})
    })
  }

  enableCreateBox(){
    this.setState({...this.state, isCreateBoxDisplayed:true})
  }

  disableCreateBox(){
    this.setState({...this.state, isCreateBoxDisplayed:false})
  }

  buttonHandler = () => {
    console.log("Button Clicked");
  };

  render() {
    return (
          <div className='container' style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
            {this.state.isCreateBoxDisplayed && <CreateBox cancelHandler = {this.disableCreateBox}/>}
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
                onClick={this.buttonHandler}
                className="red darken-2 btn-flat btn-large customButton"
              >
                Join
              </button>}
            </div>

            {/* class group */}
            <div className='classGroup'>
              {this.state.classrooms.map((classroom) => {
                return <Classes {...classroom} color='orange' displayPicture={tempImg} key={classroom.docId} />;
              })}
            </div>
          </div>
    )
  }
}

export default function Classroom(){
  return (
    <AuthContext.Consumer>
      {({currentUser}) => <ClassroomComponent currentUser = {currentUser}/>}
    </AuthContext.Consumer>
  )
}
// selection blue darken-2 btn-flat btn-medium"
import React, { Component } from "react";
import "./scores.css";
import { encryptInformationForRouting } from '../../services/classroomServices'
import { getAttendeesAndScores } from '../../services/quizServices'
import { getProfileDataFromDocId } from '../../services/userServices'
import Loading from '../layout/Loading'
import ModalWrapper from "../layout/ModalWrapper";
import { AuthContext, contextWrapper } from '../../context/authContext'

class Scores extends Component {
  state = {
    attendeeData: [],
    loading:false,
  };

  async loadStudentsList(attendeeData) {
    const data = []
    for(const attendee of attendeeData){
      const { fname, lname } = await getProfileDataFromDocId(attendee.studentDocId)
      data.push({name:`${fname} ${lname}`, score:attendee.score})
    }
    return data
  }

  redirectToViewQuiz(){
    this.props.history.push({
      pathname:'/finalizequiz',
      state:{
        classroomDocId:this.props.classroomDocId,
        quizDocId:this.props.selectedActivityDocId
      }
    })
  }

  componentDidMount(){
    console.log(this.props.selectedActivityDocId)
    this.setState({...this.state, loading:true})
    getAttendeesAndScores(this.props.classroomDocId, this.props.selectedActivityDocId)
    .then(attendeeData => {
      console.log(attendeeData)
      this.setState({...this.state, attendeeData})
    })
    .catch(err => {
      console.log(err.message)
      this.props.errorOpenHandler('Failed to get scores.')
    })
    .finally(()=>{
      this.setState({...this.state, loading:false})
    })
  }

  render() {
    return (
      <ModalWrapper>
        {this.state.loading && <Loading message='Getting scores' />}
        <div className="scoresContent">
          <div style={{display:'flex', justifyContent:'space-between', width:'100%'}} >
            <div
              onClick={() => this.props.cancelHandler()}
              className="left-align blue darken-2 btn-flat btn-small"
              style={{color:'white'}}
            >
              Back
            </div>
            <div
              onClick={() => this.redirectToViewQuiz()}
              className="right-align blue darken-2 btn-flat btn-small"
              style={{color:'white'}}
            >
              View Quiz
            </div>
          </div>
          {this.state.attendeeData.length > 0 ? this.state.attendeeData.map((data, index) => {
            return (
              <div
                className="card-panel"
                key={index}
                style={{
                  marginTop: "20px",
                  borderRadius: "10px",
                  width: "100%",
                  display:"flex",
                  justifyContent:'space-between',
                  alignItems:'center',
                  flexWrap:'wrap',
                }}
              >
                <p>
                  <strong>Name: </strong>
                  {`${data.studentData.fname} ${data.studentData.lname}`}
                </p>
                <p>
                  <strong>Score:</strong> {data.score}
                </p>
              </div>
            );
          }): <div>No Scores Available</div>}
        </div>
      </ModalWrapper>
    );
  }
}

export default contextWrapper(Scores)

// export default function ComponentWithContext(props){
//   return (
//       <AuthContext.Consumer>
//           {({ currentUser, setCurrentUser, errorOpenHandler, successOpenHandler }) => (
//           <Scores
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
import React, { Component } from "react";
import "./scores.css";
import { encryptInformationForRouting } from '../../services/classroomServices'
import { getAttendeesAndScores } from '../../services/quizServices'
import { getProfileDataFromDocId } from '../../services/userServices'
import Loading from '../layout/Loading'

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
    this.props.history.push(`/finalizequiz/${encryptInformationForRouting(this.props.classroomDocId, this.props.selectedActivityDocId)}`)
  }

  componentDidMount(){
    console.log(this.props.selectedActivityDocId)
    this.setState({...this.state, loading:true})
    getAttendeesAndScores(this.props.classroomDocId, this.props.selectedActivityDocId)
    .then(attendeeData => {
      console.log(attendeeData)
      return this.loadStudentsList(attendeeData)
    })
    .then(data => {
      console.log(data)
      this.setState({...this.state, attendeeData:data})
    })
    .catch(err => {
      alert(err.message)
    })
    .finally(()=>{
      this.setState({...this.state, loading:false})
    })
  }

  render() {
    return (
      <div className="scoresContainer">
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
          {this.state.attendeeData.length > 0 ? this.state.attendeeData.map((data) => {
            return (
              <div
                className="card-panel"
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
                  {data.name}
                </p>
                <p>
                  <strong>Score:</strong> {data.score}
                </p>
              </div>
            );
          }): <div>No Scores Available</div>}
        </div>
      </div>
    );
  }
}

export default Scores;

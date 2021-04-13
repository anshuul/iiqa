import React, { Component } from "react";
import { Link } from "react-router-dom";
import './StudentDetails.css'

class StudentDetails extends Component {
  render() {
    return (
      <div>
        {this.props.studentsNameList.map((studentName) => {
          return (
            <div
              className="studentDetailsContainer"
              key={studentName.id}
              onClick={this.enableScoresBox}
            >
              <p className="center" style={{ color: "black" }}>
                {studentName.name}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default StudentDetails;

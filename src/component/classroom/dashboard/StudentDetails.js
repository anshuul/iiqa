import React, { Component } from "react";
import { Link } from "react-router-dom";

class StudentDetails extends Component {
  render() {
    return (
      <div>
        {this.props.studentsNameList.map((studentName) => {
          return (
            <div
              className="card-panel "
              key={studentName.id}
              style={{
                borderRadius: "10px",
                border: "1px solid #d3d3d3",
                height: "70px",
                color: "black",
                cursor: "pointer",
              }}
              onClick={this.enableScoresBox}
            >
              <a className="center" style={{ color: "black" }}>
                {studentName.name}
              </a>
            </div>
          );
        })}
      </div>
    );
  }
}

export default StudentDetails;

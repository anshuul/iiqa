import React, { Component } from "react";
import { Link } from "react-router-dom";
import Scores from "../../scores/scores";

class StudentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScoresBoxDisplayed: false,
    };
    this.enableScoresBox = this.enableScoresBox.bind(this);
    this.disableScoresBox = this.disableScoresBox.bind(this);
  }
  enableScoresBox() {
    this.setState({ isScoresBoxDisplayed: true });
  }

  disableScoresBox() {
    this.setState({ isScoresBoxDisplayed: false });
  }
  render() {
    return (
      <div>
        {this.state.isScoresBoxDisplayed && (
          <Scores cancelHandler={this.disableScoresBox} />
        )}
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

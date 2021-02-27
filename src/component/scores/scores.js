import React, { Component } from "react";
import "./scores.css";

class Scores extends Component {
  state = {
    scores: [
      { date: "1/1/21", score: "6" },
      { date: "21/1/21", score: "7" },
      { date: "4/2/21", score: "8" },
      { date: "26/2/21", score: "7" },
      { date: "5/3/21", score: "9" },
    ],
  };
  render() {
    return (
      <div className="scoresContainer">
        <div className="scoresContent">
          <button
            onClick={() => this.props.cancelHandler()}
            className="left-align"
          >
            Back
          </button>
          {this.state.scores.map((score) => {
            return (
              <div
                className="card-panel"
                style={{
                  marginTop: "20px",
                  borderRadius: "10px",
                  width: "100%",
                }}
              >
                <p>
                  <strong>Date of Quiz: </strong>
                  {score.date}
                </p>
                <p>
                  <strong>Score:</strong> {score.score}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Scores;

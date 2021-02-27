import React, { Component } from "react";
import "./Quiz.css";
import Dog from "../../assets/dog.jpg";

class Quiz extends Component {
  state = {
    image: "",
    question: "",
    answer: "",
  };

  render() {
    return (
      <div className="quiz">
        <div
          className="flex justify-center"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="imageClass">
            <img
              src={Dog}
              alt="image"
              height="230"
              width="250"
              style={{ margin: "auto" }}
            />
          </div>
        </div>
        <div className="questionClass">
          <p className="question" style={{ fontSize: "30px" }}>
            What is the animal in the image?
          </p>
        </div>

        <center>
          <div className="optionRow">
            <div>
              <div className="options ">
                <p className="font-quiz text-2xl" style={{ fontSize: "20px" }}>
                  {" "}
                  Lion
                </p>
              </div>
            </div>

            <div>
              <div className="options ">
                <p className="font-quiz text-2xl" style={{ fontSize: "20px" }}>
                  {" "}
                  Dog
                </p>
              </div>
            </div>
          </div>
        </center>

        <center>
          <div className="optionRow">
            <div>
              <div className="options ">
                <p className="font-quiz text-2xl" style={{ fontSize: "20px" }}>
                  {" "}
                  Elephant
                </p>
              </div>
            </div>

            <div>
              <div className="options ">
                <p className="font-quiz text-2xl" style={{ fontSize: "20px" }}>
                  {" "}
                  Cat
                </p>
              </div>
            </div>
          </div>
        </center>
      </div>
    );
  }
}

export default Quiz;

import React, { Component } from "react";
import Classes from "./classes/Classes";

class Classroom extends Component {
  state = {
    classroom: [
      { id: "1", title: "A" },
      { id: "2", title: "B" },
      { id: "3", title: "C" },
      { id: "1", title: "A" },
      { id: "2", title: "B" },
      { id: "1", title: "A" },
      { id: "2", title: "B" },
      { id: "1", title: "A" },
      { id: "2", title: "B" },
    ],
  };
  buttonHandler = () => {
    console.log("Button Clicked");
  };

  render() {
    const classrooms = this.state.classroom;
    console.log(classrooms);
    return (
      <div className="conatainer">
        <div
          className="buttonclass"
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <button
            onClick={this.buttonHandler}
            className="selection blue darken-2 btn-flat btn-large"
            style={{
              color: "white",
              borderRadius: "20px",
              marginTop: "20px",
              width: "20%",
              fontSize: 20,
              marginLeft: "20px",
              marginRight: "20px",
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            Create
          </button>
          <button
            onClick={this.buttonHandler}
            className="red darken-2 btn-flat btn-large"
            style={{
              color: "white",
              borderRadius: "20px",
              marginTop: "20px",
              width: "20%",
              fontSize: 20,
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            Join
          </button>
        </div>

        {classrooms.map((classroom) => {
          return <Classes classroom={classroom} key={classroom.id} />;
        })}
      </div>
    );
  }
}

export default Classroom;

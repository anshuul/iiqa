import React, { Component } from "react";
import Classes from "./classes/Classes";
import './Classroom.css'

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
    ],
  };
  buttonHandler = () => {
    console.log("Button Clicked");
  };

  render() {
    return (
      <div className='container' style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
        {/* button bar */}
        <div
          className="buttonclass customButtonGroup"
        >
          <button
            onClick={this.buttonHandler}
            className="selection blue darken-2 btn-flat btn-large customButton"
            
          >
            Create
          </button>
          <button
            onClick={this.buttonHandler}
            className="red darken-2 btn-flat btn-large customButton"
          >
            Join
          </button>
        </div>

        {/* class group */}
        <div className='classGroup'>
          {this.state.classroom.map((classroom) => {
            return <Classes classroom={classroom} key={classroom.id} />;
          })}
        </div>
      </div>
    )
  }
}

export default Classroom;
// selection blue darken-2 btn-flat btn-medium"
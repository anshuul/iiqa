import React, { Component } from "react";
import SelfLearningModules from "./SelfLearningModules";
import "./selfLearning.css";

class SelfLearning extends Component {
  state = {
    modules: [
      { id: "1", title: "Animals1" },
      { id: "2", title: "Animals2" },
      { id: "3", title: "Fruits1" },
      { id: "4", title: "Fruits2" },
      { id: "5", title: "Vehicles1" },
      { id: "6", title: "Vehicles2" },
      { id: "7", title: "Misc1" },
      { id: "8", title: "Misc2" },
    ],
  };
  render() {
    return (
      <div className="container">
        <h4 className="center">
          Please select any modules you want to learn from
          <div className="modules">
            {this.state.modules.map((module) => {
              return (
                <SelfLearningModules title={module.title} key={module.id} />
              );
            })}
          </div>
        </h4>
      </div>
    );
  }
}

export default SelfLearning;

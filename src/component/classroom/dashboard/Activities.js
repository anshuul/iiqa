import React, { Component } from "react";

class Activities extends Component {
  state = {
    activities: [
      { title: "A", content: "blah blah blah" },
      { title: "B", content: "blah blah blah" },
      { title: "C", content: "blah blah blah" },
      { title: "D", content: "blah blah blah" },
      { title: "E", content: "blah blah blah" },
      { title: "F", content: "blah blah blah" },
    ],
  };
  render() {
    const activities = this.state.activities;
    return (
      <div>
        {activities.map((activity) => {
          return (
            <div
              className="card-panel "
              key={activity.title}
              style={{
                border: "1px solid grey",
                borderRadius: "10px",
                boxShadow: "10px 10px 10px #d3d3d3",
                height: "100px",
              }}
            >
              <p>{activity.title}</p>
              <p>{activity.content}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Activities;

import React, { Component } from "react";

class StudentDetails extends Component {
  state = {
    students: [
      { id: "1", name: "A" },
      { id: "2", name: "B" },
      { id: "3", name: "C" },
      { id: "4", name: "D" },
      { id: "5", name: "E" },
      { id: "6", name: "F" },
    ],
  };
  render() {
    const students = this.state.students;
    return (
      <div>
        {students.map((student) => {
          return (
            <div
              className="card-panel "
              key={student.id}
              style={{
                border: "1px solid grey",
                borderRadius: "10px",
                boxShadow: "10px 10px 10px #d3d3d3",
                height: "70px",
              }}
            >
              <p className="left">{student.id}</p>
              <p className="right">{student.name}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default StudentDetails;

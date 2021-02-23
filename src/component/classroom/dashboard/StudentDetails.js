import React, { Component } from "react";

function StudentDetails({studentsNameList}) {
  return (
    <div>
      {studentsNameList.map((studentName) => {
        return (
          <div
            className="card-panel "
            key={studentName.id}
            style={{
              borderRadius: "10px",
              border:"1px solid #d3d3d3",
              height: "70px",
            }}
          >
            <p className="center">{studentName.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default StudentDetails;

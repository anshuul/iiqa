import React from "react";
import './Classes.css'

const colors = ["blue", "teal", "red", "green", "orange"];
const Classes = (props) => {
  const defaultClassName = "child lighten-2 customTitleContainer";
  const randomize = () => {
    return colors[Math.floor(Math.random() * 5)];
  };
  const finalClassName = `${defaultClassName} ${randomize()}`;
  return (
      <div
        className = 'customContainer'
      >
        <div
          className={finalClassName}
        >
          <p>
            {props.classroom.title}
          </p>
        </div>
        <div className="footer">
          <p>Total Students: 20</p>
        </div>
      </div>
  );
};

export default Classes;

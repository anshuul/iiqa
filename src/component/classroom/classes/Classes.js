import React from "react";
import './Classes.css'
import tempImg from '../../../assets/dp2.svg'

const colors = ["blue", "teal", "red", "green", "orange"];
const Classes = (props) => {
  console.log(props.classroom)
  const defaultClassName = "child lighten-2 customTitleContainer";
  const randomize = () => {
    return colors[Math.floor(Math.random() * 5)];
  };
  const finalClassName = `${defaultClassName} ${randomize()}`;
  return (
      <div className = 'customContainer'>
        <div className={finalClassName}>
          <p>{props.classroom.name}</p>
          <div className='displayPicture' >
            <img src={tempImg} alt='displayPicture' style={{width:'100%', height:'100%'}}/>
          </div>
        </div>
        <div className="footer">
          <p>Total Students: {props.classroom.studentIds.length}</p>
        </div>
      </div>
  );
};

export default Classes;

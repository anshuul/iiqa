import React from "react";
import './Classes.css'
import Avatar from '../../layout/Avatar'


const Classes = (props) => {
  console.log(props.classroom)
  const defaultClassName = "child lighten-2 customTitleContainer";
  const finalClassName = `${defaultClassName} ${props.color}`;
  return (
      <div className = 'customContainer'>
        <div className={finalClassName}>
          <p>{props.name}</p>
          <Avatar displayPicture={props.displayPicture} className='displayPicture'/>
        </div>
        <div className="footer">
          <p>Total Students: {props.studentIds.length}</p>
        </div>
      </div>
  );
};

export default Classes;

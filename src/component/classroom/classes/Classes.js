import React from "react";
import './Classes.css'
import Avatar from '../../layout/Avatar'
import { encryptInformationForRouting } from '../../../services/classroomServices'
import { Link } from 'react-router-dom'


const Classes = (props) => {
  console.log(props.classroom)
  const defaultClassName = "child lighten-2 customTitleContainer";
  const finalClassName = `${defaultClassName} ${props.color}`;

  const ComponentContent = () => (
    <React.Fragment>
      <div className={finalClassName}>
        <p>{props.name}</p>
        <Avatar displayPicture={props.displayPicture} className='displayPicture'/>
      </div>
      <div className="footer">
        <p>Total Students: {props.studentIds.length}</p>
      </div>
    </React.Fragment>
  )

  if(props.teacherId && props.docId){
    return (
          <Link to={`/dashboard/${encryptInformationForRouting(props.docId, props.teacherId)}`} className = 'customContainer'>
            <ComponentContent/>
          </Link>
    );
  } else {
    return (
          <div className = 'customContainer'>
            <ComponentContent/>
          </div>
    );
  }
};

export default Classes;

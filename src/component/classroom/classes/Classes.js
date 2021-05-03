import React from "react";
import './Classes.css'
import Avatar from '../../layout/Avatar'
import { encryptInformationForRouting } from '../../../services/classroomServices'
import { Link } from 'react-router-dom'
import ClassLayoutContainer from '../../layout/ClassLayoutContainer'


const Classes = (props) => {
  const defaultClassName = "child lighten-2 customTitleContainer";
  const finalClassName = `${defaultClassName} ${props.color}`;

  const ComponentContent = () => (
    <React.Fragment>
      <div className={finalClassName}>
        <p className='ClassTitle'>{props.name}</p>
        <Avatar displayPicture={props.displayPicture} className='displayPictureDefault'/>
      </div>
      <div className="footer">
        <p>Total Students: {props.studentIds.length}</p>
      </div>
    </React.Fragment>
  )

  const redirectToDashboard = () => {
    if(props.teacherId && props.docId) {  
      props.history.push({
        pathname:'/dashboard',
        state: {
          classroomDocId: props.docId
        }
      })
    }
  }

  
  return (
        <ClassLayoutContainer emphasize = {props.emphasize} onClick={redirectToDashboard}>
          <ComponentContent/>
        </ClassLayoutContainer>
  );
};

export default Classes;

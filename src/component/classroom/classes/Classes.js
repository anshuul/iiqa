import React from "react";
import './Classes.css'
import Avatar from '../../layout/Avatar'
import { encryptInformationForRouting } from '../../../services/classroomServices'
import { Link } from 'react-router-dom'
import ClassLayoutContainer from '../../layout/ClassLayoutContainer'


const Classes = (props) => {
  console.log(props)
  console.log(props.classroom)
  const defaultClassName = "child lighten-2 customTitleContainer";
  const finalClassName = `${defaultClassName} ${props.color}`;

  const ComponentContent = () => (
    <React.Fragment>
      <div className={finalClassName}>
        <p>{props.name}</p>
        <Avatar displayPicture={props.displayPicture} className={props.name ? 'displayPictureDefault' : 'displayPictureModified'}/>
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
        <ClassLayoutContainer onClick={redirectToDashboard}>
          <ComponentContent/>
        </ClassLayoutContainer>
  );
};

export default Classes;

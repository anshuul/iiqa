import React from "react";
import './Activities.css'
import CalendarIcon from '../../../assets/calendar-icon.png'
import ClockIcon from '../../../assets/clock-icon.svg'
import AssignmentIcon from '../../../assets/assignment-icon.png'
import CreateQuizIcon from '../../../assets/create-quiz-icon.png'

function Activities({activities, onClickActivityHandler, color}) {
  return (
    <div>
      {activities.map((activity) => {
        return (
          <div
            className="cardBox"
            key={activity.docId}
            onClick={()=>{
              if(onClickActivityHandler)
                onClickActivityHandler(activity.quizData, activity.docId)
              }}
          >
            <div className={`activityDp ${color} lighten-2`} id='quizDp'>
              <img alt='assignment' src={AssignmentIcon} width='30px'/>
            </div>
            <div className='activityData'>
              <p>{activity.quizName || 'Quiz'}</p>
              <div className='activityDetailsContainer'>
                <p className='activityDateTimeContainer'>
                  <img alt='calendar' src={CalendarIcon} className='dateTimeIcon'/>
                  {activity.dateTime.dateOfCreation}
                </p>
                <p className='activityDateTimeContainer'>
                  <img alt='calendar' src={ClockIcon} className='dateTimeIcon'/>
                  {activity.dateTime.timeOfCreation}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Activities;

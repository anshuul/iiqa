import React from "react";


function Activities({activities, onClickActivityHandler}) {

  return (
    <div>
      {activities.map((activity) => {
        return (
          <div
            className="card-panel "
            key={activity.docId}
            onClick={()=>{
              if(onClickActivityHandler)
                onClickActivityHandler(activity.quizData, activity.docId)
              }}
            style={{
              border: "1px solid #d3d3d3",
              borderRadius: "10px",
              height: "70px",
              cursor:'pointer',
            }}
          >
            Quiz uploaded on {activity.dateTimeOfCreation.toDate().toDateString()} {activity.dateTimeOfCreation.toDate().toLocaleTimeString('en-US')}
          </div>
        );
      })}
    </div>
  );
}

export default Activities;

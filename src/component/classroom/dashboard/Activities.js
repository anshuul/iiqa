import React from "react";


function Activities({activities, setOfStudentIds, studentId, history}) {

  const onClickActivityHandler = (quizData) => {
    const decryptedQuizData = JSON.parse(quizData)
    console.log(decryptedQuizData)
    history.push({
      pathname: "/quiz",
      state: { 
        quizData: decryptedQuizData,
      },
    });
  }

  return (
    <div>
      {activities.map((activity) => {
        return (
          <div
            className="card-panel "
            key={activity.docId}
            onClick={()=>onClickActivityHandler(activity.quizData)}
            style={{
              border: "1px solid #d3d3d3",
              borderRadius: "10px",
              height: "70px",
              cursor:'pointer',
            }}
          >
            Quiz uploaded on {activity.dateTimeOfCreation}
          </div>
        );
      })}
    </div>
  );
}

export default Activities;

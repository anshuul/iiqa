import React from "react";

const Classes = (props) => {
    return ( 
        <div className="parent" style={{height: "250px", width: "190px", border:"1px solid black", boxShadow: "10px 10px 10px grey", marginTop:'10px', marginLeft:'10px'}}>
            <div className="child  teal lighten-2" style={{margin:'0px', height:'80px'}}>
                <p style={{margin: '0px', paddingTop:'5px', paddingLeft:'5px'}}>{props.classroom.title}</p>
            </div>
        </div>
     ); 
}

export default Classes;
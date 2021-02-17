    import React , { Component } from "react";
    import Classes from "./classes/Classes";

    class Classroom extends Component {
    
        state = {
            classroom: [
                {id: '1', title: 'A'},
                {id: '2', title: 'B'},
                {id: '3', title: 'C'}
            ]
            
        }
        
        render () {
            const classrooms = this.state.classroom;
            console.log(classrooms);
            return (
                <div className="conatainer">
                    {classrooms.map(classroom => {
                        return (
                            <Classes classroom={classroom} key={classroom.id}/>
                        )
                    })}
                </div>
            )
            
        }
    }

    export default Classroom;
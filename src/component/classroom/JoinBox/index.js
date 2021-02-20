import React, { Component } from 'react'
import './index.css'
import { joinClassroom } from '../../../services/classroomServices'
import { AuthContext } from '../../../context/authContext'
import Loading from '../../layout/Loading'

class JoinBox extends Component {

    constructor(props){
        super(props)
        this.state = {
            classroomCode: '',
            loading:false,
        }
        this.classroomCodeChangeHandler = this.classroomCodeChangeHandler.bind(this)
        this.joinHandler = this.joinHandler.bind(this)
    }

    classroomCodeChangeHandler(event){
        this.setState({...this.state, classroomCode:event.target.value})
    }

    joinHandler(){
        this.setState({...this.state, loading:true})
        joinClassroom(this.state.classroomCode, this.props.currentUser.uid)
        .then((message)=>{
            alert(message)
            this.props.cancelHandler()
        })
        .catch(err=>{
            alert(err.message)
        })
        .finally(()=>{
            this.setState({...this.state, loading:false})
        })
    }

    render() {
        return (
            <div className='boxContainer'>
                {this.state.loading && <Loading message='Joining you in the Classroom. Please wait.'/>}
                <div className='boxContent' >
                    <div className='formContainer'>
                        <form>
                            <div className="input-field">
                                <label htmlFor="code">Code of Classroom</label>
                                <input
                                    type="text"
                                    id="code"
                                    value={this.state.classroomCode}
                                    onChange={this.classroomCodeChangeHandler}
                                />
                            </div>
                            <div className='buttonGroup'>
                                <div className='btn blue darken-3 z-depth-0' onClick={this.joinHandler} >Join</div>
                                <div className='btn red darken-3 z-depth-0' onClick={()=>this.props.cancelHandler()}>Cancel</div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default function ComponentWithContext(props){
    return (
        <AuthContext.Consumer>
            {({currentUser}) => <JoinBox currentUser={currentUser} {...props} />}
        </AuthContext.Consumer>
    )
}

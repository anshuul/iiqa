import React, { Component } from 'react'
import './index.css'
import { joinClassroom } from '../../../services/classroomServices'
import { AuthContext, contextWrapper } from '../../../context/authContext'
import Loading from '../../layout/Loading'
import ButtonGroup from '../../layout/ButtonGroup'
import { CancelButton, SubmitButton } from '../../layout/Button'
import ErrorText from '../../layout/ErrorText'

class JoinBox extends Component {

    constructor(props){
        super(props)
        this.state = {
            classroomCode: '',
            loading:false,
            errorMessage:'',
            loadingMessage:'',
        }
        this.classroomCodeChangeHandler = this.classroomCodeChangeHandler.bind(this)
        this.joinHandler = this.joinHandler.bind(this)
    }

    classroomCodeChangeHandler(event){
        this.setState({...this.state, classroomCode:event.target.value})
    }

    joinHandler(e){
        e.preventDefault()
        this.setState({...this.state, loading:true})
        joinClassroom(this.state.classroomCode, this.props.currentUser.docId)
        .then((message)=>{
            console.log(message)
            this.props.successOpenHandler(message)
            this.props.cancelHandler()
        })
        .catch(err=>{
            console.log(err.message)
            if(err.message.indexOf('classroomDocId') > -1)
                err.message = err.message.replace('classroomDocId', 'code')
            this.setState({...this.state, errorMessage:err.message})
        })
        .finally(()=>{
            this.setState({...this.state, loading:false})
        })
    }

    render() {
        return (
            <div className='boxContainer'>
                {this.state.loading && <Loading message='Getting you enrolled in the Classroom. Please wait.'/>}
                <div className='boxContent' >
                    <div className='formContainer'>
                        <form
                            onSubmit={this.joinHandler}
                            onKeyDown={(e) => e.key === 'Enter' && this.joinHandler}
                        >
                            <div className="input-field">
                                <label htmlFor="code">Code of Classroom</label>
                                <input
                                    type="text"
                                    id="code"
                                    value={this.state.classroomCode}
                                    onChange={this.classroomCodeChangeHandler}
                                />
                                <ErrorText errorText={this.state.errorMessage} />
                            </div>
                            <ButtonGroup>
                                <CancelButton onClick={this.props.cancelHandler}>Cancel</CancelButton>
                                <SubmitButton>Join</SubmitButton>
                            </ButtonGroup>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default contextWrapper(JoinBox)

// export default function ComponentWithContext(props){
//     return (
//         <AuthContext.Consumer>
//             {({ currentUser, setCurrentUser, errorOpenHandler, successOpenHandler }) => (
//             <JoinBox
//                 {...props}
//                 currentUser={currentUser}
//                 setCurrentUser={setCurrentUser}
//                 errorOpenHandler={errorOpenHandler}
//                 successOpenHandler={successOpenHandler}
//             />
//             )}
//         </AuthContext.Consumer>
//     )
// }

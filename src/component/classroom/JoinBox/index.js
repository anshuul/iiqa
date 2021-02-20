import React, { Component } from 'react'
import './index.css'

export default class index extends Component {

    constructor(props){
        super(props)
        this.state = {
            classroomCode: '',
        }
        this.classroomCodeChangeHandler = this.classroomCodeChangeHandler.bind(this)
    }

    classroomCodeChangeHandler(event){
        console.log(event.target.value)
        this.setState({...this.state, classroomCode:event.target.value})
    }

    render() {
        return (
            <div className='boxContainer'>
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
                                <button className='btn blue darken-3 z-depth-0' >Create</button>
                                <button className='btn red darken-3 z-depth-0' onClick={() => this.props.cancelHandler()}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

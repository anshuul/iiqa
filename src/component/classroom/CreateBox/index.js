import React, { Component } from 'react'
import './index.css'
import Classes from '../classes/Classes'
import tempImg from '../../../assets/dp2.svg'
import { getAvatarImageLinks, createNewClassroom } from '../../../services/classroomServices'
import Avatar from '../../layout/Avatar'
import Loading from '../../layout/Loading'
import { AuthContext } from '../../../context/authContext'

class CreateBox extends Component {

    constructor(props){
        super(props)
        this.state = {
            name:'dummy',
            colorsList:['blue', 'red', 'orange', 'green'],
            colorChose:'red',
            displayPicturesList: [],
            displayPictureChose:tempImg,
            studentIds:[],
            loading:false
        }
        this.onColorRadioChange = this.onColorRadioChange.bind(this)
        this.onAvatarRadioChange = this.onAvatarRadioChange.bind(this)
        this.onNameChange = this.onNameChange.bind(this)
        this.createHandler = this.createHandler.bind(this)
    }

    componentDidMount(){
        getAvatarImageLinks()
        .then(listOfAvatars => {
            this.setState({...this.state, displayPicturesList:listOfAvatars})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    createHandler(){
        console.log(this.state)
        this.setState({...this.state, loading:true})
        createNewClassroom(this.state.name.trim(), this.state.colorChose, this.props.currentUser.uid, this.state.displayPictureChose)
        .then(message => {
            alert(message)
        })
        .catch(err => {
            alert(err.message)
        })
        .finally(()=>{
            this.setState({...this.state, loading:false})
            this.props.cancelHandler()
        })
    }

    onColorRadioChange(event){
        this.setState({...this.state, colorChose:event.target.value})
    }

    onAvatarRadioChange(event){
        this.setState({...this.state, displayPictureChose:event.target.value})
    }

    onNameChange(event){
        this.setState({...this.state, name:event.target.value})
    }

    render() {
        return (
            <div className='boxContainer'>
                {this.state.loading && <Loading message='Creating your Classroom. Please wait.' />}
                <div className='createBoxContent' >
                    <div className='previewContainer'>
                        <Classes
                            color={this.state.colorChose}
                            displayPicture = {this.state.displayPictureChose}
                            name = {this.state.name}
                            {...this.state}
                        /> 
                    </div>
                    <div className='divider'></div>
                    <div className='createFormContainer'>
                        <form>
                            <div className="input-field">
                                <label htmlFor="name">Name of Class</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={this.state.name}
                                    onChange={this.onNameChange}
                                    autoFocus
                                />
                            </div>
                            <div className='checkBoxGroup' >
                                <div style={{marginRight:'10px'}}>
                                    <label style={{fontSize:'1rem'}}>
                                    Choose Color:
                                    </label>
                                </div>  
                                {this.state.colorsList.map(color => (
                                    <div className='checkBox' key={color}>
                                        <label>
                                        <input className="with-gap" value={color} name="group1" type="radio" onChange={this.onColorRadioChange} />
                                        <span>{color}</span>
                                        </label>
                                    </div>
                                ))} 
                            </div>
                            <div className='checkBoxGroup' >
                                <div style={{marginRight:'10px'}}>
                                    <label style={{fontSize:'1rem'}}>
                                    Choose Avatar:
                                    </label>
                                </div>   
                                {this.state.displayPicturesList.map((displayPictureLink, index) => (
                                    <div className='checkBox' key={index}>
                                        <label>
                                        <input className="with-gap"value={displayPictureLink} name="group2" type="radio" onChange={this.onAvatarRadioChange} />
                                        <span>
                                            <Avatar displayPicture={displayPictureLink} className='customAvatar' />
                                        </span>
                                        </label>
                                    </div>    
                                ))}
                            </div>
                            <div className='buttonGroup'>
                                <div className='btn blue darken-3 z-depth-0' onClick={this.createHandler} >Create</div>
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
            {({currentUser}) => <CreateBox currentUser={currentUser} {...props} />}
        </AuthContext.Consumer>
    )
}

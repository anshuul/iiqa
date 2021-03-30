import React, { Component } from 'react'
import './index.css'
import Classes from '../classes/Classes'
import tempImg from '../../../assets/dp2.svg'
import { getAvatarImageLinks, createNewClassroom } from '../../../services/classroomServices'
import Avatar from '../../layout/Avatar'
import Loading from '../../layout/Loading'
import { AuthContext } from '../../../context/authContext'
import ModalWrapper from '../../layout/ModalWrapper'

class CreateBox extends Component {

    constructor(props){
        super(props)
        this.state = {
            name:'dummy',
            colorsList:['blue', 'red', 'orange', 'green', 'yellow', 'pink'],
            colorChose:'red',
            displayPicturesList: [],
            displayPictureChose:tempImg,
            studentIds:[],
            loading:false
        }
        this.onColorSelect = this.onColorSelect.bind(this)
        this.onAvatarSelect = this.onAvatarSelect.bind(this)
        this.onNameChange = this.onNameChange.bind(this)
        this.createHandler = this.createHandler.bind(this)
    }

    componentDidMount(){
        console.log(this.props.currentUser)
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
        createNewClassroom(this.state.name.trim(), this.state.colorChose, this.props.currentUser.docId, this.state.displayPictureChose)
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

    onColorSelect(event){
        console.log(event)
        this.setState({...this.state, colorChose:event.target.dataset.color})
        event.target.parentElement.childNodes.forEach(node => node.classList.remove('focusedCheckBox'))
        event.target.classList.add('focusedCheckBox')
    }

    onAvatarSelect(event){
        event.stopPropagation()
        console.log(event)
        this.setState({...this.state, displayPictureChose:event.target.currentSrc})
        event.target.parentElement.parentElement.parentElement.childNodes.forEach(node => node.childNodes[0].classList.remove('focusedCheckBox'))
        event.target.parentElement.classList.add('focusedCheckBox')
    }

    onNameChange(event){
        this.setState({...this.state, name:event.target.value})
    }

    render() {
        return (
            <ModalWrapper>
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
                            <div className='checkBoxContainer' >
                                <div style={{marginBottom:'10px'}}>
                                    <label style={{fontSize:'1rem'}}>
                                    Choose Color:
                                    </label>
                                </div>
                                <div className='checkBoxGroup'>
                                    {this.state.colorsList.map(color => (
                                        <div className={`checkBox colorBand ${color}`} key={color} data-color={color} onClick={this.onColorSelect}>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='checkBoxContainer' >
                                <div style={{marginBottom:'10px'}}>
                                    <label style={{fontSize:'1rem'}}>
                                    Choose Avatar:
                                    </label>
                                </div>   
                                <div className='checkBoxGroup'>
                                    {this.state.displayPicturesList.map((displayPictureLink, index) => (
                                        <div className='checkBox' key={index} data-avatar={displayPictureLink} onClick={this.onAvatarSelect}>
                                            <Avatar displayPicture={displayPictureLink} className='customAvatar' />
                                        </div>    
                                    ))}
                                </div>
                            </div>
                            <div className='buttonGroup'>
                                <div className='btn red darken-3 z-depth-0' onClick={()=>this.props.cancelHandler()}>Cancel</div>
                                <div className='btn blue darken-3 z-depth-0' onClick={this.createHandler} >Create</div>
                            </div>
                        </form>
                    </div>
                </div>
            </ModalWrapper>
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

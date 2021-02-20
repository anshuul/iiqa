import React, { Component } from 'react'
import './index.css'
import Classes from '../classes/Classes'
import tempImg from '../../../assets/dp2.svg'
import { getAvatarImageLinks } from '../../../services/classroomServices'
import Avatar from '../../layout/Avatar'

export default class index extends Component {

    constructor(props){
        super(props)
        this.state = {
            name:'dummy',
            colorsList:['blue', 'red', 'orange', 'green'],
            colorChose:'red',
            displayPicturesList: [],
            displayPictureChose:tempImg,
            studentIds:[],
        }
        this.onColorRadioChange = this.onColorRadioChange.bind(this)
        this.onAvatarRadioChange = this.onAvatarRadioChange.bind(this)
        this.onNameChange = this.onNameChange.bind(this)
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
                                    <div className='checkBox'>
                                        <label>
                                        <input class="with-gap" value={color} name="group1" type="radio" onChange={this.onColorRadioChange} />
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
                                {this.state.displayPicturesList.map(displayPictureLink => (
                                    <div className='checkBox'>
                                        <label>
                                        <input class="with-gap"value={displayPictureLink} name="group2" type="radio" onChange={this.onAvatarRadioChange} />
                                        <span>
                                            <Avatar displayPicture={displayPictureLink} className='customAvatar' />
                                        </span>
                                        </label>
                                    </div>    
                                ))}
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

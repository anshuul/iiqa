import React, { Component } from "react";
import SignUpImage from "../../assets/signup.svg";
import { Formik } from 'formik'
import * as yup from 'yup'

import { signUpForTeacher, signUpForStudent } from '../../services/userServices'
import { AuthContext } from '../../context/authContext'
import Loading from '../layout/Loading'
import ErrorText from '../layout/ErrorText'

function capitalize(string){
  return string.charAt(0).toUpperCase() + string.slice(1)
}

class SignUp extends Component {

  constructor(props){
    super(props)
    this.state = {
      loading: false,
      type: null,
      isTypeErrorDisplayed:false,
    };

    this.onTypeRadioChange = this.onTypeRadioChange.bind(this)
  }

  onTypeRadioChange(event){
    this.setState({...this.state, type:event.target.value})
  }

  enableLoading(){
    this.setState({loading:true})
  }

  disableLoading(){
    this.setState({loading:false})
  }

  componentDidMount() {
    console.log(this.props)
  }
  

  render() {
    const validationSchema = yup.object({
      fname: yup.string().required('First Name is required'),
      lname: yup.string().required('Last Name is required'),
      // type: yup.string().required('Please select one of the user types'),
      email: yup.string().required('Email Id is required').email('Invalid Email'),
      password: yup.string().required('Please enter your Password of minimum 6 characters').min(7, 'Password must be more thant 6 character'),
      confirmPassword: yup.string().required('Please Confirm your Password').oneOf([yup.ref('password'), null],'Passwords must match')
    })
    return (
      <div className="container">
      {this.state.loading && <Loading message='Creating your Account. Please wait. '/>}
        <Formik
          initialValues = {{fname: '', lname: '', type: '', email: '', password: '', confirmPassword: ''}}
          validationSchema={validationSchema}
          onSubmit={async (values, action)=>{
            try{
              if(this.state.type === null){
                this.setState({...this.state, isTypeErrorDisplayed:true})
              } else {
                this.setState({...this.state, isTypeErrorDisplayed:false})
                this.enableLoading()
                let message = ''
                let uid = null
                if(this.state.type === '1'){ // 1 for teacher temporary TODO: change to select value condition
                  uid = await signUpForTeacher(values.email, values.password, capitalize(values.fname), capitalize(values.lname))
                  message = 'New Teacher Account created Succesfully'
                } else {
                  uid = await signUpForStudent(values.email, values.password, values.fname, values.lname)
                  message = 'New Student Account created Succesfully'
                }
                alert(message)
                console.log(this.props.currentUser)
                this.props.setCurrentUser({uid})
                this.props.history.push('/classroom')
              }
            }catch(err){
              alert(err.message)
            }
            finally{
              this.disableLoading()
            }
          }}>
          {(props)=>(
        <div className="white">
          <h3 className="black-text text-darken-4">New here?</h3>
          <h6 className="grey-text text-lighten-1">
            Please Signup to join us!!
          </h6>
          <div className="container">
            <center>
              <img
                src={SignUpImage}
                alt="SignUpImage"
                height="50%"
                width="50%"
              />
            </center>
          </div>
          <div className="input-field">
            <label htmlFor="firstname">First Name *</label>
            <input
              type="text"
              id="firstname"
              {...props.getFieldProps('fname')}
            />
            
            {props.touched.fname && props.errors.fname && 
              <ErrorText errorText={props.errors.fname} />}
          </div>
          <div className="input-field">
            <label htmlFor="lastname">Last Name *</label>
            <input
              type="text"
              id="lastname"
              {...props.getFieldProps('lname')}
            />
            
            {props.touched.lname && props.errors.lname && 
              <ErrorText errorText={props.errors.lname} />}
          </div>
          <div style={{display:'flex',flexWrap:'wrap', alignItems:'center'}} >
            <div style={{marginRight:'10px'}}>
                <label style={{fontSize:'1rem'}}>
                Are you a student or a teacher? *
                </label>
            </div>  
            <div style={{marginRight:'10px'}}>
              <label>
              <input className="with-gap" value={1} name="group1" type="radio" onChange={this.onTypeRadioChange} />
              <span>Teacher</span>
              </label>
            </div>
            <div style={{marginRight:'10px'}}>
              <label>
              <input className="with-gap" value={0} name="group1" type="radio" onChange={this.onTypeRadioChange} />
              <span>Student</span>
              </label>
            </div>
            {this.state.isTypeErrorDisplayed && <p style={{fontSize:'12px'}}><ErrorText errorText='Please select user type'/></p>}
          </div>
          {/*<div className="input-field">
            <label htmlFor="usertype">Are you a student or a teacher? *</label>
            <input
              type="text"
              id="usertype"
              {...props.getFieldProps('type')}
            />
            
            {props.touched.type && props.errors.type && 
            <ErrorText errorText={props.errors.type} />}
            </div>*/}
          <div className="input-field">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              {...props.getFieldProps('email')}
            />
            
            {props.touched.email && props.errors.email && 
              <ErrorText errorText={props.errors.email} />}
          </div>
          <div className="input-field">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              {...props.getFieldProps('password')}
            />
            
            {props.touched.password && props.errors.password && 
              <ErrorText errorText={props.errors.password} />}
          </div>
          <div className="input-field">
            <label htmlFor="confirmpassword">Confirm Password *</label>
            <input
              type="password"
              id="confirmpassword"
              {...props.getFieldProps('confirmPassword')}
            />
            
            {props.touched.confirmPassword && props.errors.confirmPassword && 
              <ErrorText errorText={props.errors.confirmPassword} />}
          </div>
          <div className="input-field">
            <center>
              <input type='submit' value='Sign Up' className="btn blue darken-3 z-depth-0" onClick={props.handleSubmit}/>
            </center>
          </div>
        </div>
        )}
        </Formik>
      </div>
    );
  }
}

export default function ComponentWithContext(props) {
  return (
    <AuthContext.Consumer>
    {({currentUser, setCurrentUser}) => <SignUp {...props} currentUser = {currentUser} setCurrentUser={setCurrentUser}/>}
    </AuthContext.Consumer>
  )
}

import React, { Component } from "react";
import SignInImage from "../../assets/login.svg";
import { Formik } from 'formik'
import * as yup from 'yup'

import { signIn, signOut } from '../../services/userServices'
import { AuthContext } from '../../context/authContext'
import Loading from '../layout/Loading'

class SignIn extends Component {
  state = {
    loading: false,
  };

  componentDidMount(){
    signOut()
    .then(()=>{
      console.log('signed out')
    })
  }

  componentDidUpdate(){ // caled when redirected to this page
    signOut()
    .then(()=>{
      console.log('signed out')
    })
  }

  enableLoading(){
    this.setState({loading:true})
  }

  disableLoading(){
    this.setState({loading:false})
  }

  render(){
    const validationSchema = yup.object({
      email: yup.string().required().email('Invalid Email'),
      password: yup.string().required()
    })

    return (
      
    
  <AuthContext.Consumer>
    {({currentUser}) => (
      <div className="container">
        {currentUser && currentUser.uid}
        {this.state.loading && <Loading message='Signing you in. Please wait. '/>}
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={validationSchema}
          onSubmit = { async (values, actions) => {
            console.log('submitted')
            console.log(values.email, values.password)
            try{
              this.enableLoading()
              await signIn(values.email, values.password)
              alert('User signed in Succesfully')
            }catch(err){
              alert(err.message)
            }
            finally{
              this.disableLoading()
            }
          }}
        >
        {(props) => (
        <div className="white">
          <h3 className="black-text text-darken-4">Welcome Back!</h3>
          <h6 className="grey-text text-lighten-1">Please Login to continue</h6>
          <div className="container">
            <center>
              <img
                src={SignInImage}
                alt="loginImage"
                height="50%"
                width="50%"
              />
            </center>
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...props.getFieldProps('email')}
            />
            
            {props.touched.email && props.errors.email && 
            <span className="helper-text" data-error="wrong" data-success="right">
              {props.errors.email}
            </span>}
            
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...props.getFieldProps('password')}
            />
            {props.touched.password && props.errors.password && 
              <span className="helper-text" data-error="wrong" data-success="right">
                {props.errors.password}
              </span>}
          </div>
          <div className="input-field">
            <center>
              <input
                type='submit'
                value='Login' 
                className="btn blue darken-3 z-depth-0 center-align" 
                onClick={()=>{
                  
                  props.handleSubmit()
                }}
              />
                
            </center>
          </div>
        </div>
        )}
        </Formik>
      </div>
    )}
  </AuthContext.Consumer>
    )
  }
}

export default SignIn;

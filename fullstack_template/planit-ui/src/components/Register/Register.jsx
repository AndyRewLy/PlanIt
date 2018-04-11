import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import React, { Component } from 'react';

require('./Register.css');

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			first_name:'',
			last_name:'',
			email:'',
      password:'',
      errorMessageVisible: false,
      firstNameError: '',
      lastNameError: '',
      emailError:'',
      passwordError:''
    }
    
    this.toggleErrorMessage = this.toggleErrorMessage.bind(this);
    this.handleClick = this.handleClick.bind(this);
	}

  handleClick() {
    var state = this.state;
    delete state["errorMessageVisible"];

    this.props.register(state, 
      () => this.props.history.push("/login"),
      () => this.toggleErrorMessage()); 
  }

  toggleErrorMessage() {
    this.setState({errorMessageVisible: !this.state.errorMessageVisible});
  }

	render() {
		return (
			<div className="center">
        <Dialog
         open={true}
         className="dialog-style"
         contentStyle={{width: "25%", maxWidth: "none"}}>
          <div className="center">
           <h1 className="planit-title">Register for PlanIt!</h1>
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             errorStyle={errorStyle}
             errorText={this.state.firstNameError}
             onChange = {(event,newValue) => {
               if (newValue) {
                 this.setState({firstNameError:'', first_name:newValue})
               }
               else {
                this.setState({firstNameError:'Required Field', first_name:newValue})                 
               }
              }}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             errorStyle={errorStyle}
             errorText={this.state.lastNameError}
             onChange = {(event,newValue) => {
              if (newValue) {
                this.setState({lastNameError:'', last_name:newValue})
              }
              else {
               this.setState({lastNameError:'Required Field', last_name:newValue})                 
              }
             }}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             type="email"
             errorStyle={errorStyle}
             errorText={this.state.emailError}
             floatingLabelText="Email"
             onChange = {(event,newValue) => {
              if (newValue.includes("@")) {
                this.setState({emailError:'', email:newValue})
              }
              else {
               this.setState({emailError:'Invalid Email Input', email:newValue})                 
              }
             }}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             errorStyle={errorStyle}
             errorText={this.state.passwordError}
             onChange = {(event,newValue) => {
              if (newValue.length >= 6) {
                this.setState({passwordError:'', password:newValue})
              }
              else {
               this.setState({passwordError:'Password must be at least six characters long', password:newValue})                 
              }
             }}
             />
           <br/>
           {this.state.errorMessageVisible ? <p>Email already in use</p> : ''}
           <RaisedButton label="Register" primary={true} style={style} onClick={(event) => this.handleClick()}/>
           <br/>
					<FlatButton label="Already Registered? Click Here" primary={true} onClick={() => this.props.history.push("/login")}/>           
          </div>
         </Dialog>
      </div>
		);
    }
}

const style = {
    margin: 15,
};

const errorStyle = {
    textAlign: 'left'
}

export default Register;
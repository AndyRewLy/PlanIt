import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import React, { Component } from 'react';

require('../../css/Login.css')
class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			first_name:'',
			last_name:'',
			email:'',
			password:''
		}
	}

	render() {
		return (
			<div className="center">
        <MuiThemeProvider>
          <div>
           <h1 className="planit-title">Welcome to PlanIt!</h1>
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             onChange = {(event,newValue) => this.setState({last_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
          </div>
         </MuiThemeProvider>
      </div>
		);
	}

  handleClick(event) {
    console.log(this.state);
    fetch('/register', {
      method: 'POST',
      dataType: 'json',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    }).then(function (response) {
      if (response.status == 200) {
        return response.json()
      }
      else {
        return response.json().catch(err => {
          throw new Error(response.statusText);
        }).then(json => {
          throw new Error(json.message);
        });
      }
    }).then(function (data) {//on status == 200
      console.log(data.message);
    }).catch(function (error) {//on status != 200
      alert(error.message);
    });
  }
}

const style = {
  margin: 15,
};


export default Register;
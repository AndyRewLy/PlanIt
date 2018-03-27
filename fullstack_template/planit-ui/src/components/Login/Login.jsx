import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

import React, { Component } from 'react';

require('./Login.css');

class Login extends Component {
	constructor(props) {
		super(props);
		this.state={
			username:'',
			password:'',
			errorMessageVisible: false,
		}
		this.logIn = this.logIn.bind(this)
        this.toggleErrorMessage = this.toggleErrorMessage.bind(this);
	}

    logIn() {
        console.log("Component log in with " + this.state);
        this.props.signIn({
            username: this.state.username,
            password: this.state.password
        }, () => {
            this.props.history.push("/");
		}, () => {
			this.toggleErrorMessage();
		});
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
					<h1 className="planit-title">Log in to PlanIt!</h1>
					<TextField hintText="Enter your Email" floatingLabelText="Email" onChange={(event, newValue) => 
						this.setState({username: newValue})}/>
					<br/>
					<TextField type="password" hintText="Enter your Password" floatingLabelText="Password" onChange={(event, newValue) => 
						this.setState({password: newValue})}/>
					<br/>
					{this.state.errorMessageVisible && <p>Invalid Email or Password</p>}
					<RaisedButton label="Submit" primary={true} style={style} onClick={() => this.logIn()}/>
					<br/>
					<FlatButton label="Not Registered? Click Here" primary={true} onClick={() => this.props.history.push("/register")}/>
					</div>
				</Dialog>
			</div>
		);
    }
}

const style = {
    margin: 15,
};

export default Login;
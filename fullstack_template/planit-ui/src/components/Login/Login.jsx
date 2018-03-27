import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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
        });
    }

	toggleErrorMessage() {
		this.setState({errorMessageVisible: !this.state.errorMessageVisible});
    }
    
	render() {
		return (
			<div className="center">
				<MuiThemeProvider>
					<div>
					<h1 className="planit-title">Welcome to PlanIt!</h1>
					<TextField hintText="Enter your Email" floatingLabelText="Email" onChange={(event, newValue) => 
						this.setState({username: newValue})}/>
					<br/>
					<TextField type="password" hintText="Enter your Password" floatingLabelText="Password" onChange={(event, newValue) => 
						this.setState({password: newValue})}/>
					<br/>
					{this.state.errorMessageVisible && <p>Invalid Email or Password</p>}
					<RaisedButton label="Submit" primary={true} style={style} onClick={() => this.logIn()}/>
					</div>
				</MuiThemeProvider>
			</div>
		);
    }
}

const style = {
    margin: 15,
};

export default Login;
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import React, { Component } from 'react';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state={
			username:'',
			password:'',
			errorMessageVisible: false,
		}
		this.handleClick = this.handleClick.bind(this)
		this.toggleErrorMessage = this.toggleErrorMessage.bind(this);
	}

	toggleErrorMessage() {
		this.setState({errorMessageVisible: !this.state.errorMessageVisible});
	}

	render() {
		return (
			<div>
				<MuiThemeProvider>
					<div>
					<AppBar title="Login"/>
					<TextField hintText="Enter your Email" floatingLabelText="Email" onChange={(event, newValue) => 
						this.setState({username: newValue})}/>
					<br/>
					<TextField type="password" hintText="Enter your Password" floatingLabelText="Password" onChange={(event, newValue) => 
						this.setState({password: newValue})}/>
					<br/>
					{this.state.errorMessageVisible && <p>Invalid Email or Password</p>}
					<RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
					</div>
				</MuiThemeProvider>
			</div>
		);
	}

	handleClick(event) {
		var self = this;
		var app = self.props.appContext;

		console.log(self);

		fetch('/login', {
			method: 'POST',
			dataType: 'json',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({username: self.state.username, password: self.state.password})
		}).then(function (response) {
			if (response.status != 200) {
				self.toggleErrorMessage();
			}
			return response.json();
		}).then(function (data) {
			const json = data;
			//storing JWT to a cookie
			document.cookie = "access_token= JWT " + json["access_token"]
			app.handleLogin(self.state.username)
		}).catch(function (error) {
		});
	}

}

const style = {
 margin: 15,
};

export default Login;

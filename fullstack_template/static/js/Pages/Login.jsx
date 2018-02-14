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
		}
		this.handleClick = this.handleClick.bind(this)
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
					<RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
					</div>
				</MuiThemeProvider>
			</div>
		);
	}

	handleClick(event) {
		var self = this;
		var app = self.props.appContext;

		console.log(app)

		fetch('/login', {
			method: 'POST',
			dataType: 'json',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(this.state)
		}).then(function (response) {
			if (response.status != 200) {
				throw Error("Invalid Credentials")
			}
			return response.json();
		}).then(function (data) {
			const json = data;
			//storing JWT to a cookie
			document.cookie = "access_token= JWT " + json["access_token"]
			app.handleLogin(self.state.username)
		}).catch(function (error) {
			alert(error)
		});
	}

}

const style = {
 margin: 15,
};

export default Login;

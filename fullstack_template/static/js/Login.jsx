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
					<TextField hintText="Enter your Username" floatingLabelText="Username" onChange={(event, newValue) => 
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
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify(this.state)
		}).then(function(response) {
                	return response.json();
                        //var promise = response.text();
                        //console.log(promise);
                        //console.log(promise.value);
			//console.log("Current definition of app is:");
			//console.log(app);
                        
		}).then(function(data) {
                	const response = data;
                        const json = JSON.parse(response);
                	console.log(json);
                        if(json['loginStatus'] === "successful login") {
				app.handleLogin(self.state.username)
                        }
                        else {
				app.handleLogin("")
                        }
                })
	}

}

const style = {
 margin: 15,
};

export default Login;

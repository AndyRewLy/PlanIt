import React, { Component } from 'react';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state={
			username:'',
			password:'',
		}
	}

	render() {
		return (
			<div>
				<input type="text" name="username" onChange={(event, newValue) => 
					this.setState({username: newValue})}></input>
				<br/>
				<input type="text" name="password" onChange={(event, newValue) => 
					this.setState({password: newValue})}></input>
				<input type="button" value="Submit" primary={true} onClick={(event) => this.handleClick(event)}></input>
			</div>
		);
	}

	handleClick(event) {
		console.log("TO DO")
	}

}

export default Login;
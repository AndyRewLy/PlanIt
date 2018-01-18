import React, { Component } from 'react';

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
			<form>
				<div><input name="First Name" onChange = { (event, newValue) => 
					this.setState({first_name: newValue})}></input></div>
				<div><input name="Last Name" onChange = { (event, newValue) => 
					this.setState({last_name: newValue})}></input></div>
				<div><input name="Email" onChange = { (event, newValue) => 
					this.setState({email: newValue})}></input></div>
				<div><input name="Password" onChange = { (event, newValue) => 
					this.setState({password: newValue})}></input></div>
				<input type="button" value="Submit" primary={true} onClick={(event) => this.handleClick(event)}/>
			</form>
		);
	}

	handleClick(event) {
		console.log("TO DOOOOO")
	}
}

export default Register;
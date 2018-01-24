//App.jsx

import React, { Component } from 'react';
//import injectTapEventPlugin from 'react-tap-event-plugin';

//injectTapEventPlugin();

import LoginScreen from './LoginScreen';

class App extends React.Component {

	 constructor(props){
	     super(props);
	     this.state={
	       loginPage:[],
	       uploadScreen:[],
	       userLoggedIn:false,
	       username:"",
	     }
	     this.handleLogin = this.handleLogin.bind(this);
	 }
	
	 componentWillMount(){
	     var loginPage =[];
	     loginPage.push(<LoginScreen parentContext={this}/>);
	     this.setState({
	                   loginPage:loginPage
	                     })
	 }
	  
	render() {
	    return (
	      <div className="App">
	        {this.state.loginPage}
	        {this.state.uploadScreen}
	        <p>Current User: {this.state.username}</p>
	      </div>
	    );
	}

	handleClick(event) {
		console.log(this.state);
	}

	handleLogin(username) {
		this.setState({userLoggedIn:true, username: username});
	}
}

export default App;

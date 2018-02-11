//App.jsx

import React, { Component } from 'react';
//import injectTapEventPlugin from 'react-tap-event-plugin';

//injectTapEventPlugin();

import LoginScreen from './Pages/LoginScreen';
import HomeScreen from './Pages/HomeScreen';

class App extends React.Component {

	 constructor(props){
	     super(props);
	     this.state={
	       loginPage:[],
	       homeScreen:[],
	       userLoggedIn:false,
				 username:"",
				 isAdmin: true,
	     }
		 this.handleLogin = this.handleLogin.bind(this);
		 this.handleLogout = this.handleLogout.bind(this);
	 }
	
	 componentWillMount(){
	      var loginPage =[];
	      loginPage.push(<LoginScreen className="Login" parentContext={this}/>);
	      this.setState({
	                    loginPage:loginPage})
	 }
	  
	render() {
	    return (
	      <div className="App">
	        {this.state.loginPage}
	        {this.state.homeScreen}
	      </div>
	    );
	}

	handleClick(event) {
		console.log(this.state);
	}

	handleLogin(username) {
		var loginPage = [];
		var homeScreen = [];

		this.setState({userLoggedIn:true, username: username});
	
		homeScreen.push(<HomeScreen parentContext={this}/>);
		this.setState({loginPage:loginPage, homeScreen:homeScreen});
	}

	handleLogout() {
		document.cookie="access_token=undefined";
		
		var loginPage = [];
		var homeScreen = [];

		loginPage.push(<LoginScreen className="Login" parentContext={this}/>);
		
		this.setState({loginPage:loginPage, 
			           homeScreen:homeScreen});
	}
}

export default App;

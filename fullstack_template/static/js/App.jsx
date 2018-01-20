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
	       uploadScreen:[]
	     }
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
	      </div>
	    );
	}

}

export default App;
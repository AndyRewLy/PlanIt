import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import {Home, Group, Event, ExitToApp} from 'material-ui-icons';

import HomePage from './HomePage';
import MyEvents from './MyEvents';
import MyOrganizations from './MyOrganizations';

import CardContainer from '../Card/CardContainer';
import React, { Component } from 'react';

require('../../css/App.css');

class HomeScreen extends React.Component {
    constructor(props){
    	super(props);
    	this.state={
            homePage:[],
            myOrganizations:[],
            myEvents:[],
            open: false,
            //Determine this later
        }

        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    
    componentWillMount(){
		var homePage = [];
		homePage.push(<HomePage parentContext={this} key="HomePage"/>);
		this.setState({homePage:homePage});
     }
     
    render() {
      return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <AppBar className="PlanIt" title="PlanIt" iconClassNameRight="muidocs-icon-navigation-expand-more" onLeftIconButtonClick={this.handleToggle}/>
                </MuiThemeProvider>
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <Drawer docked={false} width={200} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
                    <MenuItem onClick={this.handleClose} value="home" primaryText="Home" rightIcon={<Home/>}></MenuItem>
                    <MenuItem onClick={this.handleClose} value="myOrgs" primaryText="My Organizations" rightIcon={<Group/>}></MenuItem>
                    <MenuItem onClick={this.handleClose} value="myEvents" primaryText="My Events" rightIcon={<Event/>}></MenuItem>
                    <MenuItem onClick={this.handleClose} value="logOut" primaryText="Logout" rightIcon={<ExitToApp/>}></MenuItem>
                </Drawer>
                </MuiThemeProvider>
                <div>
                    {this.state.homePage}
                    {this.state.myOrganizations}
                    {this.state.myEvents}
                </div>
            </div>
      );
    }

    handleToggle() {
        this.setState({open: !this.state.open});
    }

    handleClose(event) {
        var target = event.target.textContent;
        var homePage = [];
        var myOrganizations = [];
        var myEvents = [];
    
        if (target && target === "Home") {
            homePage.push(<HomePage parentContext={this} key="HomePage"/>);
            this.setState({homePage:homePage, 
                           myOrganizations: myOrganizations, 
                           myEvents: myEvents});
        }
        else if (target && target === "My Organizations") {
            myOrganizations.push(<MyOrganizations parentContext={this} key="MyOrganizations"/>);
            this.setState({homePage:homePage, 
                           myOrganizations: myOrganizations, 
                           myEvents: myEvents});
        }
        else if (target && target === "My Events") {
            myEvents.push(<MyEvents parentContext={this} key="MyEvents"/>);
            this.setState({homePage:homePage, 
                           myOrganizations: myOrganizations, 
                           myEvents: myEvents});
        }
        else if (target && target === "Logout") {
            this.props.parentContext.handleLogout();
        }

        this.setState({open: false});
    }


}

const style = {
    margin: 15,
};

export default HomeScreen;
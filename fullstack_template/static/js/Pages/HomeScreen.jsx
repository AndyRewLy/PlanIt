import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import {Home, Group, Event, ExitToApp} from 'material-ui-icons';

import CardContainer from '../Card/CardContainer';
import React, { Component } from 'react';

require('../../css/App.css');

class HomeScreen extends React.Component {
    constructor(props){
    	super(props);
    	this.state={
            open: false
            //Determine this later
        }

        this.handleToggle = this.handleToggle.bind(this)
    }
    
    render() {
      return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <AppBar className="PlanIt" title="PlanIt" iconClassNameRight="muidocs-icon-navigation-expand-more" onLeftIconButtonClick={this.handleToggle}/>
                </MuiThemeProvider>
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <Drawer docked={false} width={200} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
                    <MenuItem onClick={this.handleClose} primaryText="Home" rightIcon={<Home/>}></MenuItem>
                    <MenuItem onClick={this.handleClose} primaryText="My Organizations" rightIcon={<Group/>}></MenuItem>
                    <MenuItem onClick={this.handleClose} primaryText="My Events" rightIcon={<Event/>}></MenuItem>
                    <MenuItem onClick={this.handleClose} primaryText="Logout" rightIcon={<ExitToApp/>}></MenuItem>
                </Drawer>
                </MuiThemeProvider>
                <p> My Upcoming Events </p>
                <CardContainer cards={this.state.cards}/>
            </div>
      );
    }

    handleToggle() {
        this.setState({open: !this.state.open});
    }

    handleClose() {
        this.setState({open: false});
    }


}

const style = {
    margin: 15,
};

export default HomeScreen;
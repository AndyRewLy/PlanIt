import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Login, Register, HomePage, MyOrgs, MyEvents, RSVPEvents } from '../index';
import { Route, Switch, Redirect, Link } from 'react-router-dom';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import {Home, Group, Event, ExitToApp} from 'material-ui-icons';


class Main extends Component {
    constructor(props) {
        super(props);
        this.state={
            open: false
        }

        this.handleToggle = this.handleToggle.bind(this);
    }
    
    handleToggle() {
        this.setState({open: !this.state.open});
    }

    signedIn() {
        return Object.keys(this.props.User).length !== 0;
    }

    render() {
        console.log("Rendering main ...");

        return (
            <div>
                <MuiThemeProvider> {/*muiTheme={getMuiTheme(darkBaseTheme)}>*/}    
                    {this.signedIn() ? 
                        <div>
                            <AppBar className="PlanIt" 
                             title="PlanIt" 
                             iconClassNameRight="muidocs-icon-navigation-expand-more" 
                             onLeftIconButtonClick={this.handleToggle}/>
                            <Drawer docked={false} width={200} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
                                <MenuItem value="home" primaryText="Home" 
                                 rightIcon={<Home/>}
                                 onClick={() => {
                                    var that = this;

                                    this.props.getAllOrgs(() => 
			                           that.props.getAllMemberOrgs(() => 
                                          that.props.getAllFilteredEvents("")
                                    ));
                                    that.props.history.push("/home");
                                    this.handleToggle();
                                 }}>
                                </MenuItem>
                                <MenuItem value="manageOrgs" primaryText="Manage Orgs" 
                                 rightIcon={<Group/>}
                                 onClick={() => {
                                    this.props.getAllAdminOrgs();
                                    this.props.history.push("/manageOrgs");
                                    this.handleToggle();
                                 }}>
                                 </MenuItem>
                                 <MenuItem value="myOrgs" primaryText="My Orgs" 
                                 rightIcon={<Group/>}
                                 onClick={() => {
                                    this.props.getAllMemberOrgs();
                                    this.props.history.push("/myOrgs");
                                    this.handleToggle();
                                 }}>
                                </MenuItem>
                                <MenuItem value="manageEvents" primaryText="Manage Events" 
                                 rightIcon={<Event/>}
                                 onClick={() => {
                                    this.props.getAllAdminEvents();
                                    this.props.history.push("/manageEvents");
                                    this.handleToggle();                                
                                 }}>
                                </MenuItem>
                                <MenuItem value="myEvents" primaryText="My Events" 
                                 rightIcon={<Event/>}
                                 onClick={() => {
                                    this.props.getAllRSVPEvents();
                                    this.props.history.push("/myEvents");
                                    this.handleToggle();                                
                                 }}>
                                </MenuItem>
                                <MenuItem value="logOut" primaryText="Logout" 
                                 rightIcon={<ExitToApp/>}
                                 onClick={() => {
                                     var that = this;
                                     this.props.signOut(() => that.props.history.push("/login"));
                                     this.handleToggle();
                                 }}>
                                </MenuItem>
                            </Drawer>
                        </div>
                    :
                    ''
                    }
                    <Switch>
                        <Route exact path='/' render={() => {
                            if (this.signedIn()) {
                                return (<Redirect to='/home'/>);
                            }
                            else {
                                return (<Redirect to='/login'/>);
                            }
                        }}/>
                        <Route path='/login' 
                         render={() => <Login {...this.props} />}/>
                        <Route path='/register'
                         render={() => <Register {...this.props} />}/>
                        <Route path='/home'
                         render={() => <HomePage {...this.props}/>}/>
                        <Route path='/manageOrgs'
                         render={() => <MyOrgs type="Admin" {...this.props}/>}/>
                         <Route path='/myOrgs'
                         render={() => <MyOrgs type="Member" {...this.props}/>}/>
                        <Route path='/manageEvents'
                         render={() => <MyEvents {...this.props}/>}/> 
                        <Route path='/myEvents'
                         render={() => <RSVPEvents {...this.props}/>}/> 

                </Switch>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default Main;
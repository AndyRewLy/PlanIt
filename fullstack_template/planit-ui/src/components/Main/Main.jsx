import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Login, Register, HomePage, MyOrgs, MyEvents, RSVPEvents, OrgEvents } from '../index';
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
        this.signedIn = this.signedIn.bind(this);
    }
    
    componentWillMount() {
        console.log("Why am i in here");
        if (this.props.User.cookie && this.props.User.cookie) {
            this.props.persistLogin(this.props.User.cookie);
        }
    }
    handleToggle() {
        this.setState({open: !this.state.open});
    }

    signedIn() {
        return this.props.User && this.props.User.cookie;
    }

    render() {
        console.log("Rendering main ...");

        return (
            <div>
                <MuiThemeProvider> {/*muiTheme={getMuiTheme(darkBaseTheme)}>*/}    
                    {this.signedIn() ? 
                        <div>
                            <AppBar className="PlanIt" 
                             title="PLAN IT" 
                             iconClassNameRight="muidocs-icon-navigation-expand-more" 
                             onLeftIconButtonClick={this.handleToggle}/>
                            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
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
                                 <MenuItem value="myOrgs" primaryText="My Orgs" 
                                 rightIcon={<Group/>}
                                 onClick={() => {
                                    this.props.getAllMemberOrgs();
                                    this.props.history.push("/myOrgs");
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
                            </MuiThemeProvider>
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
                         render={() => !this.signedIn() ? <Redirect to='/login'/> : <HomePage {...this.props}/>}/>
                        <Route path='/manageOrgs'
                         render={() => !this.signedIn() ? <Redirect to='/login'/> : <MyOrgs type="Admin" {...this.props}/>}/>
                         <Route path='/myOrgs'
                         render={() => !this.signedIn() ? <Redirect to='/login'/> : <MyOrgs type="Member" {...this.props}/>}/>
                        <Route path='/manageEvents'
                         render={() => !this.signedIn() ? <Redirect to='/login'/> : <MyEvents {...this.props}/>}/> 
                        <Route path='/myEvents'
                         render={() => !this.signedIn() ? <Redirect to='/login'/> : <RSVPEvents {...this.props}/>}/> 
                        <Route path='/orgEvents'
                         render={() => !this.signedIn() ? <Redirect to='/login'/> : <OrgEvents {...this.props}/>}/>
                </Switch>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default Main;
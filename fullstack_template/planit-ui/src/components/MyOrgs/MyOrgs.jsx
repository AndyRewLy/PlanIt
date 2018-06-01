import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import ToggleButton from 'react-toggle-button'

import OrgCardContainer from '../CardContainer/OrgCardContainer';
import OrgCard from '../Card/OrgCard';

import CreateOrgDialog from '../Dialog/CreateOrgDialog';
import OrgInfoDialog from '../Dialog/OrgInfoDialog';
import {OrgEvents } from '../index';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import React, { Component } from 'react';


require('./MyOrgs.css');

class MyOrgs extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isCreateVisible: false,
            isInfoVisible: false,
            orgInfo: {}
        }

        this.handleOrgRoleChange = this.handleOrgRoleChange.bind(this);
        this.viewAllEvents = this.viewAllEvents.bind(this);
        this.closeCreateDialog = this.closeCreateDialog.bind(this);
        this.closeInfoDialog = this.closeInfoDialog.bind(this);
        this.changeOrgInfoVisible = this.changeOrgInfoVisible.bind(this);
    }

    changeOrgInfoVisible(orgId) {
        var org = {};
        this.props.type === "Admin" ? 
         org = this.props.AdminOrgs.filter(org => org.organizationId === orgId)[0]
        :
         org = this.props.MemberOrgs.filter(org => org.organizationId === orgId)[0];
        
        console.log("Organization was...");
        console.log(org);
        this.props.getMembers(orgId, () => this.setState({orgInfo: org, isInfoVisible: true}));
    }

    closeCreateDialog() {
        this.setState({isCreateVisible: false});
    }

    closeInfoDialog() {
        this.setState({isInfoVisible: false});
    }

    handleOrgRoleChange(value) {
        if(value == false) {
            this.props.getAllAdminOrgs();
            this.props.history.push("/manageOrgs");
        }
        else {
            this.props.getAllMemberOrgs();
            this.props.history.push("/myOrgs");
        }
    }

    viewAllEvents(orgId) {
        this.props.getOrganizationEvents(orgId);
        this.props.history.push("/orgEvents");
    }

    render() {
        return (
            <div style={style}>
               {this.props.type === "Admin" ?
               <div>
                  <div className="rowComponent">
                    <div className="sub-row">
                        <h1 className="float-left" style={{paddingTop: 20 + 'px', fontSize: 16 + 'px'}}>Organizations You Are an Admin of: </h1>
                        <RaisedButton className="float-left" label="Create Organization" primary={true} style={style} onClick={() => this.setState({isCreateVisible:true})}/>
                    </div>
                    <div>
                        <ToggleButton 
                            containerStyle={toggleButtonStyle.containerStyle} 
                            trackStyle={toggleButtonStyle.trackStyle} 
                            thumbStyle={toggleButtonStyle.thumbStyle}
                            thumbAnimateRange={toggleButtonStyle.thumbAnimateRange} 
                            activeLabelStyle={toggleButtonStyle.activeLabelStyle}
                            inactiveLabelStyle={toggleButtonStyle.inactiveLabelStyle}
                            colors={toggleButtonStyle.colors}
                            inactiveLabel={"Member"}
                            activeLabel={"Admin"}
                            value={true} 
                            onToggle={this.handleOrgRoleChange}/>
                    </div>
                  </div>
                  <OrgCardContainer cards={this.props.AdminOrgs} renderOrgInfo={this.changeOrgInfoVisible}/>
              </div>
              :
              <div>
                  <div className="rowComponent">
                    <h1 style={{paddingTop: 20 + 'px', fontSize: 16 + 'px'}}>Organizations You Are a Member of: </h1>
                    <div>
                        <ToggleButton 
                            containerStyle={toggleButtonStyle.containerStyle} 
                            trackStyle={toggleButtonStyle.trackStyle} 
                            thumbStyle={toggleButtonStyle.thumbStyle}
                            thumbAnimateRange={toggleButtonStyle.thumbAnimateRange} 
                            activeLabelStyle={toggleButtonStyle.activeLabelStyle}
                            inactiveLabelStyle={toggleButtonStyle.inactiveLabelStyle}
                            inactiveLabel={"Member"}
                            activeLabel={"Admin"}
                            value={false} 
                            onToggle={this.handleOrgRoleChange}/>
                    </div>
                  </div>
                  <OrgCardContainer cards={this.props.MemberOrgs} renderOrgInfo={this.changeOrgInfoVisible}/>
              </div>
               }
               <OrgInfoDialog isVisible={this.state.isInfoVisible} close={this.closeInfoDialog} org={this.state.orgInfo} viewAllEvents={this.viewAllEvents} {...this.props}/>
               <CreateOrgDialog isVisible={this.state.isCreateVisible} close={this.closeCreateDialog} {...this.props}/>
               
            </div>
        );
    }
}

const style = {
    margin: 15,
};

const toggleButtonStyle = {
    containerStyle: {display:'inline-block',width:'100px',height:'25px'},
    trackStyle:{width:'100px', height:'25px'},
    thumbStyle:{width:'25px', height:'25px'},
    thumbAnimateRange:[1, 80],
    activeLabelStyle:{ width:'30px', fontSize:'13px'},
    inactiveLabelStyle:{ width:'30px', fontSize:'13px'},
    colors:{
        active: {
          base: '#3E5C76',
        },
      }
};


export default MyOrgs;
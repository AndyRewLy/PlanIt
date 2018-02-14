import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import OrgCardContainer from '../Card/OrgCardContainer';
import OrgCard from '../Card/OrgCard';
import React, { Component } from 'react';

require('../../css/MyOrganizations.css');

const organizationTypes = ["Academic", "Community Service", "Council", "Cultural", "Environmental", "Honor", "National Society", "Performing Arts", "Political", "Professional", "Recreational", "Religious", "Special Interest"];
const orgTypeMenuItems = [];

for (var i = 0; i < organizationTypes.length; i++) {
    orgTypeMenuItems.push(<MenuItem value={organizationTypes[i]} key={organizationTypes[i]} primaryText = {organizationTypes[i]}/>);
}

class MyOrganizations extends React.Component {
    constructor(props){
        super(props);

        this.state={
            isCreateCallOutVisible: false,
            organizationType: undefined,
            organizationName: undefined,
            adminOrgs: [],
            memberOrgs: [],
            //orgCards: [{organizationName: "WISH", organizationDescription: "Women in software and hardware"},
            //           {organizationName: "Natasha", organizationDescription: "Cats"}],
            orgCards: [],
        }

        this.renderOrgForm = this.renderOrgForm.bind(this);
        this.showCreateOrgCallOut = this.showCreateOrgCallOut.bind(this);
        this.handleOrgTypeChange = this.handleOrgTypeChange.bind(this);
        this.handleOrgNameChange = this.handleOrgNameChange.bind(this);
        this.handleOrgDescriptionChange = this.handleOrgDescriptionChange.bind(this);
        this.closeOrgDialog = this.closeOrgDialog.bind(this);
        this.submitOrganization = this.submitOrganization.bind(this);

        this.getUserAdminOrganizations = this.getUserAdminOrganizations.bind(this);
    }

    componentDidMount() {
        var organizationInterval = setInterval(this.getUserAdminOrganizations, 1000);
        this.setState({organizationInterval: organizationInterval});
    }

    componentWillUnmount() {
        clearInterval(this.state.organizationInterval);
    }

    getUserAdminOrganizations() {
        var that = this;
        console.log("Getting all the user admin orgs...");
        fetch('/organizations', {
          method: 'GET',
          dataType: 'json',
          headers: { 'Content-Type': 'application/json', 'Authorization' : this.getCookie("access_token")},
        }).then(function (response) {
          if (response.status == 200) {
            console.log("we here now");
            return response.json()
          }
          else {
            return response.json().catch(err => {
              throw new Error(response.statusText);
            }).then(json => {
              throw new Error(json.message);
            });
          }
        }).then(function (data) {//on status == 200
          console.log(data.message);
          that.setState({orgCards: data.message});
        }).catch(function (error) {//on status != 200
          alert(error.message);
        });

    }

    handleOrgNameChange(event, value) {
        this.setState({organizationName: value});
    }

    handleOrgTypeChange(event, index, value) {
        this.setState({organizationType: value});
    }

    handleOrgDescriptionChange(event, value) {
        this.setState({organizationDescription: value});
    }

    closeOrgDialog() {
        this.setState({isCreateCallOutVisible: false});
    }

    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    submitOrganization() {
        //Make API CAll here to create the new organization currently logs the information to send
            console.log(this.state);
            fetch('/organizations', {
              method: 'POST',
              dataType: 'json',
              headers: { 'Content-Type': 'application/json', 'Authorization' : this.getCookie("access_token")},
              body: JSON.stringify(this.state)
            }).then(function (response) {
              if (response.status == 200) {
                return response.json()
              }
              else {
                return response.json().catch(err => {
                  throw new Error(response.statusText);
                }).then(json => {
                  throw new Error(json.message);
                });
              }
            }).then(function (data) {//on status == 200
              console.log(data.message);
            }).catch(function (error) {//on status != 200
              alert(error.message);
            });
        console.log("I'm currently submitting" + this.state.organizationName + " " + this.state.organizationType);
    }

    renderOrgForm() {
        const cancel = <FlatButton label="Cancel" primary={true} onClick={this.closeOrgDialog}/>
        const submit = <FlatButton label="Submit" primary={true} onClick={this.submitOrganization}/>
        const organizationTypes = ["Academic", "Community Service", "Council", "Cultural", "Environmental", "Honor", "National Society", "Performing Arts", "Political", "Professional", "Recreational", "Religious", "Special Interest"];
        
        return (
            <Dialog title="Create New Organization"
                    modal={true}
                    open={this.state.isCreateCallOutVisible}
                    autoScrollBodyContent={true}>
                    <div>
                        <div>
                            <div>Organization Name</div>
                            <TextField hintText="Type organization name here" onChange={this.handleOrgNameChange}/>
                        </div>
                        <div>
                            <div>Organization Type</div>
                            <DropDownMenu value={this.state.organizationType} onChange={this.handleOrgTypeChange}>
                                {orgTypeMenuItems}
                            </DropDownMenu>
                        </div>
                        <div>
                            <div>Organization Description</div>
                            <TextField hintText="Type organization description here" onChange={this.handleOrgDescriptionChange} multiLine={true}/>
                        </div>
                    </div>
                    <div>
                        {cancel}
                        {submit}
                    </div>
            </Dialog>
        );
    }

    showCreateOrgCallOut() {
        this.setState({isCreateCallOutVisible: true});
    }

    render() {
        return (
            <div style={style}>
                  <div className="rowComponent">
                  <MuiThemeProvider>
                      <h1 style={{paddingTop: 20 + 'px', fontSize: 16 + 'px'}}>Organizations You Are an Admin of: </h1>
                      <RaisedButton label="Create Organization" primary={true} style={style} onClick={this.showCreateOrgCallOut}/>
                  </MuiThemeProvider>
                  </div>
                  <MuiThemeProvider>
                     { this.renderOrgForm() }
                  </MuiThemeProvider>
                  <OrgCardContainer cards={this.state.orgCards}/>
                  <div className="OrgCardContainer">
                {/* {this.state.orgCards.length > 0 &&
                   <div>
                       {
                           this.state.orgCards.slice(0).reverese().map(card =>
                              <OrgCard
                              organizationName={card.organizationName}
                              organizationDescription={card.organizationDescription}
                              />)
                       }
                   </div>
                }
                {this.state.cards.length == 0 &&
                    <div>
                        <h1> You are not an admin of any organizations. </h1>
                    </div>
                } */}                
            </div>
              </div>
        );
      }
}

const style = {
    margin: 15,
};

export default MyOrganizations;
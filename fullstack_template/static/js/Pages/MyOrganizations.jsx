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
            isOrgInformationVisible: false,
            organizationType: undefined,
            organizationName: undefined,
            organizationImage: undefined,
            organizationDescription: undefined,
            memberStatus: "Admin",
            adminOrgs: [],
            memberOrgs: [],
            orgCards: [],
            visibleOrg: undefined,
        }

        this.handleOrgRoleChange = this.handleOrgRoleChange.bind(this);

        this.renderOrgForm = this.renderOrgForm.bind(this);
        this.renderOrgDialog = this.renderOrgDialog.bind(this);
        this.showCreateOrgCallOut = this.showCreateOrgCallOut.bind(this);
        this.handleOrgTypeChange = this.handleOrgTypeChange.bind(this);
        this.handleOrgNameChange = this.handleOrgNameChange.bind(this);
        this.handleOrgDescriptionChange = this.handleOrgDescriptionChange.bind(this);
        this.handleImageFileChange = this.handleImageFileChange.bind(this);
        this.closeOrgDialog = this.closeOrgDialog.bind(this);
        this.changeOrgInfoVisible = this.changeOrgInfoVisible.bind(this);
        this.submitOrganization = this.submitOrganization.bind(this);

        this.getOrgCardWithId = this.getOrgCardWithId.bind(this);
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
        fetch('/orgs/admin=' + (this.state.memberStatus === "Admin" ? true : false) , {
          method: 'GET',
          dataType: 'json',
          headers: { 'Content-Type': 'application/json', 'Authorization' : this.getCookie("access_token")},
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
          that.setState({orgCards: data.message});
        }).catch(function (error) {//on status != 200
          alert(error.message);
        });

    }

    handleOrgRoleChange(event, index, value) {
        this.setState({memberStatus: value});
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

    handleImageFileChange(event, value) {
        this.setState({organizationImage: value});
    }

    closeOrgDialog() {
        this.setState({isCreateCallOutVisible: false});
    }

    changeOrgInfoVisible(orgId) {

        console.log("Logging orgId of " + orgId);
        this.setState({
            isOrgInformationVisible: !this.state.isOrgInformationVisible,
            calloutOrgId: orgId
        });
    }

    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    submitOrganization() {
        //Make API CAll here to create the new organization currently logs the information to send
        var that = this;
        fetch('/orgs/create', {
           method: 'POST',
           dataType: 'json',
           headers: { 'Content-Type': 'application/json', 'Authorization' : this.getCookie("access_token")},
           body: JSON.stringify(this.state)
        }).then(function (response) {
           if (response.status == 200) {
              that.closeOrgDialog();
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
    }

    getOrgCardWithId() {

        for (var cardIdx in this.state.orgCards) {
            var card = this.state.orgCards[cardIdx];
            if (card.organizationId === this.state.calloutOrgId) {
                return card;
            }
        }

        return {};
    }

    renderOrgDialog() {
        const exit = <FlatButton label="Exit" primary={true} onClick={this.changeOrgInfoVisible}/>

        var orgCalloutCard = this.getOrgCardWithId();

        return (
            <Dialog actions={[exit]}
             title={orgCalloutCard.organizationName}
             open={this.state.isOrgInformationVisible}
             onRequestClose={this.changeOrgInfoVisible}>
                <div>
                    <h5>Organization Type</h5>
                    <div>{orgCalloutCard.organizationType}</div>
                </div>
                <div>
                    <h5>Organization Description</h5>
                    <div>{orgCalloutCard.organizationDescription}</div>
                </div>
            </Dialog>
        );
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
                        <div>
                            <div> Organization Image</div>
                            <TextField hintText="Type image URL here" onChange={this.handleImageFileChange}></TextField>
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
               {this.state.memberStatus === "Admin" ?
               <div>
                  <div className="rowComponent">
                     <MuiThemeProvider>
                        <div className="sub-row">
                           <h1 className="float-left" style={{paddingTop: 20 + 'px', fontSize: 16 + 'px'}}>Organizations You Are an Admin of: </h1>
                           <RaisedButton className="float-left" label="Create Organization" primary={true} style={style} onClick={this.showCreateOrgCallOut}/>
                        </div>
                        <DropDownMenu value={this.state.memberStatus} onChange={this.handleOrgRoleChange} className="admin-selector">
                           <MenuItem value={"Admin"} key={0} primaryText={"Admin"}/>
                           <MenuItem value={"Member"} key={1} primaryText={"Member"}/>
                        </DropDownMenu>
                     </MuiThemeProvider>
                  </div>
                  <MuiThemeProvider>
                     { this.renderOrgForm() }
                  </MuiThemeProvider>
                  <OrgCardContainer cards={this.state.orgCards} renderOrgInfo={this.changeOrgInfoVisible}/>
              </div>
              :
              <div>
                  <div className="rowComponent">
                     <MuiThemeProvider>
                        <h1 style={{paddingTop: 20 + 'px', fontSize: 16 + 'px'}}>Organizations You Are a Member of: </h1>
                        <DropDownMenu value={this.state.memberStatus} onChange={this.handleOrgRoleChange}>
                           <MenuItem value={"Admin"} key={0} primaryText={"Admin"}/>
                           <MenuItem value={"Member"} key={1} primaryText={"Member"}/>
                        </DropDownMenu>
                     </MuiThemeProvider>
                  </div>
                  <MuiThemeProvider>
                     { this.renderOrgForm() }
                  </MuiThemeProvider>
                  <OrgCardContainer cards={this.state.orgCards} renderOrgInfo={this.changeOrgInfoVisible}/>
              </div>
               }
               {this.renderOrgDialog()}
            </div>
        );
      }
}

const style = {
    margin: 15,
};

export default MyOrganizations;
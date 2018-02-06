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
            orgCards: [{organizationName: "WISH", organizationDescription: "Women in software and hardware"},
                       {organizationName: "Natasha", organizationDescription: "Cats"}]
        }

        this.renderOrgForm = this.renderOrgForm.bind(this);
        this.showCreateOrgCallOut = this.showCreateOrgCallOut.bind(this);
        this.handleOrgTypeChange = this.handleOrgTypeChange.bind(this);
        this.handleOrgNameChange = this.handleOrgNameChange.bind(this);
        this.closeOrgDialog = this.closeOrgDialog.bind(this);
        this.submitOrganization = this.submitOrganization.bind(this);
    }

    handleOrgNameChange(event, value) {
        this.setState({organizationName: value});
    }

    handleOrgTypeChange(event, index, value) {
        this.setState({organizationType: value});
    }

    closeOrgDialog() {
        this.setState({isCreateCallOutVisible: false});
    }

    submitOrganization() {
        //Make API CAll here to create the new organization currently logs the information to send
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
                            Organization Name
                            <TextField hintText="Type organization name here" onChange={this.handleOrgNameChange}/>
                        </div>
                        <div>
                            Organization Type
                            <DropDownMenu value={this.state.organizationType} onChange={this.handleOrgTypeChange}>
                                {orgTypeMenuItems}
                            </DropDownMenu>
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
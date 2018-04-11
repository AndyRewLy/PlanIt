import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import React, { Component } from 'react';

const organizationTypes = ["Academic", "Community Service", "Council", "Cultural", "Environmental", "Honor", "National Society", "Performing Arts", "Political", "Professional", "Recreational", "Religious", "Special Interest"];
const orgTypeMenuItems = [];

for (var i = 0; i < organizationTypes.length; i++) {
    orgTypeMenuItems.push(<MenuItem value={organizationTypes[i]} key={organizationTypes[i]} primaryText = {organizationTypes[i]}/>);
}

class CreateOrgDialog extends Component {
    constructor(props) {
        super(props);

        this.state={

        }

        this.handleOrgNameChange = this.handleOrgNameChange.bind(this);
        this.handleOrgTypeChange = this.handleOrgTypeChange.bind(this);
        this.handleOrgDescriptionChange = this.handleOrgDescriptionChange.bind(this);
        this.handleImageFileChange = this.handleImageFileChange.bind(this);

        this.submitOrganization = this.submitOrganization.bind(this);
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

    submitOrganization() {
        var that = this;
        this.props.createNewOrg(this.state, 
         () => that.props.close(),
         () => console.log("Error somehwere..."));
    }

    render() {
        const cancel = <FlatButton label="Cancel" primary={true} onClick={this.props.close}/>
        const submit = <FlatButton label="Submit" primary={true} onClick={this.submitOrganization}/>
        const organizationTypes = ["Academic", "Community Service", "Council", "Cultural", "Environmental", "Honor", "National Society", "Performing Arts", "Political", "Professional", "Recreational", "Religious", "Special Interest"];

        return (
            <Dialog title="Create New Organization"
                    modal={true}
                    open={this.props.isVisible}
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
}

export default CreateOrgDialog;
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
            orgNameError: '',
            orgDescError: '',
            orgImgError: '',
            validationError: false,
            showErrorMessage: false
        }

        this.handleOrgNameChange = this.handleOrgNameChange.bind(this);
        this.handleOrgTypeChange = this.handleOrgTypeChange.bind(this);
        this.handleOrgDescriptionChange = this.handleOrgDescriptionChange.bind(this);
        this.handleImageFileChange = this.handleImageFileChange.bind(this);

        this.submitOrganization = this.submitOrganization.bind(this);

        this.clearForm = this.clearForm.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.toggleValidationError = this.toggleValidationError.bind(this);
    }

    handleOrgNameChange(event, value) {
        
        if(value) {
            this.setState({orgNameError: '', organizationName: value})
        }
        else{
            this.setState({orgNameError: 'Organization name is required', organizationName: value})
        }
    }

    handleOrgTypeChange(event, index, value) {
        this.setState({organizationType: value});
    }

    handleOrgDescriptionChange(event, value) {

        if(value) {
            this.setState({orgDescError: '', organizationDescription: value})
        }
        else{
            this.setState({orgDescError: 'Organization description is required', organizationDescription: value})
        }
    }

    handleImageFileChange(event, value) {

        if(value) {
            this.setState({orgImgError: '', organizationImage: value})
        }
        else{
            this.setState({orgImgError: 'Image URL is required', organizationImage: value})
        }
    }

    submitOrganization() {
        var that = this;
        this.props.createNewOrg(this.state, 
         () => that.props.close());
         /*() => console.log("Error somehwere..."));*/
    }

    clearForm(){
        var state = this.state;

        state.orgNameError = '';
        state.orgDescError = '';
        state.orgImgError = '';
        state.showErrorMessage = false;
        state.validationError = false;
        
        this.props.close();
    }

    validateInput() {
        var state = this.state;

        if (state.orgNameError|| state.orgDescError || state.orgImgError || state.showErrorMessage) {
            this.toggleValidationError();
        }
        else {
            this.submitOrganization();
        }
    }

    toggleValidationError() {
        this.setState({validationError: !this.state.validationError, showErrorMessage: !this.state.showErrorMessage});
    }

    render() {
        const cancel = <FlatButton label="Cancel" primary={true} onClick={this.clearForm}/>
        const submit = <FlatButton label="Submit" primary={true} onClick={this.validateInput}/>
        const organizationTypes = ["Academic", "Community Service", "Council", "Cultural", "Environmental", "Honor", "National Society", "Performing Arts", "Political", "Professional", "Recreational", "Religious", "Special Interest"];

        return (
            <Dialog title="Create New Organization"
                    modal={true}
                    open={this.props.isVisible}
                    autoScrollBodyContent={true}>
                    <div>
                        <div>
                            <div>Organization Name</div>
                            <TextField hintText="Type organization name here" errorText = {this.state.orgNameError} onChange={this.handleOrgNameChange}/>
                        </div>
                        <div>
                            <div>Organization Type</div>
                            <DropDownMenu value={this.state.organizationType} onChange={this.handleOrgTypeChange}>
                                {orgTypeMenuItems}
                            </DropDownMenu>
                            {this.state.showErrorMessage ? <p>Please select a type</p> : ''}
                        </div>
                        <div>
                            <div>Organization Description</div>
                            <TextField hintText="Type organization description here" errorText = {this.state.orgDescError} onChange={this.handleOrgDescriptionChange} multiLine={true}/>
                        </div>
                        <div>
                            <div> Organization Image</div>
                            <TextField hintText="Type image URL here" errorText = {this.state.orgImgError} onChange={this.handleImageFileChange}></TextField>
                        </div>
                    </div>
                    <div>
                        {this.state.validationError ? <p>Please fix your form errors</p>: ''}
                        {cancel}
                        {submit}
                    </div>
            </Dialog>
        );
    }
}

export default CreateOrgDialog;
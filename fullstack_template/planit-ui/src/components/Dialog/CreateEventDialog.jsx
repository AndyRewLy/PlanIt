import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

import Dialog from 'material-ui/Dialog';
import React, { Component } from 'react';

class CreateEventDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            eventNameError: '',
            eventDescError: '',
            eventLocError: '',
            maxPartError: '',
            tagsError: '',
            startTimeError: '',
            stopTimeError: '',
            validationError: false
        }

        this.handleEventTitleChange = this.handleEventTitleChange.bind(this);
        this.handleEventDescriptionChange = this.handleEventDescriptionChange.bind(this);
        this.handleEventLocationChange = this.handleEventLocationChange.bind(this);
        this.handleEventStartTimeChange = this.handleEventStartTimeChange.bind(this);
        this.handleEventEndTimeChange = this.handleEventEndTimeChange.bind(this);
        this.handleMembersOnlyCheck = this.handleMembersOnlyCheck.bind(this);
        this.handleMaxParticipantsChange = this.handleMaxParticipantsChange.bind(this);
        this.handleEventTagsChange = this.handleEventTagsChange.bind(this);

        this.submitEvent = this.submitEvent.bind(this); 
        this.showError = this.showError.bind(this);  
        
        this.clearForm = this.clearForm.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.toggleValidationError = this.toggleValidationError.bind(this);
    }

    submitEvent() {
        var body = this.state;

        this.state.callOutTitle = this.props.orgName;

        console.log(body);
        this.props.postEvent(body, 
           () => this.props.close(),
           () => this.showError())
    }

    clearForm(){
        var state = this.state;

        state.eventNameError = '';
        state.eventDescError = ''; 
        state.eventLocError = '';
        state.maxPartError = '';
        state.tagsError = '';
        state.startTimeError = '';
        state.stopTimeError = '';
        state.validationError = false;

        this.props.close();
    }

    showError() {
        console.log("I ran into an error creating the event");
    }

    handleEventTitleChange(event, value) {

        if(value) {
            this.setState({eventNameError: '', eventTitle: value})
        }
        else{
            this.setState({eventNameError: 'Event name is required', eventTitle: value})
        }
    }

    handleEventDescriptionChange(event, value) {

        if(value) {
            this.setState({eventDescError: '', eventDescription: value})
        }
        else{
            this.setState({eventDescError: 'Event description is required', eventDescription: value})
        }
    }

    handleEventLocationChange(event, value) {

        if(value) {
            this.setState({eventLocError: '', eventLocation: value})
        }
        else{
            this.setState({eventLocError: 'Event location is required', eventLocation: value})
        }
    }

    handleMembersOnlyCheck(event) {
        this.setState({eventMembersOnly: !this.state.eventMembersOnly});
    }

    handleMaxParticipantsChange(event, value) {

        if(value) {
            this.setState({maxPartError: '', maxParticipants: value})
        }
        else{
            this.setState({maxPartError: 'Max partcipants field is required', maxParticipants: value})
        }
    }

    handleImageFileChange(event, value) {
        this.setState({organizationImage: value});
    }

    handleEventTagsChange(event, value) {

        if(value) {
            this.setState({tagsError: '', eventTags: value})
        }
        else{
            this.setState({tagsError: 'Tags field is required', eventTags: value})
        }
    }

    handleEventStartTimeChange(event, value) {

        if(value) {
            this.setState({startTimeError: '', eventStartTime: value})
        }
        else{
            this.setState({startTimeError: 'Event start time is required', eventStartTime: value})
        }

    }

    handleEventEndTimeChange(event, value) {

        if(value) {
            this.setState({stopTimeError: '', eventEndTime: value})
        }
        else{
            this.setState({stopTimeError: 'Event stop time is required', eventEndTime: value})
        }
    }

    validateInput() {
        var state = this.state;

        if (state.eventNameError || state.eventDescError || state.eventLocError 
            || state.maxPartError || state.tagsError || state.startTimeError || state.stopTimeError) {
            this.toggleValidationError();
        }
        else {
            this.submitEvent();
        }
    }

    toggleValidationError() {
        this.setState({validationError: !this.state.validationError});
    }

    render() {
        const cancel = <FlatButton label="Cancel" primary={true} onClick={this.clearForm} />
        const submit = <FlatButton label="Submit" primary={true} onClick={this.validateInput} />
        const organizationTypes = ["Academic", "Community Service", "Council", "Cultural", "Environmental", "Honor", "National Society", "Performing Arts", "Political", "Professional", "Recreational", "Religious", "Special Interest"];
        
        return (
            <Dialog title={"Create New Event for " + this.props.orgName}
                modal={true}
                open={this.props.isVisible}
                autoScrollBodyContent={true}>
                <div>
                    <div>
                        <div>Event Title</div>
                        <TextField hintText="Type event Title here" errorText = {this.state.eventNameError} onChange={this.handleEventTitleChange} />
                    </div>
                    <div>
                        <div>Event Description</div>
                        <TextField hintText="Type event description here" errorText = {this.state.eventDescError} onChange={this.handleEventDescriptionChange} multiLine={true} />
                    </div>
                    <div>
                        <div>Event Location</div>
                        <TextField hintText="Type event location here" errorText = {this.state.eventLocError} onChange={this.handleEventLocationChange} />
                    </div>
                    <div>
                        <div>Event Start Time</div>
                        <TextField hintText="03/14/18 4:00PM" errorText = {this.state.startTimeError} onChange={this.handleEventStartTimeChange} />
                    </div>
                    <div>
                        <div>Event End Time</div>
                        <TextField hintText="03/14/18 6:00PM" errorText = {this.state.stopTimeError} onChange={this.handleEventEndTimeChange} />
                    </div>
                    <div>
                        <Checkbox label="Members Only" checked={this.state.eventMembersOnly} onCheck={this.handleMembersOnlyCheck} />
                    </div>
                    <div>
                        <div>Maximum Participants</div>
                        <TextField label="Type maximum participants here" errorText = {this.state.maxPartError} onChange={this.handleMaxParticipantsChange} />
                    </div>
                    <div>
                        <div>Tags</div>
                        <TextField hintText="#CS #TechTalk #WISH" errorText = {this.state.tagsError} onChange={this.handleEventTagsChange} />
                    </div>
                    <div>
                        <div>Event Items</div>
                        <TextField disabled={true} />
                    </div>
                    <div>
                        <div>Include Year</div>
                        <TextField disabled={true} />
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

export default CreateEventDialog;
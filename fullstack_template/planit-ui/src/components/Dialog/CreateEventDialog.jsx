import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

import Dialog from 'material-ui/Dialog';
import React, { Component } from 'react';

class CreateEventDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
    }

    submitEvent() {
        var body = this.state;

        this.state.callOutTitle = this.props.orgName;

        console.log(body);
        this.props.postEvent(body, 
           () => this.props.close(),
           () => this.showError())
    }

    showError() {
        console.log("I ran into an error creating the event");
    }

    handleEventTitleChange(event, value) {
        this.setState({eventTitle: value});
    }

    handleEventDescriptionChange(event, value) {
        this.setState({eventDescription: value});
    }

    handleEventLocationChange(event, value) {
        this.setState({eventLocation: value});
    }

    handleMembersOnlyCheck(event) {
        this.setState({eventMembersOnly: !this.state.eventMembersOnly});
    }

    handleMaxParticipantsChange(event, value) {
        this.setState({maxParticipants: value});
    }

    handleImageFileChange(event, value) {
        this.setState({organizationImage: value});
    }

    handleEventTagsChange(event, value) {
        this.setState({eventTags: value});
    }

    handleEventStartTimeChange(event, value) {
        this.setState({eventStartTime: value});
    }

    handleEventEndTimeChange(event, value) {
        this.setState({eventEndTime: value});
    }


    render() {
        const cancel = <FlatButton label="Cancel" primary={true} onClick={this.props.close} />
        const submit = <FlatButton label="Submit" primary={true} onClick={this.submitEvent} />
        const organizationTypes = ["Academic", "Community Service", "Council", "Cultural", "Environmental", "Honor", "National Society", "Performing Arts", "Political", "Professional", "Recreational", "Religious", "Special Interest"];
        
        return (
            <Dialog title={"Create New Event for " + this.props.orgName}
                modal={true}
                open={this.props.isVisible}
                autoScrollBodyContent={true}>
                <div>
                    <div>
                        <div>Event Title</div>
                        <TextField hintText="Type event Title here" onChange={this.handleEventTitleChange} />
                    </div>
                    <div>
                        <div>Event Description</div>
                        <TextField hintText="Type event description here" onChange={this.handleEventDescriptionChange} multiLine={true} />
                    </div>
                    <div>
                        <div>Event Location</div>
                        <TextField hintText="Type event location here" onChange={this.handleEventLocationChange} />
                    </div>
                    <div>
                        <div>Event Start Time</div>
                        <TextField hintText="03/14/18 4:00PM" onChange={this.handleEventStartTimeChange} />
                    </div>
                    <div>
                        <div>Event End Time</div>
                        <TextField hintText="03/14/18 6:00PM" onChange={this.handleEventEndTimeChange} />
                    </div>
                    <div>
                        <Checkbox label="Members Only" checked={this.state.eventMembersOnly} onCheck={this.handleMembersOnlyCheck} />
                    </div>
                    <div>
                        <div>Maximum Participants</div>
                        <TextField label="Type maximum participants here" onChange={this.handleMaxParticipantsChange} />
                    </div>
                    <div>
                        <div>Tags</div>
                        <TextField hintText="#CS #TechTalk #WISH" onChange={this.handleEventTagsChange} />
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
                    {cancel}
                    {submit}
                </div>
            </Dialog>
        );
    }
}

export default CreateEventDialog;
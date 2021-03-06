import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

import Dialog from 'material-ui/Dialog';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import React, { Component } from 'react';

import './CreateEventDialog.css';

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
            stopDateError: '',
            stopTimeError: '',
            eventImgError: '',
            validationError: false,
            eventMembersOnly: false,
            eventStartTime: undefined, 
            eventEndTime: undefined
        }

        this.handleEventTitleChange = this.handleEventTitleChange.bind(this);
        this.handleEventDescriptionChange = this.handleEventDescriptionChange.bind(this);
        this.handleEventLocationChange = this.handleEventLocationChange.bind(this);
        this.handleEventStartTimeChange = this.handleEventStartTimeChange.bind(this);
        this.handleStartDayChange = this.handleStartDayChange.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndDayChange = this.handleEndDayChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        this.handleEventEndTimeChange = this.handleEventEndTimeChange.bind(this);
        this.handleMembersOnlyCheck = this.handleMembersOnlyCheck.bind(this);
        this.handleMaxParticipantsChange = this.handleMaxParticipantsChange.bind(this);
        this.handleEventTagsChange = this.handleEventTagsChange.bind(this);
        this.handleImageFileChange = this.handleImageFileChange.bind(this);

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
        state.stopDateError = '';
        state.stopTimeError = '';
        state.eventImgError = '';
        state.validationError = false;
        state.eventStartTime = undefined;
        state.eventEndTime = undefined;
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

    handleStartDayChange(event, value) {
        if (this.state.eventStartTime != undefined) {
            var newDate = this.state.eventStartTime;
            newDate.setFullYear(value.getFullYear(), value.getMonth(), value.getDate());
        } else {
        var newDate = value;
        }

        this.setState(prevState => ({
            eventStartTime: newDate
        }))
    }

    handleStartTimeChange(event, value) {
        if (this.state.eventStartTime != undefined) {
          var newDate = this.state.eventStartTime;
          newDate.setHours(value.getHours());
          newDate.setMinutes(value.getMinutes());
        } else {
          var newDate = value;
        }
    
        this.setState(prevState => ({
            eventStartTime: newDate
        }))
        console.log(newDate);
      }

    handleEndDayChange(event, value) {
        if (this.state.eventEndTime != undefined) {
            var newDate = this.state.eventEndTime;
            newDate.setFullYear(value.getFullYear(), value.getMonth(), value.getDate());
          } else {
            var newDate = value;
            newDate.setHours(23)
            newDate.setMinutes(59)
        }

          var newDateWithBuffer = newDate;
          newDateWithBuffer.setMinutes(newDate.getMinutes() - 1);
          if (this.state.eventStartTime != undefined && newDateWithBuffer <= this.state.eventStartTime) {
            this.setState(prevState => ({
                stopDateError: 'Event end day is before the event start day'
            }))
          } else {
            this.setState(prevState => ({
              eventEndTime: newDate,
              stopDateError: ''
            }))
          }
          console.log(newDate);
    }

    handleEndTimeChange(event, value) {
        if (this.state.eventEndTime != undefined) {
          var newDate = this.state.eventEndTime;
          newDate.setHours(value.getHours());
          newDate.setMinutes(value.getMinutes());
        } else {
          var newDate = value;
        }
    
        var newDateWithBuffer = newDate;
        newDateWithBuffer.setMinutes(newDate.getMinutes() - 1);
        if (this.state.eventStartTime != undefined && newDateWithBuffer <= this.state.eventStartTime) {
          this.setState(prevState => ({
            stopTimeError: 'Event end time is before the event start time'
          }))
        } else {
          this.setState(prevState => ({
            eventEndTime: newDate,
            stopTimeError: ''
          }))
        }
        console.log(newDate);
    }

    handleEventEndTimeChange(event, value) {

        if(value) {
            this.setState({stopTimeError: '', eventEndTime: value})
        }
        else{
            this.setState({stopTimeError: 'Event stop time is required', eventEndTime: value})
        }
    }

    handleImageFileChange(event, value) {

        if(value) {
            this.setState({eventImgError: '', eventImage: value})
        }
        else{
            this.setState({eventImgError: 'Image URL is required', eventImage: value})
        }
    }

    validateInput() {
        var state = this.state;

        if (state.eventNameError || state.eventDescError || state.eventLocError || state.eventImgError
            || state.maxPartError || state.tagsError || state.startTimeError || state.stopTimeError || state.stopDateError) {
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
                        <div class="event-time-row">
                            <DatePicker
                                hintText="Day"
                                errorText = {this.state.startTimeError}
                                value={this.state.eventStartTime}
                                onChange={this.handleStartDayChange}
                            />
                            <TimePicker
                                hintText="Time"
                                errorText = {this.state.startTimeError}
                                value={undefined}
                                onChange={this.handleStartTimeChange}
                            />    
                        </div>
                    </div>
                    <div>
                        <div>Event End Time</div>
                        <div class="event-time-row">
                            <DatePicker
                                hintText="Day"
                                errorText = {this.state.stopDateError}
                                value={this.state.eventEndTime}
                                onChange={this.handleEndDayChange}
                            />
                            <TimePicker
                                hintText="Time"
                                errorText = {this.state.stopTimeError}
                                value={undefined}
                                onChange={this.handleEndTimeChange}
                            />   
                        </div>
                    </div>
                    <div>
                        <Checkbox label="Members Only" checked={this.state.eventMembersOnly} onCheck={this.handleMembersOnlyCheck} />
                    </div>
                    <div>
                        <div>Maximum Participants</div>
                        <TextField label="Type maximum participants here" errorText = {this.state.maxPartError} onChange={this.handleMaxParticipantsChange} />
                    </div>
                    <div>
                        <div> Event Image</div>
                            <TextField hintText="Type image URL here" errorText = {this.state.eventImgError} onChange={this.handleImageFileChange}></TextField>
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
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import React, { Component } from 'react';

class EventRSVPDialog extends Component {

    /*  The props for this component
     *  
     *  rsvp: function to call for rsvping to an event
     *  event: the event to display
     *  open: boolean determining whether this dialog is open
     *  close: function to close the dialog
     */
    render() {
        const actions = [
            <FlatButton
                label="Going"
                primary={true}
                onClick={() => this.props.rsvp(2, this.props.event.eventId)} />,
            <FlatButton
                label="Interested"
                primary={true}
                onClick={() => this.props.rsvp(1, this.props.event.eventId)} />,
            <FlatButton
                label="Not Going"
                primary={true}
                onClick={() => this.props.rsvp(0, this.props.event.eventId)} />
        ];

        var event = this.props.event;
        return (
            <Dialog
                title={event.eventTitle}
                actions={actions}
                open={this.props.open}
                onRequestClose={this.props.close}>
                <div>
                    <h5>Description</h5>
                    <div>{event.eventDescription}</div>
                </div>
                <div>
                    <h5>Location</h5>
                    <div>{event.eventLocation}</div>
                </div>
                <div>
                    <h5>Date and Time</h5>
                    <div>Start: {event.eventStartTime}</div>
                    <div>End: {event.eventEndTime} </div>
                </div>
                <div>
                    <h5>Maximum Participants</h5>
                    <div>{event.maxParticipants}</div>
                </div>
                <div>
                    <h5>Event Type</h5>
                    <div>{event.eventMembersOnly ? "Members Only" : "Open to Everyone"}</div>
                </div>
            </Dialog>
        );
    }
}

export default EventRSVPDialog;
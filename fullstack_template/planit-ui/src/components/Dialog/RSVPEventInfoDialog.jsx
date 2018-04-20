import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import React, { Component } from 'react';

class RSVPEventInfoDialog extends React.Component {

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

        const event = this.props.event;
        const rsvp_status = this.props.rsvp_status;

        return (
            <Dialog
                title={event.eventTitle}
                open={this.props.isVisible}
                actions={actions}
                onRequestClose={this.props.close}
                autoScrollBodyContent={true}>
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
                    <div>{event.eventMembersOnly ? "For Members Only" : "Open to Everyone"}</div>
                </div>
                <div>
                    <h5>RSVP Status</h5>
                    <div>{rsvp_status}</div>
                </div>
            </Dialog>
        );
}
}

export default RSVPEventInfoDialog;
import Dialog from 'material-ui/Dialog';
import React, { Component } from 'react';
import CommentContainer from '../CommentContainer/CommentContainer';

class EventInfoDialog extends React.Component {

    render() {
        const event = this.props.event;

        return (
            <Dialog
                title={event.eventTitle}
                open={this.props.isVisible}
                autoScrollBodyContent={true}
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
                    <div>{event.eventMembersOnly ? "For Members Only" : "Open to Everyone"}</div>
                </div>
                <CommentContainer {...this.props}/>
            </Dialog>
        );
}
}

export default EventInfoDialog;
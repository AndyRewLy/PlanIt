import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CommentContainer from '../CommentContainer/CommentContainer';
import React, { Component } from 'react';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

class RSVPEventInfoDialog extends React.Component {

    componentDidMount() {
        this.props.getEventComments(this.props.event.eventId, false);
    }

    render() {
        console.log("rendering RSVPEEventInfoDialog");
        const actions = [
            <FlatButton
                label="Going"
                primary={true}
                onClick={() => rsvp_status !== "" ? this.props.updateRsvp(2, this.props.event.eventId) 
                                                 : this.props.rsvp(2, this.props.event.eventId)} />,
            <FlatButton
                label="Interested"
                primary={true}
                onClick={() => rsvp_status !== "" ? this.props.updateRsvp(1, this.props.event.eventId) 
                                                 : this.props.rsvp(1, this.props.event.eventId)} />,
            <FlatButton
                label="Not Going"
                primary={true}
                onClick={() => rsvp_status !== "" ? this.props.updateRsvp(0, this.props.event.eventId) 
                                                 : this.props.rsvp(0, this.props.event.eventId)} />
        ];

        const event = this.props.event;
        const rsvp_status = this.props.rsvp_status;
        console.log(rsvp_status)

        console.log("MEMBER COMMENTS???")
        console.log(this.props.EventComments)
        return (
            
            <Dialog
                title={event.eventTitle}
                open={this.props.isVisible}
                actions={actions}
                onRequestClose={this.props.close}
                autoScrollBodyContent={true}>
                <Table>
                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn className="bold-row">Description</TableRowColumn>
                            <TableRowColumn>{event.eventDescription}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn className="bold-row">Location</TableRowColumn>
                            <TableRowColumn>{event.eventLocation}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn className="bold-row">Start Time</TableRowColumn>
                            <TableRowColumn>{event.eventStartTime}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn className="bold-row">End Time</TableRowColumn>
                            <TableRowColumn>{event.eventEndTime}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn className="bold-row">Max Participants</TableRowColumn>
                            <TableRowColumn>{event.maxParticipants}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn className="bold-row">Event Type</TableRowColumn>
                            <TableRowColumn>{event.eventMembersOnly ? "For Members Only" : "Open to Everyone"}</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
                <h4>Discussion</h4>
                <CommentContainer
                    comList={this.props.EventComments}
                    isAdminComment={false}
                    {...this.props} />
            </Dialog>
        );
}
}

export default RSVPEventInfoDialog;
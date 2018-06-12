import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import React, { Component } from 'react';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

require('./Dialog.css');
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
                open={this.props.open}
                actions={actions}
                autoScrollBodyContent={true}
                onRequestClose={this.props.close}>
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
                            <TableRowColumn className="bold-row">Event Types</TableRowColumn>
                            <TableRowColumn>{event.eventMembersOnly ? "For Members Only" : "Open to Everyone"}</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </Dialog>
        );
    }
}

export default EventRSVPDialog;
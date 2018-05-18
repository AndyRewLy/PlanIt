import Dialog from 'material-ui/Dialog'
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

class OrgJoinDialog extends React.Component {

    /* Expected props:
     *
     *  submit: the function to send a "join"(true) or "leave"(false) boolean
     *  canJoin: a boolean determining if the user can join or leave an org
     *  org: The organization to display information of
     *  open: The boolean value determining if the dialog is open or not
     *  onClose: The function to call when any close request is made
     */
    render() {
        const orgActions = [
            <FlatButton
                label="Join Org"
                primary={true}
                onClick={() => this.props.submit("true", this.props.org.organizationId)} />,
            <FlatButton
                label="Leave Org"
                primary={true}
                onClick={() => this.props.submit("false", this.props.org.organizationId)} />
        ];

        return (
            <Dialog
                actions={this.props.canJoin ? [orgActions[0]] : [orgActions[1]]}
                title={this.props.org.organizationName}
                open={this.props.open}
                onRequestClose={this.props.onClose}>
                <Table>
                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn className="bold-row">Type</TableRowColumn>
                            <TableRowColumn>{this.props.org.organizationType}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn className="bold-row">Description</TableRowColumn>
                            <TableRowColumn>{this.props.org.organizationDescription}</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </Dialog>
        );
    }
}

export default OrgJoinDialog;
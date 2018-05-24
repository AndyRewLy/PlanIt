import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

import React, { Component } from 'react';
import OrgMembersContainer from '../OrgMembersContainer/OrgMembersContainer';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

class OrgInfoDialog extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const exit = <FlatButton label="Exit" primary={true} onClick={this.props.close}/>
        const viewEvents = 
        <FlatButton
                label="View Events"
                primary={true}
                onClick={() => this.props.viewAllEvents(this.props.org.organizationId)} />
        return (
            <Dialog 
             actions={[viewEvents, exit]}
             title={this.props.org.organizationName}
             open={this.props.isVisible}
             onRequestClose={this.props.close}>
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
                <OrgMembersContainer members={this.props.Members}/>
            </Dialog>
        );
    }
}

export default OrgInfoDialog;
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
        var sendRequestStatus = (userId, status) => this.props.sendRequestStatus(this.props.organizationId, userId, status);
        return (
            <Dialog 
             actions={[exit]}
             title={"Member Requests: " + this.props.org.organizationName}
             open={this.props.isVisible}
             onRequestClose={this.props.close}>
                <OrgMembersContainer 
                  sendRequestStatus={sendRequestStatus} 
                  members={this.props.AdminRequests} 
                  adminActions={true} 
                  isRequest={true}/>
            </Dialog>
        );
    }
}

export default OrgInfoDialog;
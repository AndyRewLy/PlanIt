import React, { Component } from 'react';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import IconButton from 'material-ui/IconButton';
import Done from 'material-ui-icons/Done';
import Close from 'material-ui-icons/Close';

require('./OrgMembersContainer.css');

class OrgMembersContainer extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        var rows = this.props.members.map(m => (
           <TableRow>
              <TableRowColumn>{m.email}</TableRowColumn>
              {this.props.isRequest ? '' : <TableRowColumn>{m.memberStatus}</TableRowColumn>}
              {this.props.adminActions ? 
              <div>
                <TableRowColumn>
                    <a onClick={() => this.props.sendRequestStatus(m.id, true)}>
                    <Done/>
                    </a>
                </TableRowColumn>
                <TableRowColumn>
                    <a onClick={() => this.props.sendRequestStatus(m.id, false)}>
                    <Close/>
                    </a>
                </TableRowColumn> 
                </div>: ''}
           </TableRow>
        ));

        console.log(this.props.members);
        return (
            <Table fixedHeader={true} height={200}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Email</TableHeaderColumn>
                        {this.props.isRequest ? '' : <TableHeaderColumn>Member Status</TableHeaderColumn>}
                        {this.props.adminActions ? <TableHeaderColumn>Actions</TableHeaderColumn> : ''}
                    </TableRow>
                </TableHeader>
                <TableBody stripedRows={true} displayRowCheckbox={false}>
                    {rows}
                </TableBody>
            </Table>
        );
    }
}

export default OrgMembersContainer;
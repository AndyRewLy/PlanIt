import React, { Component } from 'react';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

require('./OrgMembersContainer.css');

class OrgMembersContainer extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        var rows = this.props.members.map(m => (
           <TableRow>
              <TableRowColumn>{m.email}</TableRowColumn>
              <TableRowColumn>{m.memberStatus}</TableRowColumn>
           </TableRow>
        ));

        return (
            <Table fixedHeader={true} height={200}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Email</TableHeaderColumn>
                        <TableHeaderColumn>Memberstatus</TableHeaderColumn>
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
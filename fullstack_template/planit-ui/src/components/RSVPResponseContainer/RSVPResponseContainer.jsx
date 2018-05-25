import React, { Component } from 'react';
//import Response from './Response'

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

require('./Response.css')
class RSVPResponseContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ''
        }

    }

    render() {
        var responses, going, interested, not_going; 
        responses = this.props.responseList ? this.props.responseList : [];

        going = (
            responses["going"].join(', '))

        interested = responses["interested"].join(', ')
        not_going = responses["not_going"].join(', ')

        return (
            <div>
                <Table>
                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn className="bold-row">Going</TableRowColumn>
                            <TableRowColumn>{ going }</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn className="bold-row">Interested</TableRowColumn>
                            <TableRowColumn>{interested}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn className="bold-row">Not Going</TableRowColumn>
                            <TableRowColumn>{not_going}</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>


            </div>
        );
    }
}

export default RSVPResponseContainer;
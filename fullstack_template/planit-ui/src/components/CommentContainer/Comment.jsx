import React, { Component } from 'react';

import {
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

require('./Comment.css');
class Comments extends React.Component {
    constructor(props){
    	super(props);
      }
      
    render() {
        return (
            <TableRow>
                <TableRowColumn className="com-sub-item">{this.props.posterEmail}</TableRowColumn>
                <TableRowColumn className="com-sub-item">{this.props.postingDate}</TableRowColumn>
                <TableRowColumn><div className="com-content">{this.props.content}</div></TableRowColumn>
            </TableRow>
        );
    }

}

export default Comments;
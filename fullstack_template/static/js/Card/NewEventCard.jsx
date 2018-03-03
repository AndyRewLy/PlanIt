import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Add from 'material-ui-icons/Add';

import AppBar from 'material-ui/AppBar';
import React, { Component } from 'react';

require('../../css/Card.css');
class NewEventCard extends React.Component {
    constructor(props){
    	super(props);
    	this.state={
              cardInfo:{},
        };
      }
      
      render() {
      return (
        <div className="Card">
            <div className="card-content">
                <div className="card-sub-item wrap-div">
                    <h1 className="card-sub-item align-left">{this.props.cardInfo.eventTitle}</h1>
                    <MuiThemeProvider>
                        <Add className="card-sub-item align-right"/>                        
                    </MuiThemeProvider>
                </div>
            </div>
        </div>);
      }

}

export default NewEventCard;
import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import React, { Component } from 'react';

class MyEvents extends React.Component {
    constructor(props){
        super(props);

        this.state={
        }
    }

    render() {
        return (
              <div>
                  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                  <RaisedButton label="Create Event" primary={true} style={style}/>
                  </MuiThemeProvider>
                  <p> YO YO YO THIS IS MY EVENTS LGI </p>
              </div>
        );
      }
}

const style = {
    margin: 15,
};

export default MyEvents;
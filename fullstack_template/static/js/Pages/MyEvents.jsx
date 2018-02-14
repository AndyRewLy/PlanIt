import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import EventCardContainer from '../Card/EventCardContainer';
import React, { Component } from 'react';

class MyEvents extends React.Component {
    constructor(props){
        super(props);

        this.state={
            cards: [{title: 'Women in Software and Hardware',
                    admin: true,
                     events: [{'eventTitle': 'Raytheon Tech Talk'},
                              {'eventTitle': 'Google Tech Talk'}
                             ]
                    },
                    {title: 'Alpha Phi Omega',
                     admin: false,
                     events: [{'eventTitle': 'Rush Night'}
                             ]
                    }
                   ]
        }

        this.getAllEvents = this.getAllEvents.bind(this);
    }

    componentDidMount() {
        var getAllEventsInterval = setInterval(this.getAllEvents, 1000); //Call the getAllEvents function every 1 second

        this.setState({getAllEventsInterval: getAllEventsInterval});
    }

    componentWillUnmount() {
        clearInterval(this.state.getAllEventsInterval);
    }

    getAllEvents() {
        console.log("Getting all the events for this user...");
    }

    render() {
        var cards = this.state.cards;
        var rowComponents = [];

        for (var i = 0; i < cards.length; i++) {
            rowComponents.push(
                <div key={cards[i].title}>
                <div className="rowComponent" key={cards[i].title}>
                  <MuiThemeProvider>
                    <h1 style={{paddingTop: 20 + 'px', fontSize: 16 + 'px'}}>{cards[i].title}</h1>
                  </MuiThemeProvider>
                </div>
                <EventCardContainer cards={this.state.cards[i].events}/>
                </div>
            );
        }

        if (rowComponents.length == 0) {
            rowComponents.push(
                <p> You currently have no Events for your Organizations</p>                
            );
        }

        return (
            <div style={style}>
                {rowComponents}
                  {/* <div className="rowComponent">
                  <MuiThemeProvider>
                      <h1 style={{paddingTop: 20 + 'px', fontSize: 16 + 'px'}}>Organizations You Are an Admin of: </h1>
                  </MuiThemeProvider>
                  </div>
                  <EventCardContainer cards={this.state.cards}/> */}
            </div>
        );
      }
}

const style = {
    margin: 15,
};

export default MyEvents;
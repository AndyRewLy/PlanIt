import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import EventCardContainer from '../Card/EventCardContainer';
import React, { Component } from 'react';

class HomePage extends React.Component {
    constructor(props){
        super(props);

        this.state={
            newEventCards: [{eventId: 1, 
                             eventTitle: "Test Event",
                             eventDescription: "I like to do tests jk i want to eat",
                             eventImage: "test image",                             
                             startTime: "test time",
                             endTime: "test end Time",
                             location: "test location"}],
            showEventInfo: false,
            calloutEventId: 0,
            canRSVP: false,
        }

        this.getNewEvents = this.getNewEvents.bind(this);
        this.renderEventInfo = this.renderEventInfo.bind(this);

        this.getEventCardWithId = this.getEventCardWithId.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.sendEventResponse = this.sendEventResponse.bind(this);
    }

    componentDidMount() {
        var getNewEventsInterval = setInterval(this.getNewEvents, 1000); //Call the getAllEvents function every 1 second

        this.setState({getNewEventsInterval: getNewEventsInterval});
    }

    componentWillUnmount() {
        clearInterval(this.state.getNewEventsInterval);
    }

    getNewEvents() {
        //Function to get all new events that the user has not RSVPed to yet
    }

    handleClose() {
        this.setState({showEventInfo: !this.state.showEventInfo});
    }

    renderEventInfo(eventId, canRSVP) {
        this.setState({showEventInfo: !this.state.showEventInfo, 
                       calloutEventId: eventId, 
                       canRSVP: canRSVP});
    }

    getEventCardWithId() {
        for (var cardIdx in this.state.newEventCards) {
            var card = this.state.newEventCards[cardIdx];
            if (card.eventId === this.state.calloutEventId) {
                return card;
            }
        }

        return {};
    }

    sendEventResponse(response) {
        //Send the event response
        //0 - not going
        //1 - interested
        //2 - going 
        console.log("The response to be sent is " + response);

        this.handleClose();
    }
    render() {
        const actions= [
            <FlatButton
               label="Going"
               primary={true}
               onClick={() => this.sendEventResponse(2)}/>,
            <FlatButton
               label="Interested"
               primary={true}
               onClick={() => this.sendEventResponse(1)}/>,
            <FlatButton
               label="Not Going"
               primary={true}
               onClick={() => this.sendEventResponse(0)}/>
        ];
        var calloutCard = this.getEventCardWithId();

        return (
              <div>
                  <p style={style}> Discover Events </p>
                  <EventCardContainer cards={this.state.newEventCards} 
                    canRSVP={true} 
                    renderEventInfo={this.renderEventInfo}/>
                  {this.state.newEventCards.length && 
                   <Dialog
                     title={calloutCard.eventTitle}
                     actions={actions}
                     open={this.state.showEventInfo}
                     onRequestClose={this.handleClose}>
                     <div>
                         <h3>Event Time</h3>
                         <div>{calloutCard.startTime} - {calloutCard.endTime}</div>
                     </div>
                     <div>
                         <h3>Event location</h3>
                         <div>{calloutCard.location}</div>
                     </div>
                     <div>
                         <h3>Event Description</h3> 
                         <div>{calloutCard.eventDescription}</div>
                     </div>
                   </Dialog>}
              </div>
        );
      }
}

const style = {
    margin: 15,
};

export default HomePage;

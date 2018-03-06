
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import EventCardContainer from '../Card/EventCardContainer';

import React, { Component } from 'react';

class HomePage extends React.Component {
    constructor(props){
        super(props);

        this.state={

            newEventCards: [],
            showEventInfo: false,
            calloutEventId: undefined,
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

    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    getNewEvents() {
        //Function to get all new events that the user has not RSVPed to yet
        var that = this;

        fetch('/events/rsvp=true', {
          method: 'GET',
          dataType: 'json',
          headers: { 'Content-Type': 'application/json', 'Authorization' : this.getCookie("access_token")},
        }).then(function (response) {
          if (response.status == 200) {
            return response.json()
          }
          else {
            return response.json().catch(err => {
              throw new Error(response.statusText);
            }).then(json => {
              throw new Error(json.message);
            });
          }
        }).then(function (data) {//on status == 200
          that.setState({newEventCards: data.message});
        }).catch(function (error) {//on status != 200
          alert(error.message);
        });
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
        var c = this.getEventCardWithId()
        console.log("The response to be sent is " + response + " " + c.eventId);

        //send eventid and rsvp status
        fetch('/events/rsvp', {
            method: 'POST',
            dataType: 'json',
            headers: { 'Content-Type': 'application/json', 'Authorization': this.getCookie("access_token") },
            body: JSON.stringify({"status" : response, "eventId" : c.eventId })
        }).then(function (response) {
            if (response.status == 200) {
                return response.json()
            }
            else {
                return response.json().catch(err => {
                    throw new Error(response.statusText);
                }).then(json => {
                    throw new Error(json.message);
                });
            }
        }).then(function (data) {//on status == 200
            console.log(data.message);
        }).catch(function (error) {//on status != 200
            alert(error.message);
        });

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
                  {this.state.newEventCards.length ?
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
                         <div>{calloutCard.eventLocation}</div>
                     </div>
                     <div>
                         <h3>Event Description</h3> 
                         <div>{calloutCard.eventDescription}</div>
                     </div>
                   </Dialog> : ''}
              </div>
        );
      }
}

const style = {
    margin: 15,
};

export default HomePage;

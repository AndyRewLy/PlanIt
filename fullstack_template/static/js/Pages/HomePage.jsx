
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import EventCardContainer from '../Card/EventCardContainer';

import React, { Component } from 'react';
import OrgCardContainer from '../Card/OrgCardContainer';

class HomePage extends React.Component {
    constructor(props){
        super(props);

        this.state={
            newEventCards: [],
            showEventInfo: false,
            calloutEventId: undefined,
            canRSVP: false,
            newOrgCards: [],
            showOrgInfo: false,
            calloutOrgId: undefined,
            canJoin: false
        }

        this.getNewEvents = this.getNewEvents.bind(this);
        this.renderEventInfo = this.renderEventInfo.bind(this);

        this.getEventCardWithId = this.getEventCardWithId.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.getAllOrgs = this.getAllOrgs.bind(this);
        this.renderOrgInfo = this.renderOrgInfo.bind(this);

        this.getOrgCardWithId = this.getOrgCardWithId.bind(this);
        this.handleOrgClose = this.handleOrgClose.bind(this);
        this.changeOrgJoinStatus = this.changeOrgJoinStatus.bind(this);

        this.updateOrgFilter = this.updateOrgFilter.bind(this);
        this.updateEventFilter = this.updateEventFilter.bind(this);

        this.sendEventResponse = this.sendEventResponse.bind(this);
    }

    componentDidMount() {
        var getNewEventsInterval = setInterval(this.getNewEvents, 1000); //Call the getAllEvents function every 1 second
        var getAllOrgsInterval = setInterval(this.getAllOrgs, 1000);

        this.setState({
           getNewEventsInterval: getNewEventsInterval,
           getAllOrgsInterval: getAllOrgsInterval
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.getNewEventsInterval);
        clearInterval(this.state.getAllOrgsInterval);
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

    getAllOrgs() {
        var that = this;
        var newOrgCards;
        var memberOrgs;

        fetch('/orgs/all', {
          method: 'GET',
          dataType: 'json',
          headers: { 'Content-Type': 'application/json', 'Authorization' : that.getCookie("access_token")},
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
          newOrgCards = data.message;

          fetch('/orgs/admin=false', {
            method: 'GET',
            dataType: 'json',
            headers: { 'Content-Type': 'application/json', 'Authorization' : that.getCookie("access_token")},
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
            memberOrgs = data.message;

            for (var i in newOrgCards) {
                newOrgCards[i].canJoin = true;

                for (var j in memberOrgs) {
                    if (newOrgCards[i].organizationId === memberOrgs[j].organizationId) {
                        newOrgCards[i].canJoin = false;
                        break;
                    }
                }
            }

            that.setState({newOrgCards: newOrgCards, memberOrgs: memberOrgs});
          }).catch(function (error) {//on status != 200
            alert(error.message);
          });

        }).catch(function (error) {//on status != 200
          alert(error.message);
        });
        
    }

    changeOrgJoinStatus() {
        var that = this;

        fetch('/orgs/join', {
            method: 'POST',
            dataType: 'json',
            headers: { 'Content-Type': 'application/json', 'Authorization': this.getCookie("access_token") },
            body: JSON.stringify({"organizationId" : this.state.calloutOrgId})
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
            that.handleOrgClose();        
        }).catch(function (error) {//on status != 200
            alert(error.message);
        });

    }

    updateOrgFilter(e, value) {
        console.log("Filter is now the value: "  + value);
        this.setState({orgFilter: value});
    }

    updateEventFilter(e, value) {
        console.log("Filter is now the value: " + value);
        this.setState({eventFilter: value});
    }

    handleClose() {
        this.setState({showEventInfo: !this.state.showEventInfo});
    }

    handleOrgClose() {
        this.setState({showOrgInfo: !this.state.showOrgInfo});
    }

    renderEventInfo(eventId, canRSVP) {
        this.setState({showEventInfo: !this.state.showEventInfo, 
                       calloutEventId: eventId, 
                       canRSVP: canRSVP});
    }

    renderOrgInfo(orgId, canJoin) {
        this.setState({showOrgInfo: !this.state.showOrgInfo,
                       calloutOrgId: orgId,
                       canJoin: canJoin});
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

    getOrgCardWithId() {
        for (var cardIdx in this.state.newOrgCards) {
            var card = this.state.newOrgCards[cardIdx];
            if (card.organizationId === this.state.calloutOrgId) {
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

        const orgActions = [
            <FlatButton
                label="Join Org"
                primary={true}
                onClick={() => this.changeOrgJoinStatus()}/>,
            <FlatButton
                label="Leave Org"
                primary={true}
                onClick={() => console.log("Leave the org")}/>
        ];
        
        var calloutCard = this.getEventCardWithId();
        var orgCalloutCard = this.getOrgCardWithId();

        return (
              <div>
                  <p style={style}> Discover Events </p>
                  <TextField hintText="Search for an Event" onChange={this.updateEventFilter}/>
                  <EventCardContainer filterText={this.state.eventFilter}
                    cards={this.state.newEventCards} 
                    canRSVP={true} 
                    renderEventInfo={this.renderEventInfo}/>
                  <br/>
                  <p style={style}> Discover Organizations </p>
                  <TextField hintText="Search for an Org" onChange={this.updateOrgFilter}/>
                  <OrgCardContainer filterText={this.state.orgFilter}
                    cards={this.state.newOrgCards}
                    renderOrgInfo={this.renderOrgInfo}/>
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
                   {this.state.newOrgCards.length ?
                   <Dialog
                     actions={this.state.canJoin ? [orgActions[0]] : [orgActions[1]]}
                     title={orgCalloutCard.organizationName}
                     open={this.state.showOrgInfo}
                     onRequestClose={this.handleOrgClose}>
                     <div>
                         <h3>Organization Type</h3>
                         <div>{orgCalloutCard.organizationType}</div>
                     </div>
                     <div>
                         <h3>Organization Description</h3>
                         <div>{orgCalloutCard.organizationDescription}</div>
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

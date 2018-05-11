import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import RSVPEventCardContainer from '../CardContainer/RSVPEventCardContainer';
import CreateEventDialog from '../Dialog/CreateEventDialog';
import RSVPEventInfoDialog from '../Dialog/RSVPEventInfoDialog';

import React, { Component } from 'react';

class RSVPEvents extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            createEventVisible: false,
            showEventVisible: false,
            calloutEventId: undefined,
            canRSVP: false
        }
        
        this.rsvpToEvent = this.rsvpToEvent.bind(this);
        this.updateRsvpToEvent = this.updateRsvpToEvent.bind(this);
        this.toggleCreateEvent = this.toggleCreateEvent.bind(this);
        this.toggleEventInfo = this.toggleEventInfo.bind(this);
        this.getEventCardWithId = this.getEventCardWithId.bind(this);
        this.createRowComponents = this.createRowComponents.bind(this);
    }

    toggleCreateEvent(title) {
        var that = this;

        return function() {
            that.setState({
                createEventVisible: !that.state.createEventVisible,
                eventOrgTitle: title
            });
        };
    }

    toggleEventInfo(eventId, canRSVP) {
        this.setState({
            showEventVisible: !this.state.showEventVisible,
            calloutEventId: eventId,
            canRSVP: canRSVP
        });
    }

    getEventCardWithId() {
        var cards = this.props.RSVPEvents
        for (var orgIdx in cards) {
            var org = cards[orgIdx];
            var events = org["events"];
            for(var eventIdx in events) {
                var eventCard = events[eventIdx][0]
                console.log(eventCard);
                if (eventCard.eventId === this.state.calloutEventId) {
                    return eventCard;
                }
            }
        }

        return {};
    }

    getEventRSVPWithId() {
        var cards = this.props.RSVPEvents
        for (var orgIdx in cards) {
            var org = cards[orgIdx];
            var events = org["events"];
            for(var eventIdx in events) {
                var eventCard = events[eventIdx][0]
                var eventRSVP = events[eventIdx][1]
                if (eventCard.eventId === this.state.calloutEventId) {
                    return eventRSVP;
                }
            }
        }

        return {};
    }

    updateRsvpToEvent(response, eventId) {
        this.props.updateEventResponse(response, eventId, this.toggleEventInfo);
    }

    rsvpToEvent(response, eventId) {
        this.props.postEventResponse(response, eventId, this.toggleEventInfo);
    }

    createRowComponents() {
        var rowComponents = [];        
        var cards = this.props.RSVPEvents;
        for (var i = 0; i < cards.length; i++) {
            rowComponents.push(
                <div key={cards[i].title}>
                    <div className="rowComponent" key={cards[i].title}>
                        <h1 style={{ paddingTop: 20 + 'px', fontSize: 16 + 'px' }}>{cards[i].title}</h1>
                    </div>
                    <RSVPEventCardContainer 
                        cards={cards[i].events} 
                        canRSVP={false} 
                        renderEventInfo={this.toggleEventInfo} />
                </div>
            );
        }

        if (rowComponents.length == 0) {
            rowComponents.push(
                <p> You currently have no Events for your Organizations</p>
            );
        }

        return rowComponents;
    }
    
    render() {
        var rowComponents = this.createRowComponents();

        return (
            <div style={style}>
                {rowComponents}
                {this.state.calloutEventId ?
                   <RSVPEventInfoDialog event={this.getEventCardWithId()}  
                    rsvp_status = {this.getEventRSVPWithId()}
                    updateRsvp={this.updateRsvpToEvent}
                    rsvp={this.rsvpToEvent}
                    isVisible={this.state.showEventVisible}
                    close={this.toggleEventInfo}
                    {...this.props} />
                : ''}
            </div>
        );
    }
}

const style = {
    margin: 15,
};

export default RSVPEvents;
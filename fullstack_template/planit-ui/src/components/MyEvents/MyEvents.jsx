import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import EventCardContainer from '../CardContainer/EventCardContainer';
import CreateEventDialog from '../Dialog/CreateEventDialog';
import EventInfoDialog from '../Dialog/EventInfoDialog';

import React, { Component } from 'react';

class MyEvents extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            createEventVisible: false,
            showEventVisible: false,
            calloutEventId: undefined,
            canRSVP: false,
            commentList: []
        }

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
        var cards = this.props.AdminEvents
        for (var orgIdx in cards) {
            var org = cards[orgIdx];
            var events = org["events"];
            for(var eventIdx in events) {
                var eventCard = events[eventIdx]
                if (eventCard.eventId === this.state.calloutEventId) {
                    return eventCard;
                }
            }
        }

        return {};
    }

    createRowComponents() {
        var rowComponents = [];        
        var cards = this.props.AdminEvents;

        for (var i = 0; i < cards.length; i++) {
            rowComponents.push(
                <div key={cards[i].title}>
                    <div className="rowComponent" key={cards[i].title}>
                        <h1 style={{ paddingTop: 20 + 'px', fontSize: 16 + 'px' }}>{cards[i].title}</h1>
                        {cards[i].admin &&
                         <RaisedButton label="Create Event" primary={true} style={style} onClick={this.toggleCreateEvent(cards[i].title)} />}
                    </div>
                    <EventCardContainer 
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
                <CreateEventDialog orgName={this.state.eventOrgTitle}
                 isVisible={this.state.createEventVisible}
                 close={this.toggleCreateEvent(undefined)}
                 {...this.props}/>
                {this.state.calloutEventId ?
                   <EventInfoDialog 
                    event={this.getEventCardWithId()} 
                    isVisible={this.state.showEventVisible}
                    close={this.toggleEventInfo}
                    {...this.props}/>
                : ''}
            </div>
        );
    }
}

const style = {
    margin: 15,
};

export default MyEvents;
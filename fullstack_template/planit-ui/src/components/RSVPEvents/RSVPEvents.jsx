import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ToggleButton from 'react-toggle-button'

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
        
        this.handleOrgRoleChange = this.handleOrgRoleChange.bind(this);
        this.rsvpToEvent = this.rsvpToEvent.bind(this);
        this.updateRsvpToEvent = this.updateRsvpToEvent.bind(this);
        this.toggleCreateEvent = this.toggleCreateEvent.bind(this);
        this.toggleEventInfo = this.toggleEventInfo.bind(this);
        this.getEventCardWithId = this.getEventCardWithId.bind(this);
        this.createRowComponents = this.createRowComponents.bind(this);
    }

    handleOrgRoleChange(value) {
        if (value == false) {
            this.props.getAllAdminEvents();
            this.props.history.push("/manageEvents");
        }
        else {
            this.props.getAllRSVPEvents();
            this.props.history.push("/myEvents");
        }
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
            <div style={{textAlign: 'right'}}>
                        <ToggleButton 
                            containerStyle={toggleButtonStyle.containerStyle} 
                            trackStyle={toggleButtonStyle.trackStyle} 
                            thumbStyle={toggleButtonStyle.thumbStyle}
                            thumbAnimateRange={toggleButtonStyle.thumbAnimateRange} 
                            activeLabelStyle={toggleButtonStyle.activeLabelStyle}
                            inactiveLabelStyle={toggleButtonStyle.inactiveLabelStyle}
                            inactiveLabel={"Member"}
                            activeLabel={"Admin"}
                            value={false} 
                            onToggle={this.handleOrgRoleChange}/>
                    </div>
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


const toggleButtonStyle = {
    containerStyle: { display: 'inline-block', width: '100px', height: '25px' },
    trackStyle: { width: '100px', height: '25px' },
    thumbStyle: { width: '25px', height: '25px' },
    thumbAnimateRange: [1, 80],
    activeLabelStyle: { width: '30px', fontSize: '13px' },
    inactiveLabelStyle: { width: '30px', fontSize: '13px' },
    colors:{
        active: {
          base: 'rgb(207,221,245)',
          hover: 'rgb(177, 191, 215)',
        },
        inactive: {
          base: 'rgb(65,66,68)',
          hover: 'rgb(95,96,98)',
        }
      }
};

export default RSVPEvents;
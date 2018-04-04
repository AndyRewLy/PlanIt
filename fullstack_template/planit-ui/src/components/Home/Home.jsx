import TextField from 'material-ui/TextField';

import React, { Component } from 'react';
import OrgCardContainer from '../CardContainer/OrgCardContainer';
import EventCardContainer from '../CardContainer/EventCardContainer';

import EventRSVPDialog from '../Dialog/EventRSVPDialog';
import OrgJoinDialog from '../Dialog/OrgJoinDialog';

require('./Home.css');

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showEventInfo: false,
            calloutEventId: undefined,
            canRSVP: false,
            eventFilter: "",
            showOrgInfo: false,
            calloutOrgId: undefined,
            canJoin: false,
            orgFilter: undefined
        }

        this.renderEventInfo = this.renderEventInfo.bind(this);
        this.updateEventFilter = this.updateEventFilter.bind(this);
        this.handleEventClose = this.handleEventClose.bind(this);
        this.rsvpToEvent = this.rsvpToEvent.bind(this);

        this.changeOrgJoinStatus = this.changeOrgJoinStatus.bind(this);
        this.updateOrgFilter = this.updateOrgFilter.bind(this);
        this.renderOrgInfo = this.renderOrgInfo.bind(this);
        this.handleOrgClose = this.handleOrgClose.bind(this);
    }

    renderEventInfo(eventId, canRSVP) {
        console.log("REnder event info of " + eventId);
        this.setState({
            showEventInfo: !this.state.showEventInfo,
            calloutEventId: eventId,
            canRSVP: canRSVP
        });
    }

    updateEventFilter(e, value) {
        this.setState({
            eventFilter: value
        });

        this.props.getAllFilteredEvents(value);
    }

    handleEventClose() {
        this.setState({
            showEventInfo: !this.state.showEventInfo
        });
    }

    rsvpToEvent(response, eventId) {
        this.props.postEventResponse(response, eventId, this.handleEventClose);
    }

    changeOrgJoinStatus(response, orgId) {
        var that = this;

        this.props.postOrgJoinStatus(response, orgId,
            () => that.handleOrgClose());
    }

    updateOrgFilter(e, value) {
        this.setState({ orgFilter: value });
    }

    renderOrgInfo(orgId, canJoin) {
        this.setState({
            showOrgInfo: !this.state.showOrgInfo,
            calloutOrgId: orgId,
            canJoin: canJoin
        });
    }

    handleOrgClose() {
        this.setState({ showOrgInfo: !this.state.showOrgInfo });
    }

    render() {
        var memberOrgs = this.props.MemberOrgs;
        var orgId = this.state.calloutOrgId;
        var eventId = this.state.calloutEventId;

        var org = this.props.AllOrgs.filter(org => org.organizationId === orgId)[0];
        var event = this.props.AllEvents.filter(event => event.eventId === eventId)[0];

        org = org ? org : {};
        event = event ? event : {};

        return (
            <div>
                <div className="search-row">
                    <p className="row-item" style={style}> Discover Events </p>
                    <TextField className="row-item" hintText="Search for an Event" onChange={this.updateEventFilter} />
                </div>
                <EventCardContainer filterText={this.state.eventFilter}
                    cards={this.props.AllEvents}
                    canRSVP={true}
                    renderEventInfo={this.renderEventInfo} />
                <div className="search-row">
                    <p className="row-item" style={style}> Discover Organizations </p>
                    <TextField className="row-item" hintText="Search for an Org" onChange={this.updateOrgFilter} />
                </div>
                <OrgCardContainer filterText={this.state.orgFilter}
                    cards={this.props.AllOrgs.map(org => {
                        org.canJoin = memberOrgs.filter(memOrg =>
                            memOrg.organizationId === org.organizationId
                        ).length ? false : true;
                        return org;
                    })}
                    renderOrgInfo={this.renderOrgInfo} />
                <EventRSVPDialog rsvp={this.rsvpToEvent}
                    event={event}
                    open={this.state.showEventInfo}
                    close={this.handleEventClose} />
                <OrgJoinDialog
                    submit={this.changeOrgJoinStatus}
                    canJoin={this.state.canJoin}
                    org={org}
                    open={this.state.showOrgInfo}
                    onClose={this.handleOrgClose} />
            </div>
        );
    }
}

const style = {
    margin: 15,
};

export default Home;
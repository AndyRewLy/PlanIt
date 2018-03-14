import React, { Component } from 'react';
import EventCard from './EventCard'

require('../../css/CardContainer.css')
class EventCardContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var card = undefined;
        var filterText = this.props.filterText ? this.props.filterText : undefined;

        if (this.props.cards && this.props.cards.length > 0) {
            card = (this.props.cards)[0];
        }

        return (
            <div className="CardContainer">
                {this.props.cards.length > 0 &&
                   <div className="card-subcontainer">
                       {
                           this.props.cards.slice(0).reverse().map(card =>
                              <EventCard
                                renderEventInfo={this.props.renderEventInfo}
                                eventId={card.eventId}                                
                                eventTitle={card.eventTitle}
                                eventImage={card.eventImage}
                                eventStartTime={card.startTime}
                                eventLocation={card.location}
                                key={card.eventTitle}
                                canRSVP={this.props.canRSVP}
                              /> )
                       }
                   </div>
                }
                {this.props.cards.length == 0 &&
                    <div className="card-subcontainer">
                        <div> You currently have no events with this Org. </div>
                    </div>
                }
            </div>
        );
    }
}

export default EventCardContainer;
import React, { Component } from 'react';
import EventCard from './EventCard'

require('../../css/CardContainer.css')
class EventCardContainer extends React.Component {

    render() {
        var card = undefined;
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
                                eventTitle={card.eventTitle}
                                key={card.eventTitle}
                              />)
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
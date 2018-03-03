import React, { Component } from 'react';
import NewEventCard from './NewEventCard'

require('../../css/CardContainer.css')
class NewEventsContainer extends React.Component {

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
                              <NewEventCard
                                cardInfo={card}
                                key={card.eventTitle}
                              />)
                       }
                   </div>
                }
                {this.props.cards.length == 0 &&
                    <div className="card-subcontainer">
                        <div> No New Events to Discover </div>
                    </div>
                }
            </div>
        );
    }
}

export default NewEventsContainer;
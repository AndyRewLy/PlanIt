import React, { Component } from 'react';
import Card from './Card'

class CardContainer extends React.Component {

    render() {
        var card = undefined;
        if (this.props.cards && this.props.cards.length > 0) {
            card = (this.props.cards)[0];
        }

        return (
            <div className="CardContainer">
                {this.props.cards.length > 0 &&
                   <div>
                       {
                           this.props.cards.slice(0).reverse().map(card =>
                              <Card
                                eventName={card.eventName}
                                eventTime={card.eventTime}
                                eventLocation={card.eventLocation}
                                organization={card.organization}
                              />)
                       }
                   </div>
                }
                {this.props.cards.length == 0 &&
                    <div>
                        <h1> You currently have no events. </h1>
                    </div>
                }
            </div>
        );
    }
}

export default CardContainer;
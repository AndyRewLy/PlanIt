import React, { Component } from 'react';
import RSVPEventCard from '../Card/RSVPEventCard'

require('./CardContainer.css')
class RSVPEventCardContainer extends React.Component {
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
                              <RSVPEventCard
                                renderEventInfo={this.props.renderEventInfo}
                                eventId={card[0].eventId}                                
                                eventTitle={card[0].eventTitle}
                                eventImage={card[0].eventImage}
                                eventStartTime={card[0].eventStartTime}
                                eventLocation={card[0].eventLocation}
                                RSVPStatus={card[1]}
                                key={card[0].eventTitle}
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

export default RSVPEventCardContainer;
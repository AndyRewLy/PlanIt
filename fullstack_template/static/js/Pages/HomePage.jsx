import CardContainer from '../Card/CardContainer';
import React, { Component } from 'react';

class HomePage extends React.Component {
    constructor(props){
        super(props);

        this.state={
            cards: []
        }
    }

    render() {
        return (
              <div>
                  <p> My Upcoming Events </p>
                  <CardContainer cards={this.state.cards}/>
                  <div className="CardContainer">
                {/* {this.state.cards.length > 0 &&
                   <div>
                       {
                           this.state.cards.slice(0).reverese().map(card =>
                              <Card
                                eventName={card.eventName}
                                eventTime={card.eventTime}
                                eventLocation={card.eventLocation}
                                organization={card.organization}
                              />)
                       }
                   </div>
                }
                {this.state.cards.length == 0 &&
                    <div>
                        <h1> You currently have no events. </h1>
                    </div>
                } */}
            </div>
              </div>
        );
      }
}

const style = {
    margin: 15,
};

export default HomePage;

import React, { Component } from 'react';

require('../../css/Card.css');
class EventCard extends React.Component {
    constructor(props){
    	super(props);
    	this.state={
              eventTitle:'',
              image: undefined,
              eventStartTime: '',
              eventLocation: '',
        };
      }
      
      render() {
      return (
          
        <div className="Card" onClick={() => this.props.renderEventInfo(this.props.eventId, this.props.canRSVP)}>
            <div className="card-content">
                <h1 className="card-sub-item">{this.props.eventTitle}</h1>
                <h1 className="card-sub-item">{this.props.eventLocation}</h1>
                <h1 className="card-sub-item">{this.props.eventStartTime}</h1>
            </div>
        </div>);
      }

}

export default EventCard;
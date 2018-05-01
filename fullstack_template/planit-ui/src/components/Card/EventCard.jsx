import React, { Component } from 'react';

require('./Card.css');
class EventCard extends React.Component {
    constructor(props){
    	super(props);
    	this.state={
              eventTitle:'',
              eventStartTime: '',
              eventLocation: '',
              eventImage: ''
        };
      }
      
      render() {
      return (
          
        <div className="Card" 
            onClick={() => {this.props.renderEventInfo(this.props.eventId, this.props.canRSVP)}}>
            <div className="card-content">
                <img class="card-sub-item" src= {this.props.eventImage}></img>
                <h1 className="card-sub-item">{this.props.eventTitle}</h1>
                <h2 className="card-sub-item">{this.props.eventLocation}</h2>
                <h2 className="card-sub-item">{this.props.eventStartTime}</h2>
            </div>
        </div>);
      }

}

export default EventCard;
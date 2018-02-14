import React, { Component } from 'react';

require('../../css/Card.css');
class EventCard extends React.Component {
    constructor(props){
    	super(props);
    	this.state={
              eventTitle:'',
        };
      }
      
      render() {
      return (
        <div className="Card">
            <div className="card-content">
                <h1 className="card-sub-item">{this.props.eventTitle}</h1>
            </div>
        </div>);
      }

}

export default EventCard;
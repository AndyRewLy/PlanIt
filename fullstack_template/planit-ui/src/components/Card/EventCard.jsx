import React, { Component } from 'react';

require('./Card.css');
var stock_photo = "https://assets.punchdrink.com/wp-content/uploads/2016/03/Article-Second-Cheapest-Wine-By-the-Glass-Restaurant-Dining-NYC-Gramercy-Tavern-Juliette-Pope-David-Lynch-Jose-Andres.jpg";

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
                <img class="card-sub-item" src= {this.props.eventImage} onError={(e) => {e.target.src=stock_photo; e.target.className="card-sub-item-err"}}></img>
                <div className="card-sub-container">
                    <h1 className="card-sub-item">{this.props.eventTitle}</h1>
                    <h2 className="card-sub-item">{this.props.eventLocation}</h2>
                    <h2 className="card-sub-item">{this.props.eventStartTime}</h2>
                </div>
            </div>
        </div>);
      }

}

export default EventCard;
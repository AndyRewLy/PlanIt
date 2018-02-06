import React, { Component } from 'react';

class Card extends React.Component {
    constructor(props){
    	super(props);
    	this.state={
              eventName:'',
              eventTime:'',
              eventLocation:'',
              organization:''
        };
      }
      
      render() {
      return (
        <div>
            <h1>{this.props.eventName}</h1>
            <h2>{this.props.eventTime}</h2>
            <h2>{this.props.eventLocation}</h2>
            <h2>{this.props.organization}</h2>
        </div>);
      }

}

export default Card;
import React, { Component } from 'react';

require('../../css/Card.css');
class OrgCard extends React.Component {
    constructor(props){
    	super(props);
    	this.state={
              organizationName:'',
              organizationDescription:''
        };
      }
      
      render() {
      return (
        <div className="Card" style={{backgroundImage: "url(" + this.props.organizationImage + ")"}}
         onClick={() => this.props.renderOrgInfo(this.props.organizationId, this.props.canJoin)}>
            <div class="card-content">
                <h1 class="card-sub-item">{this.props.organizationName}</h1>
                <h2 class="card-sub-item">{this.props.organizationDescription}</h2>
            </div>
        </div>);
      }

}

export default OrgCard;
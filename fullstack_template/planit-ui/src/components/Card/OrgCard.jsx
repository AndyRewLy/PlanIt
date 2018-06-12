import React, { Component } from 'react';

var default_img = "https://leanin-circles.s3.amazonaws.com/2014-10-23/1a3dca83-23cb-4d7f-9f77-08d4a92c84ef.jpg";

require('./Card.css');
class OrgCard extends React.Component {
    constructor(props){
    	super(props);
    	this.state={
              organizationName:'',
              organizationDescription:''
        };
      }
      
      render() {
          var adminRequests = this.props.adminRequests ? this.props.adminRequests : 0;
          var notificationShown = undefined;
          
          if (!this.props.canJoin && this.props.role != 'Member') {
            notificationShown = <div className="notification">{adminRequests}</div>;
          }

      return (
        <div className="Card"
         onClick={() => this.props.renderOrgInfo(this.props.organizationId, this.props.canJoin)}>
            <div class="card-content">
                <img class="card-sub-item" src= {this.props.organizationImage} onError={(e) => {e.target.src=default_img; e.target.className="card-sub-item-err"}}></img>
                <div className="card-sub-container">
                    <h1 class="card-sub-item">{this.props.organizationName}</h1>
                    <h2 class="card-sub-item">{this.props.organizationDescription}</h2>
                </div>
                {notificationShown}
            </div>
        </div>);
      }

}

export default OrgCard;
import React, { Component } from 'react';
import OrgCard from '../Card/OrgCard'

require('./CardContainer.css')
class OrgCardContainer extends React.Component {

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
                              filterText === undefined ||
                               (filterText && 
                                card.organizationName.match(new RegExp(filterText, 'i'))) ?
                              <OrgCard
                                role={this.props.role}
                                renderOrgInfo={this.props.renderOrgInfo ? this.props.renderOrgInfo : undefined}
                                key={card.organizationId}
                                organizationId = {card.organizationId}
                                organizationName={card.organizationName}
                                organizationDescription={card.organizationDescription}
                                organizationImage={card.organizationImage}
                                adminRequests={card.adminRequests}
                                canJoin={card.canJoin ? card.canJoin : false}
                              /> : '')
                       }
                   </div>
                }
                {this.props.cards.length == 0 &&
                    <div className="card-subcontainer">
                        <div> You currently have no orgs. </div>
                    </div>
                }
            </div>
        );
    }
}

export default OrgCardContainer;
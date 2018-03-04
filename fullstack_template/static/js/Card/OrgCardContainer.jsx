import React, { Component } from 'react';
import OrgCard from './OrgCard'

require('../../css/CardContainer.css')
class OrgCardContainer extends React.Component {

    render() {
        var card = undefined;
        if (this.props.cards && this.props.cards.length > 0) {
            card = (this.props.cards)[0];
        }

        return (
            <div className="CardContainer">
                {this.props.cards.length > 0 &&
                   <div className="card-subcontainer">
                       {
                           this.props.cards.slice(0).reverse().map(card =>
                              <OrgCard
                                key={card.organizationName}
                                organizationName={card.organizationName}
                                organizationDescription={card.organizationDescription}
                                organizationImage={card.organizationImage}
                              />)
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
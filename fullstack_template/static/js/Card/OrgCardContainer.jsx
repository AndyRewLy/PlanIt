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
                   <div class="card-subcontainer">
                       {
                           this.props.cards.slice(0).reverse().map(card =>
                              <OrgCard
                                organizationName={card.organizationName}
                                organizationDescription={card.organizationDescription}
                              />)
                       }
                   </div>
                }
                {this.props.cards.length == 0 &&
                    <div>
                        <h1> You currently have no orgs. </h1>
                    </div>
                }
            </div>
        );
    }
}

export default OrgCardContainer;
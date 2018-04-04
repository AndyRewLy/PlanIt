import TextField from 'material-ui/TextField';

import React, { Component } from 'react';
import OrgCardContainer from '../CardContainer/OrgCardContainer';
import OrgJoinDialog from '../Dialog/OrgJoinDialog';

require('./Home.css');

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showOrgInfo: false,
            calloutOrgId: undefined,
            canJoin: false,
            orgFilter: undefined
        }

        this.changeOrgJoinStatus = this.changeOrgJoinStatus.bind(this);
        this.updateOrgFilter = this.updateOrgFilter.bind(this);
        this.renderOrgInfo = this.renderOrgInfo.bind(this);
        this.handleOrgclose = this.handleOrgClose.bind(this);
    }

    changeOrgJoinStatus(response, orgId) {
        var that = this;

        this.props.postOrgJoinStatus(response, orgId,
            () => that.handleOrgClose());
    }

    updateOrgFilter(e, value) {
        this.setState({orgFilter: value});
    }

    renderOrgInfo(orgId, canJoin) {
        this.setState({
            showOrgInfo: !this.state.showOrgInfo,
            calloutOrgId: orgId,
            canJoin: canJoin
        });
    }

    handleOrgClose() {
        this.setState({showOrgInfo: !this.state.showOrgInfo});
    }

    render() {
        var memberOrgs = this.props.MemberOrgs;
        var orgId = this.state.orgId;
        var org = this.props.AllOrgs.filter(org => org.organizationId === orgId)[0];
        
        org = org ? org : {};

        return (
            <div>
                <div className="search-row">
                    <p className="row-item" style={style}> Discover Organizations </p>
                    <TextField className="row-item" hintText="Search for an Org" onChange={this.updateOrgFilter} />
                </div>
                <OrgCardContainer filterText={this.state.orgFilter}
                    cards={this.props.AllOrgs.map(org => {
                        org.canJoin = memberOrgs.filter(memOrg => 
                            memOrg.organizationId === org.organizationId
                        ).length ? false : true;
                        return org;
                    })}
                    renderOrgInfo={this.renderOrgInfo} />
                {this.props.AllOrgs.length ?
                    <OrgJoinDialog
                        submit={this.changeOrgJoinStatus}
                        canJoin={this.state.canJoin}
                        org={org}
                        open={this.state.showOrgInfo}
                        onClose={this.handleOrgClose} />
                    : ''}
            </div>
        );
    }
}

const style = {
    margin: 15,
};

export default Home;
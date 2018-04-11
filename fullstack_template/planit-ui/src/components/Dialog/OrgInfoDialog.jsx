import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

import React, { Component } from 'react';

class OrgInfoDialog extends Component {

    render() {
        const exit = <FlatButton label="Exit" primary={true} onClick={this.props.close}/>

        return (
            <Dialog actions={[exit]}
             title={this.props.org.organizationName}
             open={this.props.isVisible}
             onRequestClose={this.props.close}>
                <div>
                    <h5>Organization Type</h5>
                    <div>{this.props.org.organizationType}</div>
                </div>
                <div>
                    <h5>Organization Description</h5>
                    <div>{this.props.org.organizationDescription}</div>
                </div>
            </Dialog>
        );
    }
}

export default OrgInfoDialog;
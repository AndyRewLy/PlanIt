import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

require('./Comment.css')
class CommentContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            content:'',
            commentList: [] /* only being used to test UI*/
        }

        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.submitComment = this.submitComment.bind(this);
    }

    handleCommentChange(event, value) {
        this.setState({content: value});
    }

    validateInput() {
        //Validation
        this.submitComment();
    }

    submitComment() {
        //Submit comment
        
        //Remove this section after adding backend in
        console.log("Submit comment of ..." + this.state.content);
        console.log(this.state.commentList)
        this.setState({commentList: this.state.commentList.concat(<div>{this.state.content}</div>), content: ''});
        
    }

    render() {
        return (
            <div>
                <div className="comment-container">
                    {this.state.commentList /*Should end up being in the props somehow*/}
                </div>
                <div className="row">
                    <TextField style={{width: "80%"}} value={this.state.content} hintText="Input your comment..." onChange={this.handleCommentChange} />
                    <FlatButton label="Submit" primary={true} onClick={this.validateInput} />
                </div>
            </div>
        );
    }
}

export default CommentContainer;
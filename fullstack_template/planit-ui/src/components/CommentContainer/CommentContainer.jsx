import React, { Component } from 'react';
import Comment from './Comment'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

require('./Comment.css')
class CommentContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            content:''
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
        var event = this.props.event;

        //Submit comment
        this.props.postComment(event.eventId, this.state);
    }

    render() {
        let comMsg;
        if (this.props.comList.length == 0){
            comMsg = (<p> No comments yet.</p>)
        }
        else{
            comMsg = (
                this.props.comList.map(comment=>
                <Comment 
                    posterEmail={comment.user}
                    postingDate={comment.datePosted}
                    content={comment.content}
                />))
        }

        return (
            <div>
                <div className="comment-container">
                    {comMsg}
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
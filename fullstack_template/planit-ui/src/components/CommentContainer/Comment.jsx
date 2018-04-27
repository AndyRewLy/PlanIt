import React, { Component } from 'react';

require('./Comment.css');
class Comments extends React.Component {
    constructor(props){
    	super(props);
      }
      
    render() {
        return (
            <div className="comment" >
                <h1 className="com-sub-item">{this.props.posterEmail}</h1>
                <h2 className="com-sub-item">{this.props.postingDate}</h2>
                <p className='com-content'>{this.props.content}</p>
            </div>
        );
    }

}

export default Comments;
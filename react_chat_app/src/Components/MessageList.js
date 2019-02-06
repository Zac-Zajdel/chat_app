import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';


class MessageList extends Component {

  // Tests to see if the users scroll is >= to the entire box
  // If so we don't want the user to be forced back down.
  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this);
    this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
  }


  // ScrollTop is how far we have scrolled down.
  // ScrollHeight is how long our scrollable element is.
  // This then places us at the lowest we can be.
  componentDidUpdate() {
    if (this.shouldScrollToBottom) {
      const node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  }

  render() {
    // If the user hasn't yet entered a room.
    if (!this.props.roomId) {
      return (
        <div className='message-list'>
          <div className='join-room'>
            &larr; Join a room!
          </div>
        </div>
      );
    }
    return (
      <div className='message-list'>
        {this.props.messages.map((message, i) => {
          return (
            <Message key={i} username={message.senderId} text={message.text} />
          );
        })}
      </div>
    );
  }
}

export default MessageList;
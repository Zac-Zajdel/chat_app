import React, { Component } from 'react';
import Message from './Message';


class MessageList extends Component {
  render() {
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
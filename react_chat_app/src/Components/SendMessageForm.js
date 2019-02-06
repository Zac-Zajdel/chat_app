import React, { Component } from 'react';

class SendMessageForm extends Component {

  state = {
    message: ''
  }

  handleChange = e => {
    this.setState({
      message: e.target.value
    })
  }

  // Calls method inside of App.js to send Message to API
  handleSubmit = e => {
    e.preventDefault();
    this.props.sendMessage(this.state.message, this.props.roomId);
    this.setState({
      message: ''
    });
  }

  render() {
    return (
      <form
        className='send-message-form'
        onSubmit={this.handleSubmit}
      >
        <input
          onChange={this.handleChange}
          value={this.state.message}
          type='text'
          placeholder='Type your message and hit ENTER'
        />
      </form>
    );
  }
}

export default SendMessageForm;
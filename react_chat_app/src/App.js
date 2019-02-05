import React, { Component } from 'react';
import RoomList from './Components/RoomList';
import MessageList from './Components/MessageList';
import SendMessageForm from './Components/SendMessageForm';
import NewRoomForm from './Components/NewRoomForm';


class App extends Component {

  render() {
    return (
      <div className='app'>
        <RoomList />
        <MessageList />
        <SendMessageForm />
        <NewRoomForm />
      </div>
    );
  }
}

export default App;

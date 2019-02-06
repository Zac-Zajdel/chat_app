import React, { Component } from 'react';
import RoomList from './Components/RoomList';
import MessageList from './Components/MessageList';
import SendMessageForm from './Components/SendMessageForm';
import NewRoomForm from './Components/NewRoomForm';

import Chatkit from '@pusher/chatkit-client';
import { instanceLocator, tokenUrl } from './config';


class App extends Component {

  state = {
    messages: []
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: 'Zajdel',
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    })

    // Checks current user
    // chatManager
    //   .connect()
    //   .then(currentUser => {
    //     console.log("Connected as user ", currentUser);
    //     console.log(currentUser.rooms[0].id);
    //   })

    //I am successfully sending data.
    // chatManager.connect()
    //   .then(currentUser => {
    //     currentUser.sendMessage({
    //       text: "akaina",
    //       roomId: currentUser.rooms[0].id
    //     });
    //   })

    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.currentUser.subscribeToRoom({
          roomId: currentUser.rooms[0].id,
          hooks: {
            onMessage: message => {
              console.log(`Recieved new Message: ${message.text}`);
              this.setState({
                messages: [...this.state.messages, message]
              })
            }
          }
        })
      })
      .catch(error => {
        console.error("error:", error);
      });
  }

  sendMessage = (text) => {
    this.currentUser.sendMessage({
      text,
      roomId: this.currentUser.rooms[0].id
    });
  }



  render() {
    return (
      <div className='app'>
        <RoomList />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
        <NewRoomForm />
      </div>
    );
  }
}

export default App;

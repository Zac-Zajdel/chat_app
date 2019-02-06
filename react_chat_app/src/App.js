import React, { Component } from 'react';
import RoomList from './Components/RoomList';
import MessageList from './Components/MessageList';
import SendMessageForm from './Components/SendMessageForm';
import NewRoomForm from './Components/NewRoomForm';

import Chatkit from '@pusher/chatkit-client';
import { instanceLocator, tokenUrl } from './config';

class App extends Component {

  state = {
    roomId: null,
    messages: [],
    joinableRooms: [],
    joinedRooms: []
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
        this.getRooms();
      })
      .catch(error => console.error("error on connecting:", error));
  }

  // Called inside of RoomList and subscribes user to the room they click.
  // Resetting the state allows you to move between the different rooms.
  // Adds the previous messages with the new messages.
  subscribeToRoom = (roomId) => {
    this.setState({ messages: [] })
    this.currentUser.subscribeToRoom({
      roomId: roomId,
      hooks: {
        onMessage: message => {
          console.log(`Recieved new Message: ${message.text}`);
          this.setState({
            messages: [...this.state.messages, message]
          })
        }
      }
    })
      .then(room => {
        this.setState({ roomId: room.id });
        this.getRooms()
      })
      .catch(error => console.log('Error subscribing to the room: ', error));
  }

  // Obtains the rooms the user can join as well as already joined rooms.
  getRooms = () => {
    this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        })
      })
      .catch(error => console.log('Error on joinableRooms: ', error));
  }


  // Allows the user to send a message
  sendMessage = (text, roomId) => {
    this.currentUser.sendMessage({
      text,
      roomId: roomId
    });
  }

  render() {
    return (
      <div className='app'>
        <RoomList
          roomId={this.state.roomId}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
          subscribeToRoom={this.subscribeToRoom}
        />
        <MessageList messages={this.state.messages} />
        <SendMessageForm roomId={this.state.roomId} sendMessage={this.sendMessage} />
        <NewRoomForm />
      </div>
    );
  }
}

export default App;

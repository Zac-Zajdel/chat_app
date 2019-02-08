# Chat Application Built with React

This application allows a user to create a room where they can communicate with others users.

## What I learned from this project

- Higher understanding of using API's and reading through documentation.
- Reinforced knowledge on state manipulation in class-based components.
- Continuing to improve thinking in a component-based architecture.

## Components

This application was built using the following components:
- Message
  - Renders the user who send the text as well as the message itself.
- MessageList
  - Checks to assure the user hasn't joined a room upon entering the application.
  - When the user clicks or creates a room, the component renders the Message component.
- NewRoomForm
  - Handles the user creating a new room and renders accordingly.
- RoomList
  - Renders out the rooms the specific user has created in the past. Obtained from the API.
- SendMessageForm 
  - Handles user creating a message and sends the message to the API for storage.

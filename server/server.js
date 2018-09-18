const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const publicPath = path.join(__dirname, '/../public');
// console.log(__dirname + '/../public');
// console.log(publicPath);
//
app.use(express.static(publicPath));

// io.on lets you register an event listener
io.on('connection', (socket) => {
  console.log(`new user connected at socket`);
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room'));

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user has joined the room',
    createdAt: new Date().getTime()
  });
  // socket.emit('newEmail', {
  //   from: 'swainshrestha@outlook.com',
  //   text: 'how are you?',
  //   createdAt: 123
  // });
  //
  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail', newEmail);
  // });

  // socket.emit('newMessage', {
  //    socket.emit only emits to single connection
  //   from: 'papa',
  //   text: 'hello beta. how do you do?',
  //   createdAt: 123
  // });

  socket.on('createMessage', (newMsg, callback) => {
    console.log('createMessage', newMsg);
    io.emit('newMessage', generateMessage(newMsg.from, newMsg.text));
    // socket.broadcast.emit('newMessage', {
    //   from: newMsg.from,
    //   text: newMsg.text,
    //   createdAt: new Date().getTime()
    // });
    callback('Server received your message');
  });
  socket.on('disconnect', () => {
    console.log('disconnected from the server');
  });

});

server.listen(port, () => {
  console.log(`server started on port ${port}`);
});

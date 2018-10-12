const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

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

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Valid name and room are required');

    }
    socket.join(params.room);
    // socket.leave('The office fans');
    // io.emit --> emit to all User
    // socket.broadcast.emit --> emit to all except the current user
    // socket.emit --> emit to current user
    // emitting to Room
    // io.to('room name').emit
    // socket.broadcast.to(.....).emit
    // socket.emit0
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room'));

    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
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

  socket.on('createLocationMessage', (coord) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coord.latitude, coord.longitude));
  });
  socket.on('disconnect', () => {
    console.log('disconnected from the server');
  });

});

server.listen(port, () => {
  console.log(`server started on port ${port}`);
});

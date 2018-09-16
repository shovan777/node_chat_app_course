var socket = io();
socket.on('connect', function () {
  console.log('connected to the server');

  // socket.emit('createEmail', {
  //   to: 'shovan777@gmail.com',
  //   text: 'hey. whats up'
  // });

  socket.emit('createMessage', {
    from: 'beta',
    text: 'hello papa. I do fine.'
  });
});

socket.on('newMessage', function(msg) {
  console.log('new msg has arrived', msg);
});

socket.on('disconnect', function () {
  console.log('disconnected from the server');
});

// socket.on('newEmail', function (email) {
//   console.log('New email has arrived', email);
// });

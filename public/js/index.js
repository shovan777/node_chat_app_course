var socket = io();
socket.on('connect', function () {
  console.log('connected to the server');

  // socket.emit('createEmail', {
  //   to: 'shovan777@gmail.com',
  //   text: 'hey. whats up'
  // });

  // socket.emit('createMessage', {
  //   from: 'beta',
  //   text: 'hello papa. I do fine.'
  // });
});

socket.on('newMessage', function(msg) {
  console.log('new msg has arrived', msg);
  var li = jQuery('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);
  jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hello'
// }, function (ackMsg) {
//   console.log('got it', ackMsg);
// });


socket.on('disconnect', function () {
  console.log('disconnected from the server');
});

// socket.on('newEmail', function (email) {
//   console.log('New email has arrived', email);
// });
//
jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function (ackMsg) {
    console.log('got it', ackMsg);
  });
});


var locationButton = jQuery('#sendLocation');
locationButton.on('click', function () {
  if(!navigator.geolocation) {
    return alert('geolocation not supported by browser');
  }

  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, function () {
      alert('Unable to fetch user location');
    });
});

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  // _blank tells to open the link in new tab
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

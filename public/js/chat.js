var socket = io();

function scrollToBottom() {
  // selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');

  // heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    // console.log('should scroll');
    messages.scrollTop(scrollHeight);
  }

}
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
  // console.log('new msg has arrived', msg);
  var formattedTime = moment(msg.createdAt).format('h:mm a');
  // var li = jQuery('<li></li>');
  // li.text(`${msg.from} ${formattedTime}: ${msg.text}`);
  // jQuery('#messages').append(li);
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: msg.text,
    from: msg.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
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
  var messageTextBox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function (ackMsg) {
    console.log('got it', ackMsg);
    messageTextBox.val('');
  });
});


var locationButton = jQuery('#sendLocation');
locationButton.on('click', function () {
  if(!navigator.geolocation) {
    return alert('geolocation not supported by browser');
  }
// disable the button until location task has been completed
  locationButton.attr('disabled', 'disabled').text('Sending location....');

  navigator.geolocation.getCurrentPosition(
    // locationButton.removeAttr('disabled')
    function (position) {
      locationButton.removeAttr('disabled').text('Send Location');
      console.log(position);

      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, function () {
      locationButton.removeAttr('disabled').text('Send Location');
      alert('Unable to fetch user location');
    });
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = new moment(message.createdAt).format('h:mm a');
  // var li = jQuery('<li></li>');
  // // _blank tells to open the link in new tab
  // var a = jQuery('<a target="_blank">My current location</a>');
  //
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

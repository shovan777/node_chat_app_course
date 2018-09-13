const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

  socket.on('disconnect', () => {
    console.log('disconnected from the server');
  });

});




server.listen(port, () => {
  console.log(`server started on port ${port}`);
});

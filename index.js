const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 8000;

const users={};

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Socket.IO events
io.on('connection', (socket) => {
  // console.log('A user connected.');

  socket.on('new-user-joined', (name) => {
    // console.log('new user ',name);
    users[socket.id]=name;
    socket.broadcast.emit('new-user-joined',name);
    });

  // Listen for chat messages
  socket.on('chatMessage', (message) => {
    //console.log('Message:', message);
    socket.broadcast.emit('chatMessage', {message:message,name: users[socket.id]}); // Broadcast the message to all connected clients
  });

  // Handle disconnection
  socket.on('disconnect', (message) => {
    console.log('A user disconnected.');
    socket.broadcast.emit('user-left', users[socket.id]);
    delete users[socket.id];
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

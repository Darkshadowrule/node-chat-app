const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
var {generateMessage,generateLocationMessage}=require('./utils/message');
publicPath=path.join(__dirname,'/../public')
const port=process.env.PORT || 3000;
var app=express();
var server = http.createServer(app);

var io=socketIO(server);
app.use(express.static(publicPath))
io.on('connection',(socket)=>{
  console.log("New user connected");
  socket.emit('newMessage',generateMessage(`Admin','Welcome to Prajjwal's chat app`));
  socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

  socket.on('createMessage',(message,callback)=>{
    console.log(message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback();
  });
  socket.on('createLocationMessage',(coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude))
  })
  socket.on('disconnect',()=>{
    console.log("User was disconnected");
  });
});

server.listen(port,()=>{
  console.log(`Running on port ${port}`);
})

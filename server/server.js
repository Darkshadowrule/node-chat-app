const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const {Users} = require('./utils/users');
const {isRealString} = require('./utils/validation');
var {generateMessage,generateLocationMessage}=require('./utils/message');
publicPath=path.join(__dirname,'/../public')
const port=process.env.PORT || 3000;
var app=express();
var server = http.createServer(app);
var io=socketIO(server);
var users =new Users();

app.use(express.static(publicPath))
io.on('connection',(socket)=>{
  console.log("New user connected");
   socket.on('join',(params,callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room))
    return callback("Name and room are required")
    socket.join(params.room);
    users.removeUser(socket.id)
    users.addUser(socket.id,params.name,params.room)

    io.to(params.room).emit('updateUserList',users.getUserList(params.room ))

    socket.emit('newMessage',generateMessage('Prajjwal:The Admin',`Welcome to chat application`));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Prajjwal:The Admin',`${params.name} has joined`));
    callback();
   });


  socket.on('createMessage',(message,callback)=>{
    var user=users.getUser(socket.id);
    if(user && isRealString(message.text))
    io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
    callback();
  });
  socket.on('createLocationMessage',(coords)=>{
    var user=users.getUser(socket.id);
    if(user)
    io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude))
  })
  socket.on('disconnect',()=>{
  var user = users.removeUser(socket.id);
  if(user){
    io.to(user.room).emit('updateUserList',users.getUserList(user.room));
    io.to(user.room).emit('newMessage',generateMessage('Prajjwal:The Admin',`${user.name} has left`))
  }
  });
});

server.listen(port,()=>{
  console.log(`Running on port ${port}`);
})

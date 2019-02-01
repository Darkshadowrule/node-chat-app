const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');


publicPath=path.join(__dirname,'/../public')
const port=process.env.PORT || 3000;
var app=express();
var server = http.createServer(app);
var io=socketIO(server);
app.use(express.static(publicPath))


io.on('connection',(socket)=>{
  console.log("New user connected");
  socket.on('disconnect',()=>{
    console.log("User was disconnected");
  });
  socket.on('createMessage',function(data){
    console.log(data);
  })
  socket.emit('newMessage',{
    text:"Hlo",
    from:"xyz@gmail.com"
  });

});

server.listen(port,()=>{
  console.log(`Running on port ${port}`);
})

var socket=io();
socket.on('connect',function(){
console.log("Connected to server")
})
socket.on('newMessage',function(data){
  console.log(data);
  var li=jQuery('<li></li>')
  li.text(`${data.from}:${data.text}`)
  jQuery("#messages").append(li);
})
socket.on('disconnect',function(){
console.log("Disconnected from server")
})
jQuery('#message-form').on('submit',function (e) {
  e.preventDefault();
  socket.emit('createMessage',{
    from:"User",
    text:jQuery('[name=message]').val()
  },function () {

  });
});
var locationButton=jQuery('#send-location');
locationButton.on('click',function () {
  if(!navigator.geolocation)
  return alert('Your browser don not support this feature');
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  },function () {
    alert('Unable to fetch location');
  })
})

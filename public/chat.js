// Create socket on the client end
var socket = io.connect('http://localhost:8080');

// Query DOM
var message = document.getElementById("message");
var handle = document.getElementById("handle");
var button = document.getElementById("send");
var output = document.getElementById("output");
var feedback = document.getElementById("feedback");


// Emit events(when message is sent by the user)
button.addEventListener('click',function(){

    socket.emit('chat', {
        text: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress',function(){
    socket.emit('typing',handle.value);
});

// Listen for events
socket.on('chat',function(data){
    feedback.innerHTML = "";
   output.innerHTML += '<p><strong>'+ data.handle + ' : </strong>' + data.text + '</p>';
});

socket.on('typing',function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing...</em></p>';
});
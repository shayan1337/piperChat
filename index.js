var express = require('express');
var socket = require('socket.io');


// create a middleware application
var app = express();
var server = app.listen(8080,function () {

    console.log('Listening to port number 8080....');

});

// serve static files
app.use(express.static('public'));


// setup the socket on the server
var io = socket(server);
io.on('connection',function(socket)
{
    console.log('Socket id is: ',socket.id);

    socket.on('chat',function(data){
        io.sockets.emit('chat',data);
    });

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    });
});


const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);        // to create a server...
const path = require('path');
const {Server} = require('socket.io');
const io = new Server(server);   // to integrate server and websocket in backend..


app.use(express.static(path.join(__dirname + '/public')));

io.on('connection',(socket)=>{
    console.log("a user is connected!");
    // socket.on('chat message',(msg)=>{
    //     io.emit('chat message',msg);
    // })

    // three event will occur 1> join 2>exit 3>message update
    socket.on('newuser',function(username){                              // means that we declear in server that if newuser event occurs then the call back function will run.
        socket.broadcast.emit('update',username + " join the conversation!");   // transfer message to all except the sender itself that a new user have join the conversation.
    });

    socket.on('exituser',function(username){         // means that if exituser event will occur than the callback function will run.....
        socket.broadcast.emit('update',username + " left the conversation!");
    });

    socket.on('chat',function(message){
        socket.broadcast.emit('chat',message); // message will sent to all the other user who have joined the converation.
    })
})



server.listen(9000,()=>{
    console.log("server is running ........");
})
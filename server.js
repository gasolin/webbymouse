/* jshint node: true */
'use strict';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var robot = require("robotjs");

var mouse = null;
var newX = null;
var newY = null;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  socket.broadcast.emit('hi');
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('mouse', function(pos) {
    console.log('message: ' + pos);
    mouse = robot.getMousePos();
    console.log("Mouse is at x:" + mouse.x + " y:" + mouse.y);
    newX = mouse.x + pos.x;
    newY = mouse.y + pos.y;
    console.log('Offset is x:'+ newX + ' y:' + newY);
    robot.moveMouse(newX, newY);
    mouse = robot.getMousePos();
    console.log("after x:" + mouse.x + " y:" + mouse.y);
    // mouse.mouseClick();
    // mouse.typeString(msg);
    //Press enter.
    //mouse.keyTap("enter");
    // send to everyone
    io.emit('mouse', pos);
  });
});

var PORT = 8000;
http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});


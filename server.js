/* jshint node: true */
'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var robot = require("robotjs");

var adjustment = 2;
var mouse = null;
var newX = null;
var newY = null;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.use('/js', express.static('js'));

io.on('connection', function(socket) {
  socket.broadcast.emit('hi');
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('mouse', function(pos) {
    if (pos.cmd == 'move') {
      mouse = robot.getMousePos();
      //console.log("Mouse is at x:" + mouse.x + " y:" + mouse.y);
      newX = mouse.x + pos.x * adjustment;
      newY = mouse.y + pos.y * adjustment;
      //console.log('Offset is x:'+ newX + ' y:' + newY);
      //robot.moveMouseSmooth(newX, newY);
      robot.moveMouse(newX, newY);
      mouse = robot.getMousePos();
      //console.log("after x:" + mouse.x + " y:" + mouse.y);
    } else if (pos.cmd == 'click') {
      robot.mouseClick();
      // robot.typeString(msg);
      //Press enter.
      // robot.keyTap("enter");
    }
    else if (pos.cmd == 'rightclick') {
      robot.mouseClick('right');
    }
    // send to everyone
    //io.emit('mouse', pos);
  });
});

var PORT = 8000;
http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});


# Overview

Air Mouse and touchpad with full web technology

The server side `server.js` manage the mouse position change, the client side send position offset to server. 

The desktop side `desktop.html` includes `server.js` and provide the connection instruction and system tray.

In client side `index.html`, just call emitMouse to update the mouse position.

## Setup

Get required packages

$ npm install
$ bower install

Then run

$ node server.js


## Build for Desktop

You need install node-webkit-builder first

$ npm install node-webkit-builder -g

You have to check nw.js website and use same io.js version as nw.js did.

$ nvm install iojs-1.2.1
$ nvm use iojs

To build a smaller package, we only need install essential libraries for production.
Clone a new repository and run following commands:

$ npm install --production
$ nwbuild -p osx64 webbymouse2

Currently MacOS is the only support platform.


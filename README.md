Air Mouse and touchpad with full web technology

[![Build Status](https://travis-ci.org/gasolin/webbymouse.png)](https://travis-ci.org/gasolin/webbymouse) [![david-dm](https://david-dm.org/gasolin/webbymouse.png)](https://david-dm.org/gasolin/webbymouse) [![devDependency Status](https://david-dm.org/gasolin/webbymouse/dev-status.svg)](https://david-dm.org/gasolin/webbymouse#info=devDependencies)

# Overview

The server side `server.js` manage the mouse position change, the client side send position offset to server. 

The desktop side `desktop.html` includes `server.js` and provide the connection instruction and system tray.

In client side `index.html`, just call emitMouse to update the mouse position.


## Mode

### Touchpad mode

* Use `Single finger touch` will let you move the mouse.
* Use `Double finger touch` will let you scroll the content.
* Use `Single finger tap` will let you simulate left click.
* Use `Double finger tap` will let you simulate right click.

### Air mouse mode

TBD

### Present mode

TBD


# How to Contribute

Patch is welcome.
If you feel Webby Mouse is useful, please spread the word on social media!

## Technology used

* Server
  * [Express](http://expressjs.com/)
* Desktop
  * Application packager: [NW.js](https://github.com/nwjs/nw.js/) (Node Webkit)
  * Mouse action: [RobotJS](https://github.com/octalmage/robotjs/)
  * QRCode: [jquery qrcode](https://github.com/jeromeetienne/jquery-qrcode)
* Client
  * Touch detection: [HammerJs](http://hammerjs.github.io/)
  * Mobile accelerator: [DeviceOrientation](http://caniuse.com/#feat=deviceorientation)
* Shared
  * App Template: [Webapplate](https://github.com/webapplate/webapplate)
  * UI: [Bootstrap](https://github.com/twbs/bootstrap) CSS framework
  * Real time communication: [socket.io](http://socket.io/)

## Setup

Get required packages

```
$ npm install
```

Which will also run `bower install` to install related client side libraries into `public/vendor` folder.

Then run

```
$ node server.js
```

To host the mouse server on desktop.


## Build for Desktop

You need install node-webkit-builder first

```
$ npm install node-webkit-builder -g
```

You have to check nw.js website and use same io.js version as nw.js did.

```
$ nvm install iojs-1.2.1
$ nvm use iojs
```

To build a smaller package, we only need install essential libraries for production.
Clone a new repository and run following commands:

```
$ npm install --production
$ nwbuild -p osx64 webbymouse
```

Currently MacOS is the only support platform.


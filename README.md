Air Mouse and touchpad with full web technology.

[![Build Status](https://travis-ci.org/gasolin/webbymouse.png)](https://travis-ci.org/gasolin/webbymouse) [![Dependency Status](https://gemnasium.com/gasolin/webbymouse.svg)](https://gemnasium.com/gasolin/webbymouse)

# Install

Unzip [downloaded zip](https://github.com/gasolin/webbymouse/releases), tap to open it. Then you have a desktop with mouse server enabled.

![Imgur](http://i.imgur.com/y4OSyqy.png)

Open your mobile browser by scanning the QRCode or enter the URL, then you are able to control your desktop via browser.

## Features

### Touchpad mode (Mouse Control)

* Use `Single finger touch` will let you move the mouse.
* Use `Double finger touch` will let you scroll the content.
* Use `Single finger tap` will let you simulate left click.
* Use `Double finger tap` will let you simulate right click.

### Air mouse mode (Motion Control)

Tap menu then choose `Motion Control`, then you can wave your mobile device to control the mouse.

### Present mode

Tap menu then choose `Presentation Control`, then you can control the presentation by:

* Use `Single finger tap` will let you simulate right arrow.
* Use `Double finger tap` will let you simulate left arrow.

### Passcode protection

On desktop and on client side browser, tap menu then choose `Passcode` to enter same string on prompt, then you can make sure the mouse is only accessible by you. (The passcode is not remembered and should re-entered when you restart the desktop next time)


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
  * Web socket: [socket.io](http://socket.io/) Real time communication

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

## Code structure

The server side `server.js` manage the mouse position change, the client side send position offset to server. 

The desktop side `desktop.html` includes `server.js` and provide the connection instruction and system tray.

In client side `index.html`, just call emitMouse to update the mouse position.


## Build for Desktop

You need install node-webkit-builder first

```
$ npm install nw-builder -g
```

You have to check nw.js website and use same io.js version as nw.js did.

```
$ nvm install iojs-1.2.0
$ nvm use iojs
```

To build a smaller package, we only need install essential libraries for production.
Clone a new repository and run following commands:

```
$ npm install --production
$ nwbuild -p osx64 webbymouse -v 0.12.3
```

Due to underlying robotjs mouse library, currently MacOS is the only support platform.


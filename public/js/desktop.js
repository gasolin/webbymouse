/* jshint node: true */
/* global $ */
'use strict';

$(document).ready(function() {
  // enable server
  require('./server.js');
  var gui = require('nw.gui');
  var os = require('os');
  var config = require('./public/js/config.js');

  var desc = document.getElementById('desc');
  var pw = document.getElementById('passcode');

  // show ip address
  var ifaces = os.networkInterfaces();
  var PORT = 8000;

  var url = '';
  Object.keys(ifaces).forEach(function(ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function(iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        // console.log('ifname + ':' + alias, iface.address);
        url = 'http://' + iface.address + ':' + PORT;
        desc.innerHTML = url;
      } else {
        // this interface has only one ipv4 adress
        // console.log('listening on ' + ifname + ' ' +
        //   iface.address + ':' + PORT);
        url = 'http://' + iface.address + ':' + PORT;
        desc.innerHTML = url;
      }
      alias++;
    });
  });

  // show QRCode
  $('#qrcode').qrcode({width: 128, height: 128, text: url});

  // Reference to window and tray
  var win = gui.Window.get();
  var tray;

  // Get the minimize event
  win.on('minimize', function() {
    // Hide window
    this.hide();
  });

  // Show tray
  tray = new gui.Tray({
    tooltip: 'Webby Mouse',
    icon: 'public/style/icons/favicon.ico'
  });

  var menu = new gui.Menu();
  menu.append(new gui.MenuItem({
    label: 'About Webby Mouse',
    click: function() {
      if (confirm('Webby Mouse: Air mouse made with full web technology.\n' +
        'Visit our web site for more information?')) {
        gui.Shell.openExternal('https://github.com/gasolin/webbymouse');
      }
    }
  }));
  menu.append(new gui.MenuItem({type: 'separator'}));
  menu.append(new gui.MenuItem({
    label: 'Show',
    click: function() {
      win.show();
    }
  }));
  menu.append(new gui.MenuItem({type: 'separator'}));
  menu.append(new gui.MenuItem({
    label: 'Close',
    click: function() {
      win.close();
    }
  }));
  tray.menu = menu;

  pw.addEventListener('click', function() {
    config.passcode = prompt('Enter a passcode');
  });
});


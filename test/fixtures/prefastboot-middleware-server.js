'use strict';

var path = require('path');
var alchemistRequire = require('broccoli-module-alchemist/require');
var FastBootAppServer = alchemistRequire('fastboot-app-server');

function setStatusCode418(req, res, next) {
  res.status(418);
  next();
}

function setXTestHeader(req, res, next) {
  res.set('X-Test-Header', 'testing')
  next();
}

function sendJsonAndTerminate(req, res, next) {
  res.json({ send: 'json back' });
  res.send();
}

var server = new FastBootAppServer({
  distPath: path.resolve(__dirname, './basic-app'),
  preFastbootMiddlewares: [
    [ setStatusCode418 ],
    [ setXTestHeader ],
    [ sendJsonAndTerminate ]
  ],
});

server.start();

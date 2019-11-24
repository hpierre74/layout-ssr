'use strict';
const functions = require('firebase-functions');
const app = require('./build/server.bundle').default;

exports.app = functions.https.onRequest(app);

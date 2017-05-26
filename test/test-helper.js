var jsdom = require('jsdom').jsdom;
var fs = require('fs');
var userHTML = stripScripts(fs.readFileSync(require.resolve("../index.html"), {encoding: "utf-8"}));

var document = jsdom(userHTML),
    window = document.parentWindow;
    navigator = window.navigator = {},
    node = window.Node,
    mocha = {},
    beforeEach = beforeEach,
    afterEach = afterEach;

module.exports = {
    document,
    window,
    navigator,
    node,
    mocha,
    beforeEach,
    afterEach
}

global.document = ;
global.window = global.document.parentWindow;
global.navigator = window.navigator = {};
global.Node = window.Node;

global.window.mocha = {};
global.window.beforeEach = beforeEach;
global.window.afterEach = afterEach;

require('../src/bower_components/angular');
require('../src/bower_components/angular-mocks');

global.angular = window.angular;
global.inject = global.angular.mock.inject;
global.ngModule = global.angular.mock.module;   

var window;

const stripScripts = require('strip-scripts');
const serialDoc = require("jsdom").serializeDocument;

const userScript = fs.readFileSync(require.resolve("../main.js"), {encoding: "utf-8"});
const jsdom = require("jsdom");

module.exports = {
  serialDoc,
  jsdom,
  window,
  loadWindow
}

/////////

function loadWindow() {
  const document = jsdom.jsdom(userHTML);
  
  window = document.defaultView;
  const scriptEl = document.createElement("script");
  scriptEl.textContent = userScript;
  document
    .body
    .appendChild(scriptEl);

  return window;
}
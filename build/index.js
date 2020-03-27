"use strict";

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var PORT = 4000;

var handleListening = function handleListening() {
  return console.log("Listenin on: http://localhost:".concat(PORT));
};

var handleHome = function handleHome(req, res) {
  return res.send("Hello from home");
};

var handleProfile = function handleProfile(req, res) {
  return res.send("dddddd");
};

app.use((0, _cookieParser["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _helmet["default"])());
app.use((0, _morgan["default"])("common"));

var middleware = function middleware(req, res, next) {
  res.send("not happening");
};

app.get("/", handleHome);
app.get("/profile", handleProfile);
app.listen(4000, handleListening);
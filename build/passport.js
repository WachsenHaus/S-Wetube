"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _passportGithub = _interopRequireDefault(require("passport-github"));

var _User = _interopRequireDefault(require("./models/User"));

var _userController = require("./controllers/userController");

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// passport.use(User.createStrategy());
_passport["default"].use(_User["default"].createStrategy()); //숏컷으로  인증방식을 쉽게 만듬. passport use에 필요한 객체를 passport-lacol-mongoose가 쉽게만들어줌.


_passport["default"].use(new _passportGithub["default"]({
  clientID: process.env.GH_ID,
  clientSecret: process.env.GH_SECRET,
  callbackURL: "http://localhost:4000".concat(_routes["default"].gitHubCallback)
}, _userController.githubLoginCallback));

_passport["default"].serializeUser(_User["default"].serializeUser()); //어떤정보를 쿠키에게 주느냐. //웹에서 유저에대해 어떤정보를 가질수 있느냐.


_passport["default"].deserializeUser(_User["default"].deserializeUser()); //이것도 숏컷으로 만든 기능임
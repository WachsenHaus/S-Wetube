"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _apiRouter = _interopRequireDefault(require("./routers/apiRouter"));

var _passport = _interopRequireDefault(require("passport"));

var _middlewares = require("./middlewares");

var _userRouter = _interopRequireDefault(require("./routers/userRouter"));

var _videoRouter = _interopRequireDefault(require("./routers/videoRouter"));

var _globalRouter = _interopRequireDefault(require("./routers/globalRouter"));

var _routes = _interopRequireDefault(require("./routes"));

require("./passport");

var _expressSession = _interopRequireDefault(require("express-session"));

var _path = _interopRequireDefault(require("path"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { userRouter } from "./routers/userRouter";
//db와 연결을 해준다.
var app = (0, _express["default"])();
var CokieStore = (0, _connectMongo["default"])(_expressSession["default"]);
app.use((0, _helmet["default"])()); //앱이 더 안전하도록 만들어준다.

app.set("view engine", "pug");
app.set("views", _path["default"].join(__dirname, "views"));
app.use("/static", _express["default"]["static"](_path["default"].join(__dirname, "static")));
app.use((0, _cookieParser["default"])()); //쿠키를 전달받아서 사용할 수 있도록 만들어주는 미들웨어. 사용자 인증 가은 곳에서 쿠키를 검사할때 사용함.

app.use(_bodyParser["default"].json()); //사용자가 웹사이트로 전달하는 정보들을 검사하는 미들웨어. 리퀘스트 정보에서 폼이나 json형태로 전달함.
//아바타의 사진이나 비디오를 업로드할때 제목이나 댓글 같은 정보를 전달할때 폼에 담아서 업로드해야함.

app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _morgan["default"])("common")); //앱에서 발생하는 모든일을 로깅한다.

app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  //쿠키 정보를 암호화시켜주낟. 꼭 필요한 정보임.
  resave: true,
  saveUninitialized: false,
  store: new CokieStore({
    mongooseConnection: _mongoose["default"].connection
  })
}));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
app.use(_middlewares.localsMiddleware);
app.use(_routes["default"].home, _globalRouter["default"]);
app.use(_routes["default"].users, _userRouter["default"]); //use는 누군가 접속하면 router전체를 사용한다는 뜻이다.

app.use(_routes["default"].videos, _videoRouter["default"]);
app.use(_routes["default"].api, _apiRouter["default"]);
var _default = app;
exports["default"] = _default;
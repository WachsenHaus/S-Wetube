import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
// import { userRouter } from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import "./passport";
import session from "express-session";
import mongoose from "mongoose"; //db와 연결을 해준다.
import MongoStore from "connect-mongo";

const app = express();

const CokieStore = MongoStore(session);

app.use(helmet()); //앱이 더 안전하도록 만들어준다.
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser()); //쿠키를 전달받아서 사용할 수 있도록 만들어주는 미들웨어. 사용자 인증 가은 곳에서 쿠키를 검사할때 사용함.
app.use(bodyParser.json()); //사용자가 웹사이트로 전달하는 정보들을 검사하는 미들웨어. 리퀘스트 정보에서 폼이나 json형태로 전달함.
//아바타의 사진이나 비디오를 업로드할때 제목이나 댓글 같은 정보를 전달할때 폼에 담아서 업로드해야함.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("common")); //앱에서 발생하는 모든일을 로깅한다.

app.use(
  session({
    secret: process.env.COOKIE_SECRET, //쿠키 정보를 암호화시켜주낟. 꼭 필요한 정보임.
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); //use는 누군가 접속하면 router전체를 사용한다는 뜻이다.
app.use(routes.videos, videoRouter);

export default app;

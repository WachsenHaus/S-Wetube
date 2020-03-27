import passport from "passport";
import GithubStrategy from "passport-github";

import User from "./models/User";
import { githubLoginCallback } from "./controllers/userController";
import routes from "./routes";

// passport.use(User.createStrategy());
passport.use(User.createStrategy()); //숏컷으로  인증방식을 쉽게 만듬. passport use에 필요한 객체를 passport-lacol-mongoose가 쉽게만들어줌.
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://guarded-spire-96872.herokuapp.com${routes.githubCallback}`
        : `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);

passport.serializeUser(User.serializeUser()); //어떤정보를 쿠키에게 주느냐. //웹에서 유저에대해 어떤정보를 가질수 있느냐.
passport.deserializeUser(User.deserializeUser()); //이것도 숏컷으로 만든 기능임

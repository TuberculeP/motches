import dotenv from "dotenv";
import path from "path";
// env file is in the root of the project ".env or .env.local"
dotenv.config({
  path: [
    path.resolve(__dirname, "../../.env.local"),
    path.resolve(__dirname, "../../.env"),
  ],
});
import "./config";
import express from "express";
import session from "express-session";
import { router } from "./routes";
import passport from "passport";
import cors from "cors";
import cookieParser from "cookie-parser";
import RedisStore from "connect-redis";
import { createClient } from "redis";

const { EXPRESS_PORT, SESSION_SECRET, EXPRESS_DOMAIN, VITE_PORT, VITE_DOMAIN } =
  process.env;

if (
  !EXPRESS_PORT ||
  !SESSION_SECRET ||
  !EXPRESS_DOMAIN ||
  !VITE_PORT ||
  !VITE_DOMAIN
) {
  throw new Error("Please provide all the required environment variables");
}

const app = express();
const client = createClient();

client.on("error", (err) => console.error("Redis error:", err));
client.connect().catch(console.error);

app
  .use(cookieParser())
  .use(
    session({
      store: new RedisStore({ client }),
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    })
  )
  .use(express.json())
  .use(
    cors({
      origin: [
        `http://${EXPRESS_DOMAIN}:${EXPRESS_PORT}`,
        `http://${VITE_DOMAIN}:${VITE_PORT}`,
      ],
      credentials: true,
      exposedHeaders: ["set-cookie"],
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(router);

app.listen(EXPRESS_PORT, () => {
  console.log(
    `[server]: Server is running at http://${EXPRESS_DOMAIN}:${EXPRESS_PORT}`
  );
});

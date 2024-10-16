import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { userService } from "@/services";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, EXPRESS_DOMAIN, EXPRESS_PORT } =
  process.env;

if (
  !GOOGLE_CLIENT_ID ||
  !GOOGLE_CLIENT_SECRET ||
  !EXPRESS_DOMAIN ||
  !EXPRESS_PORT
) {
  throw new Error("Please provide all the required environment variables");
}

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `http://${EXPRESS_DOMAIN}:${EXPRESS_PORT}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await userService.findOrCreateUser(profile);
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await userService.findById(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

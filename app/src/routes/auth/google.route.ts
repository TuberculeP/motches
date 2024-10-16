import { Router } from "express";
import passport from "passport";

const googleRouter = Router();
const { VITE_PORT, VITE_DOMAIN } = process.env;

if (!VITE_PORT || !VITE_DOMAIN) {
  throw new Error("Please provide all the required environment variables");
}

googleRouter.get("/", passport.authenticate("google", { scope: ["profile"] }));

googleRouter.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect front-end home.
    res.redirect(`http://${VITE_DOMAIN}:${VITE_PORT}`);
  }
);

export { googleRouter };

import express from "express";
import { googleRouter } from "./google.route";

const authRouter = express.Router();

authRouter.use("/google", googleRouter);

authRouter.get("/check", (req, res) => {
  if (req.user) {
    // return 200
    return res.json({ user: req.user });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

export { authRouter };

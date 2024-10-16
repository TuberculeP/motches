import { authRouter } from "./auth";
import express from "express";
import { wordRouter } from "./word";

const router = express.Router();

router.get("/", (req, res) => {
  // get user from session
  const user = req.user;
  return res.json({ user });
});

router.use("/auth", authRouter);
router.use("/word", wordRouter);
export { router };

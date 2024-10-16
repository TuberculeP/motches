import { wordService } from "@/services";
import { notifyUpdateLeaderboard } from "@/services/pubsub.service";
import { Router } from "express";
import { PgUser } from "shared/types";

const dailyWordRouter = Router();

dailyWordRouter.post("/", async (req, res) => {
  const user = req.user as PgUser;
  if (!user) return res.status(401).json({ message: "Unauthorized" });
  const word = await wordService.getUserDailyWord(user.id);
  console.log("word", word);
  return res.json({ word });
});

dailyWordRouter.post("/vote", async (req, res) => {
  const user = req.user as PgUser;
  if (!user) return res.status(401).json({ message: "Unauthorized" });
  const { word, note } = req.body;
  console.log(word, note);
  await wordService.addVote(user.id, word, note);
  await notifyUpdateLeaderboard();
  return res.json({ message: "Vote added" });
});

export { dailyWordRouter };

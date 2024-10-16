import { Router } from "express";
import { wordService } from "@/services";
import { PgUser } from "shared/types";

const leaderboardRouter = Router();

leaderboardRouter.post("/", async (req, res) => {
  const user = req.user as PgUser;
  if (!user) return res.status(401).json({ message: "Unauthorized" });
  const results = await wordService.getOrderedWordsByScore();
  return res.json(results);
});

export { leaderboardRouter };

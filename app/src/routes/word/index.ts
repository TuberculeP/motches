import { Router } from "express";
import { dailyWordRouter } from "./dailyWord.route";
import { leaderboardRouter } from "./leaderboard.route";
import { eventsRouter } from "./events.route";

const wordRouter = Router();

wordRouter.use("/daily", dailyWordRouter);
wordRouter.use("/leaderboard", leaderboardRouter);
wordRouter.use("/events", eventsRouter);

export { wordRouter };

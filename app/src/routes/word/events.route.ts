import { pg, pubSub } from "@/config/db.config";
import { Router } from "express";
import { Notification } from "pg";
import { PgUser } from "shared/types";

const eventsRouter = Router();

eventsRouter.get("/", (req, res): void | any => {
  const user = req.user as PgUser;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  console.log(user);
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const onNotification = (msg: Notification) => {
    console.log("notification", msg);
    res.write(`data: ${msg.payload}\n\n`);
  };

  pg.on("notification", onNotification);

  pubSub.listen("leaderboard_updated");

  req.on("close", () => {
    pg.removeListener("notification", onNotification);
    res.end();
  });
});

export { eventsRouter };

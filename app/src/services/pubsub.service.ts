import { pubSub } from "@/config/db.config";

async function notifyUpdateLeaderboard() {
  pubSub.notify("leaderboard_updated", {});
}

export { notifyUpdateLeaderboard };

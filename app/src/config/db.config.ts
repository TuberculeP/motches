import { Client } from "pg";
import { PgPubSub } from "@imqueue/pg-pubsub";

const { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } = process.env;

if (!DB_USER || !DB_HOST || !DB_NAME || !DB_PASSWORD || !DB_PORT) {
  throw new Error("Please provide all the required environment variables");
}

const pg = new Client({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: +DB_PORT,
});

const pubSub = new PgPubSub({ pgClient: pg, singleListener: false });

pg.connect((err) => {
  if (err) {
    console.error("Connection error", err.stack);
  } else {
    console.log("Connected to the database");
  }
});

export { pg, pubSub };

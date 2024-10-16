import { Profile } from "passport";
import { pg } from "@/config/db.config";
import type { PgUser } from "shared/types";

async function findOrCreateUser(profile: Profile): Promise<PgUser> {
  // get user from db
  console.log(
    "\x1b[41m%s\x1b[0m",
    "app/src/services/user.service.ts:7 profile",
    profile
  );
  const { rows } = await pg.query<PgUser>(
    `SELECT * FROM users WHERE google_id = $1`,
    [profile.id]
  );
  if (rows.length) {
    return rows[0];
  }
  // else create one from profile with display name as pseudo
  const { id, displayName, photos } = profile;
  const { rows: newRows } = await pg.query<PgUser>(
    `INSERT INTO users (google_id, pseudo, google_photo_url) VALUES ($1, $2, $3) RETURNING *`,
    [id, displayName, photos?.[0].value || null]
  );
  return newRows[0];
}

async function findById(id: string): Promise<PgUser> {
  const { rows } = await pg.query<PgUser>(`SELECT * FROM users WHERE id = $1`, [
    id,
  ]);
  return rows[0];
}

export default {
  findOrCreateUser,
  findById,
};

import { pg } from "@/config/db.config";
import type {
  PgUser,
  PgVote,
  WordWithScore,
  WordWithVotes,
} from "shared/types";
import { getOrderedWordsQuery } from "./word.queries";

async function getVotesByUserId(userId: PgUser["id"]): Promise<PgVote[]> {
  const { rows } = await pg.query<PgVote>(
    "SELECT * FROM votes WHERE user_id = $1",
    [userId]
  );
  return rows;
}

async function getOrderedWordsByVotes(
  order: "ASC" | "DESC"
): Promise<WordWithVotes[]> {
  const query = getOrderedWordsQuery("total_votes", "ASC");
  const { rows } = await pg.query<WordWithVotes>(query);
  return rows;
}

async function getOrderedWordsByScore(): Promise<WordWithScore[]> {
  const query = getOrderedWordsQuery("total_score", "DESC");
  const { rows } = await pg.query<WordWithScore>(query);
  return rows;
}

async function getUserDailyWord(user_id: PgUser["id"]): Promise<string> {
  // en priorité les mots qui ont été proposé mais avec peu de votes
  // si tous les mots déjà voté ont été voté par l'utilisateur, on cherche un mot sur https://trouve-mot.fr/api/random

  const words = await getOrderedWordsByVotes("ASC");
  const votes = await getVotesByUserId(user_id);
  let selectedWord = null;

  for (const word of words) {
    if (votes.some((vote) => vote.word === word.word)) {
      continue;
    }
    selectedWord = word.word;
    break;
  }

  if (!selectedWord) {
    const response = await fetch("https://trouve-mot.fr/api/random");
    const word = await response.json();
    selectedWord = word[0]?.name;
  }

  console.log("selectedWord", selectedWord);

  return selectedWord;
}

async function addVote(
  userId: PgUser["id"],
  word: string,
  note: number
): Promise<void> {
  await pg.query(
    `INSERT INTO votes (user_id, word, note) VALUES ($1, $2, $3)`,
    [userId, word, note]
  );
}

export default {
  getVotesByUserId,
  getOrderedWordsByVotes,
  getOrderedWordsByScore,
  addVote,
  getUserDailyWord,
};

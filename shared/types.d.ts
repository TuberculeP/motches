export interface PgUser {
  id: string;
  google_id: string;
  pseudo: string;
  google_photo_url?: string;
}

export interface PgVote {
  user_id: string;
  word: string;
  note: number;
}

export interface WordWithVotes {
  word: string;
  total_votes: number;
}

export interface WordWithScore {
  word: string;
  total_score: number;
}

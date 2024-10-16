export function getOrderedWordsQuery(
  order_by: "total_score" | "total_votes",
  order: "ASC" | "DESC"
) {
  return `SELECT
  word,
  SUM(note) as total_score,
  COUNT(*) as total_votes
  FROM
  votes
  GROUP BY
  word
  ORDER BY
  ${order_by}
  ${order}`;
}

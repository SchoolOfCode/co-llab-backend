import { query } from "../db/connection.js";

// post to users table with user_id and event_id

export async function addUser(user_id, event_attend) {
  const result = await query(
    `INSERT INTO users(user_id, event_attend) VALUES ($1, $2) RETURNING *;`,
    [user_id, event_attend]
  );
  return result.rows;
}

//
export async function getEventsByUserId(user_id) {
  const result = await query(
    `SELECT event_attend
 FROM users
 RIGHT JOIN events 
 on users.event_attend = events.event_id
 WHERE events.user_id = $1;`,
    [user_id]
  );
  return result.rows;
}

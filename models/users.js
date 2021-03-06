import { query } from "../db/connection.js";

// post to users table with auth_id and event_id

export async function addUserToEvent(auth_id, event_attend) {
  const result = await query(
    `INSERT INTO users(auth_id, event_attend) VALUES ($1, $2) RETURNING *;`,
    [auth_id, event_attend]
  );
  return result.rows;
}

//
export async function getEventsByUserId(auth_id) {
  console.log(auth_id);
  const result = await query(
    `SELECT *
 FROM events
 LEFT JOIN users 
 on users.event_attend = events.event_id
 WHERE users.auth_id = $1 AND events.event_date > now()::date 
 ORDER BY event_date ASC;`,
    [auth_id]
  );
  return result.rows;
}

// Remove a user from an event (delete)
// Need the event id and user id

export async function removeUserFromEvent(auth_id, event_id) {
  const result = await query(
    `DELETE FROM users 
    WHERE auth_id = $1 AND event_attend = $2;
    `,
    [auth_id, event_id]
  );
}

export async function getAllUsers() {
  const result = await query(`SELECT * FROM users;`);
  return result.rows;
}

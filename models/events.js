import { query } from "../db/connection.js";

// be able to pass data from front end to the database
// ensure we are returning data

export async function addEvent(
  event_name,
  time,
  address,
  type,
  tags,
  // tags is an array - be aware of variables used for SQL injection
  user_id
) {
  const result = await query(
    `INSERT INTO events(event_name, 
time,  
address, 
type, 
tags,
user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *; `,
    [event_name, time, address, type, tags, user_id]
  );
  return result.rows;
}

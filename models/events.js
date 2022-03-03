import { query } from "../db/connection.js";

// be able to get all data from this current date onwards - display on the Events page
export async function getEventsfromToday() {
  const result = await query(
    `SELECT * FROM events WHERE event_date > now()::date ORDER BY event_date ASC;`
  );
  return result.rows;
}
export async function getAllEvents() {
  const result = await query(`SELECT * FROM events`);
  return result.rows;
}

// be able to pass data from front end to the database
// ensure we are returning data
// export async function addEvent(
//   event_name,
//   time,
//   address,
//   type,
//   tags,
//   // tags is an array - be aware of variables used for SQL injection
//   auth_id
// ) {
//   const result = await query(
//     `INSERT INTO events(event_name,
// time,
// address,
// type,
// tags,
// auth_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *; `,
//     [event_name, time, address, type, tags, auth_id]
//   );
//   return result.rows;
// }

export async function addEvent(
  event_desc,
  event_date,
  event_start_time,
  event_end_time,
  event_location,
  event_type,
  event_tags,
  auth_id
) {
  const result = await query(
    `INSERT INTO events(
      event_desc,
      event_date,
      event_start_time,
      event_end_time,
      event_location,
      event_type,
      event_tags,
      auth_id
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *; `,
    [
      event_desc,
      event_date,
      event_start_time,
      event_end_time,
      event_location,
      event_type,
      event_tags,
      auth_id,
    ]
  );
  return result.rows;
}

export async function getAttendees() {
  const result = await query(
    `SELECT events.*, 
      COUNT(event_attend)
      FROM users 
      RIGHT JOIN events 
      on users.event_attend = events.event_id
      WHERE events.event_date > now()::date
      GROUP BY events.event_id 
      ORDER BY events.event_date ASC
      ;`
  );
  return result.rows;
}

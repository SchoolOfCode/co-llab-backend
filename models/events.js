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
  auth_id,
  first_name,
  last_name
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
      auth_id,
      first_name,
      last_name
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *; `,
    [
      event_desc,
      event_date,
      event_start_time,
      event_end_time,
      event_location,
      event_type,
      event_tags,
      auth_id,
      first_name,
      last_name,
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

export async function getEventsCreatedByUser(auth_id) {
  const result = await query(`SELECT * FROM events WHERE auth_id = $1`, [
    auth_id,
  ]);
  return result.rows;
}
export async function getEventsNotAttendedByUser(auth_id) {
  const result = await query(
    `with v1 AS (SELECT event_attend 
    FROM users 
    WHERE auth_id = $1)
    SELECT * FROM events 
    WHERE event_id NOT IN (select event_attend from v1) AND events.event_date > now()::date
    ORDER BY event_date ASC;`,
    [auth_id]
  );
  return result.rows;
}

// events.event_date > now()::date
// get all events (event_attend) that the user is currently attending from users table

// SELECT event_attend FROM users WHERE user.auth_id = $1

// go the events table and remove all (event_ids that match event_attend)

// SELECT * FROM events WHERE events.event_id <> event_attend (from above)

// return all events from events table

export async function deleteEvent(event_id, auth_id) {
  const result = await query(
    `DELETE FROM events WHERE event_id = $1, auth_id = $2;`,
    [event_id, auth_id]
  );
}

export async function updateEvent(
  event_id,
  event_desc,
  event_date,
  event_start_time,
  event_end_time,
  event_location,
  event_type,
  event_tags,
  first_name,
  last_name
) {
  const result = await query(
    `UPDATE events SET
      event_desc = $1,
      event_date = $2,
      event_start_time = $3,
      event_end_time = $4,
      event_location = $5,
      event_type= $6,
      event_tags= $7,
      first_name = $8,
      last_name = $9
      WHERE event_id = $10 RETURNING *; `,
    [
      event_desc,
      event_date,
      event_start_time,
      event_end_time,
      event_location,
      event_type,
      event_tags,
      first_name,
      last_name,
      event_id,
    ]
  );
  return result.rows;
}

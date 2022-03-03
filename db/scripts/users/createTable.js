// import db from "../../connection.js";

// const response = await db.query(
//   `CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username TEXT, first_name TEXT, last_name TEXT);`
// );

// console.log(response);

// db.end();

import { query } from "../../connection.js";

const sqlString = `CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY, 
  auth_id VARCHAR, 
  event_attend INTEGER,
  UNIQUE (auth_id, event_attend)
  );`;

export async function createUsersTable() {
  const res = await query(sqlString);
  console.log(res);
}

createUsersTable();

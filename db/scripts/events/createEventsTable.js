// import query from connection.js
//create table with list of events
//create sql string to create events table with
//row 1 column names/headers and data type
//row 2 data type
//create export async funtion createEventsTable
//call function
//add script in package.json
//note postgres requires single quote '' not ""

import { query } from "../../connection.js";

const sqlString = `CREATE TABLE IF NOT EXISTS events (event_id SERIAL PRIMARY KEY,event_name TEXT, time TIMESTAMP, location TEXT NOT NULL DEFAULT 'Online', address VARCHAR, type TEXT, tags TEXT[], user_id VARCHAR);`;

export async function createEventsTable() {
  const res = await query(sqlString);
  console.log(res);
}
createEventsTable();

import { query } from "../../connection.js";

const sqlString = `DROP TABLE events;`

export async function deleteEventsTable() {
    const res = await query(sqlString);
    console.log(res);
}

deleteEventsTable();

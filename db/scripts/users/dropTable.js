import { query } from "../../connection.js";

const sqlString = `DROP TABLE users;`

export async function deleteUsersTable() {
    const res = await query(sqlString);
    console.log(res);
}

deleteUsersTable();

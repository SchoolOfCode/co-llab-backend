import query from "../../connection.js";
const sqlstring = `CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username TEXT);`;
async function createUsersTable() {
	const response = await query(sqlstring);
	console.log("users table created", response);
}
createUsersTable();

import query from "../../connection.js";

async function populateUsersTable() {
	const response = await query(`INSERT INTO users (username) VALUES ($1);`, [
		"iseecode",
	]);
	console.log("users table populated", response);
}
populateUsersTable();

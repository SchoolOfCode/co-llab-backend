import express from "express";
import { getAllUsers } from "../models/users.js";

const router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
	const data = await getAllUsers();

	res.json({
		success: true,
		payload: data,
	});
});

export default router;

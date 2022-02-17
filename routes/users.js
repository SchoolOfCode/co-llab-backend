import express from "express";
import { getAllUsers } from "../models/users.js";

const router = express.Router();

/* GET users listing. */
// router.get("/", async function (req, res, next) {
//   const users = await getAllUsers();

//   res.json({
//     success: true,
//     payload: users
//   });
// });

router.get("/users", function (req, res, next) {
	res.json({
		success: true,
		msg: "Hello hugs for bugs",
	});
	next();
});

export default router;

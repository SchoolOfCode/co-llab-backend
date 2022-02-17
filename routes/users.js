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

router.get("/", function (req, res) {
	res.send("Hello HUGS FOR BUGS!");
});

export default router;

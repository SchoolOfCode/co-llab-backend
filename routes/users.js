import express from "express";
import { addUser, getEventsByUserId } from "../models/users.js";

const usersRouter = express.Router();
// get events according to user id
usersRouter.get("/", async (req, res) => {
  const { user_id } = req.body;
  try {
    const data = await getEventsByUserId(user_id);
    res.json({
      sucess: true,
      payload: data,
    });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
});

// add user against event chosen to attend
usersRouter.post("/", async (req, res) => {
  const { user_id, event_attend } = req.body;
  try {
    const data = await addUser(user_id, event_attend);
    res.json({
      sucess: true,
      payload: data,
    });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
});
// add a delete for user if they chose to not attend
export default usersRouter;

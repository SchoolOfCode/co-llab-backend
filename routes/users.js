import express from "express";
import {
  addUserToEvent,
  getEventsByUserId,
  removeUserFromEvent,
  getAllUsers,
} from "../models/users.js";

const usersRouter = express.Router();
// get events according to user id
usersRouter.post("/profile", async (req, res) => {
  const { auth_id } = req.body;
  try {
    const data = await getEventsByUserId(auth_id);
    res.json({
      success: true,
      payload: data,
    });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
});

usersRouter.get("/", async (req, res) => {
  const data = await getAllUsers();
  res.json({
    success: true,
    payload: data,
  });
});

// add user against event chosen to attend
usersRouter.post("/", async (req, res) => {
  const { auth_id, event_attend } = req.body;
  try {
    const data = await addUserToEvent(auth_id, event_attend);
    res.json({
      success: true,
      payload: data,
    });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
});

// add a delete for user if they chose to not attend
export default usersRouter;

// remove a user from an event with event_attend and user id
usersRouter.delete("/", async (req, res) => {
  const { auth_id, event_attend } = req.body;
  try {
    const data = await removeUserFromEvent(auth_id, event_attend);
    res.json({
      success: true,
      message: "User has been removed from the event",
    });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
});

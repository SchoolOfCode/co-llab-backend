import express from "express";
import { addUser, getEventsByUserId, removeUserFromEvent, getAllEvents } from "../models/users.js";

const usersRouter = express.Router();
// get events according to user id
// usersRouter.get("/", async (req, res) => {
//   const { auth_id } = req.body;
//   try {
//     const data = await getEventsByUserId(auth_id);
//     res.json({
//       sucess: true,
//       payload: data,
//     });
//   } catch (error) {
//     return res.status(400).json({ error: error.toString() });
//   }
// });

usersRouter.get("/", async (req, res) => {
  const data = await getAllEvents();
  res.json({
    sucess: true,
    payload: data,
  });
})

// add user against event chosen to attend
usersRouter.post("/", async (req, res) => {
  const { auth_id, event_attend } = req.body;
  try {
    const data = await addUser(auth_id, event_attend);
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

// remove a user from an event with event_attend and user id 
usersRouter.delete("/", async (req, res) => {
  const { auth_id, event_attend } = req.body;
  try {
    const data = await removeUserFromEvent(auth_id, event_attend);
    res.json({
      sucess: true,
      message: "User has been removed from the event"
    });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
})
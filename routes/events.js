import express from "express";
import {
  addEvent,
  getEventsfromToday,
  getAllEvents,
  getAttendees,
  getEventsByUserId,
} from "../models/events.js";

const eventsRouter = express.Router();

eventsRouter.get("/", async (req, res) => {
  try {
    const data = await getAttendees();
    res.json({
      success: true,
      payload: data,
    });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
});

eventsRouter.get("/all", async (req, res) => {
  try {
    const data = await getAllEvents();
    res.json({
      success: true,
      payload: data,
    });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
});

eventsRouter.post("/user", async (req, res) => {
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

// eventsRouter.get("/attendees", async (req, res) => {
//   try {
//     const data = await getAttendees();
//     res.json({
//       success: true,
//       payload: data,
//     });
//   } catch (error) {
//     return res.status(400).json({ error: error.toString() });
//   }
// });
// using addEvent function to add data to DB
// calling addEvent in try catch to catch any error messages and respond with those to front end
// else if successful, responds with data
eventsRouter.post("/", async (req, res) => {
  console.log(req.body);
  const {
    event_desc,
    event_date,
    event_start_time,
    event_end_time,
    event_location,
    event_type,
    event_tags,
    auth_id,
    first_name,
    last_name,
  } = req.body;
  try {
    const data = await addEvent(
      event_desc,
      event_date,
      event_start_time,
      event_end_time,
      event_location,
      event_type,
      event_tags,
      auth_id,
      first_name,
      last_name
    );
    return res.json({
      success: true,
      payload: data,
    });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
});

export default eventsRouter;

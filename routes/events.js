import express from "express";
import {
  addEvent,
  getEventsfromToday,
  getAllEvents,
  getAttendees,
  getEventsCreatedByUser,
  updateEvent,
  deleteEvent,
  getEventsNotAttendedByUser,
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

eventsRouter.post("/notAttending", async (req, res) => {
  const { auth_id } = req.body;
  console.log(req.body);
  try {
    const data = await getEventsNotAttendedByUser(auth_id);
    res.json({
      success: true,
      payload: data,
    });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
});

eventsRouter.post("/created", async (req, res) => {
  const { auth_id } = req.body;
  try {
    const data = await getEventsCreatedByUser(auth_id);
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

eventsRouter.delete("/", async (req, res) => {
  const { event_id, auth_id } = req.body;
  try {
    const data = await deleteEvent(event_id, auth_id);
    res.json({
      success: true,
      payload: data,
    });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
});

eventsRouter.patch("/", async (req, res) => {
  const {
    event_id,
    event_desc,
    event_date,
    event_start_time,
    event_end_time,
    event_location,
    event_type,
    event_tags,
    first_name,
    last_name,
  } = req.body;
  try {
    const data = await updateEvent(
      event_id,
      event_desc,
      event_date,
      event_start_time,
      event_end_time,
      event_location,
      event_type,
      event_tags,
      first_name,
      last_name
    );
    res.json({
      success: true,
      payload: data,
    });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
});

export default eventsRouter;

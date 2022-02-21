import request from "supertest";
import eventsRouter from "./events";
import { getEventsfromToday, addEvent } from "../models/events";

// Test GET: we want to ensure a payload is being sent within the response object if successful, otherwise it should catch an error and send it 

// Test POST: we want to successfully retreive event details from the request object (body) and add that data to our events table, then sending back that newly added event to the user in the response object, if it fails then it should catch the error and send it 

describe('GET /events', function () {
    it("should return a payload with an array of objects in the response body", async () => {
        // ARRANGE
        const actual = await getEventsfromToday();
        request(eventsRouter)
            .get('/')
            .expect(200)
            .expect((res) => {
                // ACT
                const expected = {
                    success: true,
                    payload: expect.arrayContaining([{
                        event_id: expect.any(String),
                        event_name: expect.any(String),
                        time: expect.any(String),
                        location: expect.any(String),
                        address: expect.any(String),
                        type: expect.any(String),
                        tags: expect.any(Array),
                        auth_id: expect.any(String)
                    }])
                }
                // ASSERT
                expect(actual).toStrictEqual(expected);
            })
    })
});

describe('POST /events', function () {
    it("should return a payload with an array of objects in the response body", async () => {
        // arrange 
        const actual = await addEvent();
        request(eventsRouter)
            .get('/')
            .expect(200)
            .expect((res) => {
                // ACT 
                const expected = {
                    success: true,
                    payload: expect.arrayContaining([{
                        event_id: expect.any(String),
                        event_name: expect.any(String),
                        time: expect.any(String),
                        location: expect.any(String),
                        address: expect.any(String),
                        type: expect.any(String),
                        tags: expect.any(Array),
                        auth_id: expect.any(String)
                    }])
                }
            })
    })
})
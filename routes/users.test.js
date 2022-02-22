import request from "supertest";
import usersRouter from "./users.js";
import {
	getAllUsers,
	addUserToEvent,
	removeUserFromEvent,
} from "../models/users";

describe("testing our HTTP requests at /users", function () {
	// Testing that the response object contains an array of objects (users)
	it("should return an array of objects containing all users when listening to a GET request", async () => {
		// ACT
		const actual = await getAllUsers();
		request(usersRouter)
			.get("/")
			.expect(200)
			.expect((res) => {
				// ARRANGE
				const expected = {
					success: true,
					payload: expect.arrayContaining([
						{
							user_id: expect.any(Number),
							auth_id: expect.any(String),
							event_attend: expect.any(Number),
						},
					]),
				};
				// ASSERT
				expect(actual).toStrictEqual(expected);
			});
	});
	it("should return a object containing the user and the event they are attending when listening to a POST request", async () => {
		// ACT
		const actual = await addUserToEvent();
		request(usersRouter)
			.get("/")
			.expect(200)
			.expect((res) => {
				// ARRANGE
				const expected = {
					success: true,
					payload: expect.arrayContaining([
						{
							auth_id: expect.any(String),
							event_attend: expect.any(Number),
						},
					]),
				};
				// ASSERT
				expect(actual).toStrictEqual(expected);
			});
	});
	it("should return a object containing the user and the event they are attending when listening to a POST request", async () => {
		// ACT
		const actual = await removeUserFromEvent();
		request(usersRouter)
			.get("/")
			.expect(200)
			.expect((res) => {
				// ARRANGE
				const expected = {
					success: true,
					message: expect.toEqual("User has been removed from the event"),
				};
				// ASSERT
				expect(actual).toStrictEqual(expected);
			});
	});
});

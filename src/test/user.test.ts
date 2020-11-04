import { expect } from "chai";
import { app } from "../server";
import { agent as request } from "supertest";
import { User } from "../api/models/userModel";
import {
  mockUser,
  mockUserUpdated,
  mockUserUpdatedWithID
} from "./fixtures/userMocks";

beforeEach(async () => {
  // delete everything in the user collection
  await User.deleteMany({});
});

afterEach(async () => {
  // delete everything in the user collection
  await User.deleteMany({});
});

const postUser = async () => {
  // POST a user
  const postUserResponse = await request(app)
    .post("/user")
    .send(mockUser);
  return postUserResponse.body;
};

describe("User Tests: ", () => {
  it("Should POST to create a new user", async () => {
    const response = await request(app)
      .post("/user")
      .send(mockUser);
    expect(response.status).to.equal(200);
    expect(response.body).not.to.be.empty;
    expect(response.body).to.be.an("object");
  });

  it("Should GET all /user", async () => {
    // POST a user to get
    await request(app)
      .post("/user")
      .send(mockUser);

    const response = await request(app).get("/user");
    expect(response.status).to.equal(200);
    expect(response.body).not.to.be.empty;
    expect(response.body).to.be.an("array");
  });

  it("Should GET user by /user/:userID", async () => {
    // POST a user to get
    const { _id: mockUserID } = await postUser();

    const response = await request(app).get("/user/" + mockUserID);
    expect(response.status).to.equal(200);
    expect(response.body).not.to.be.empty;
    expect(response.body).to.be.an("object");
  });

  it("Should UPDATE a user by id /user/:userID", async () => {
    // POST a user to get
    const { _id: mockUserID } = await postUser();

    const response = await request(app)
      .put("/user/" + mockUserID)
      .send(mockUserUpdated);
    expect(response.status).to.equal(200);
    expect(response.body).not.to.be.empty;
    expect(response.body).to.be.an("object");
    // check to see if the userName has been accurately updated
    expect(response.body.fullName).to.equal(mockUserUpdated.fullName);
  });

  it("Should throw a 403 error when trying to UPDATE user._id", async () => {
    // POST a user to get
    const { _id: mockUserID } = await postUser();

    mockUserUpdatedWithID._id = mockUserID;
    const response = await request(app)
      .put("/user/" + mockUserID)
      .send(mockUserUpdatedWithID);
    expect(response.status).to.equal(403);
    expect(response.error).not.to.be.empty;
    expect(response).to.be.an("object");
  });

  it("Should DELETE a user by id /user/:userID", async () => {
    // POST a user to get
    const { _id: mockUserID } = await postUser();

    const response = await request(app).delete("/user/" + mockUserID);
    expect(response.status).to.equal(200);
    expect(response.body).not.to.be.empty;
    expect(response.body).to.be.an("object");
  });

  // NOTE: Still need to test the authentication stuff: signup, login, resetPassword, me
});

import { expect } from "chai";
import { app } from "../server";
import { agent as request } from "supertest";
import { Feedback } from "../api/models/feedbackModel";
import { mockFeedback } from "./fixtures/feedbackMocks";

// clear out the db before all the test and after tests are complete
beforeEach(async () => {
  // delete everything in feedback collection
  await Feedback.deleteMany({});
});

afterEach(async () => {
  // delete everything in feedback collection
  await Feedback.deleteMany({});
});

describe("Feedback Tests: ", () => {
  it("should POST /feedback and create a new feedback obj", async () => {
    const response = await request(app)
      .post("/feedback")
      .send(mockFeedback);
    expect(response.status).to.equal(200);
    expect(response.body).not.to.be.empty;
    expect(response.body).to.be.an("object");
  });

  it("should GET ALL /feedback objects", async () => {
    // POST a feedback to get
    await request(app)
      .post("/feedback")
      .send(mockFeedback);

    const response = await request(app).get("/feedback");
    expect(response.status).to.equal(200);
    expect(response.body).not.to.be.empty;
    expect(response.body).to.be.an("array");
  });
});

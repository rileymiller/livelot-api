import { expect } from "chai";
import { app } from "../server";
import { agent as request } from "supertest";
import { Camera } from "../api/models/cameraModel";
import { mockCamera } from "./fixtures/cameraMocks";

beforeEach(async () => {
  // delete everything in camera collection
  await Camera.deleteMany({});
});

afterEach(async () => {
  // delete everything in camera collection
  await Camera.deleteMany({});
});

const postCamera = async () => {
  // POST a camera
  const postCameraResponse = await request(app)
    .post("/camera")
    .send(mockCamera);
  return postCameraResponse.body;
};

describe("Camera Tests: ", () => {
  it("should POST /camera creating a new camera object", async () => {
    const response = await request(app)
      .post("/camera")
      .send(mockCamera);
    expect(response.status).to.equal(200);
    expect(response.body).not.to.be.empty;
    expect(response.body).to.be.an("object");
  });

  it("should GET ALL /cameras objects", async () => {
    // POST a camera to get
    await request(app)
      .post("/camera")
      .send(mockCamera);

    const response = await request(app).get("/cameras");
    expect(response.status).to.equal(200);
    expect(response.body).not.to.be.empty;
    expect(response.body).to.be.an("array");
  });

  it("should GET a camera by id /camera/:cameraID", async () => {
    // POST a camera to get
    const { _id: mockCameraID } = await postCamera();

    const response = await request(app).get("/camera/" + mockCameraID);
    expect(response.status).to.equal(200);
    expect(response.body).not.to.be.empty;
    expect(response.body).to.be.an("object");
  });

  it("should DELETE ALL /cameras from the db", async () => {
    // POST a camera to get
    await request(app)
      .post("/camera")
      .send(mockCamera);

    const response = await request(app).delete("/cameras");
    expect(response.status).to.equal(200);
    expect(response.body).not.to.be.empty;
  });
});

import { expect } from "chai";
import { app } from "../server";
import { agent as request } from "supertest";
import { Lot } from "../api/models/lotModel";
import { LotLog } from "../api/models/lotLogModel";
import {
  mockLot,
  mockLotUpdated,
  mockLotUpdatedWithId
} from "./fixtures/lotAndLotLogMocks";

beforeEach(async () => {
  // delete everything in the lot and lotLog collection
  await Lot.deleteMany({});
  await LotLog.deleteMany({});
});

afterEach(async () => {
  // delete everything in the lot and lotLog collection
  await Lot.deleteMany({});
  await LotLog.deleteMany({});
});

const postLot = async () => {
  // POST a lot
  const postLotResponse = await request(app)
    .post("/lot")
    .send(mockLot);
  return postLotResponse.body;
};

describe("Lot Tests: ", () => {
  it("Should POST to /lot and create a new lot", async () => {
    const response = await request(app)
      .post("/lot")
      .send(mockLot);
    expect(response.status).to.equal(200);
    expect(response.body).not.to.be.empty;
    expect(response.body).to.be.an("object");
  });

  it("Should GET ALL /lot", async () => {
    // POST a lot to get
    await request(app)
      .post("/lot")
      .send(mockLot);

    const response = await request(app).get("/lot");
    expect(response.status).to.equal(200);
    expect(response.body).not.to.be.empty;
    expect(response.body).to.be.an("array");
  });

  it("Should GET a lot by id /lot/:id", async () => {
    // POST a lot to get
    const { _id: mockLotId } = await postLot();

    const response = await request(app).get("/lot/" + mockLotId);
    expect(response.status).to.equal(200);
    expect(response.body).not.to.be.empty;
    expect(response.body).to.be.an("object");
  });

  it("Should UPDATE a lot by id /lot/:id", async () => {
    // POST a lot to get
    const { _id: mockLotId } = await postLot();

    const response = await request(app)
      .put("/lot/" + mockLotId)
      .send(mockLotUpdated);
    expect(response.status).to.equal(200);
    expect(response.body).not.to.be.empty;
    expect(response.body).to.be.an("object");
    // check to see if the lotName has been accurately updated
    expect(response.body.lotName).to.equal(mockLotUpdated.lotName);
  });

  it("Should throw a 403 error when trying to UPDATE lot._id", async () => {
    // POST a lot to get
    const { _id: mockLotId } = await postLot();

    mockLotUpdatedWithId._id = mockLotId;
    const response = await request(app)
      .put("/lot/" + mockLotId)
      .send(mockLotUpdatedWithId);
    expect(response.status).to.equal(403);
    expect(response.error).not.to.be.empty;
    expect(response).to.be.an("object");
  });

  it("Should increment the numSpots count by one /lot/:lotId/carOut", async () => {
    // POST a lot to get
    const newMockLot = await postLot();

    const response = await request(app).put(
      "/lot/" + newMockLot._id + "/carOut"
    );
    expect(response.status).to.equal(200);
    expect(response.body).not.to.be.empty;
    expect(response.body).to.be.an("object");
    // check to see if numSpots is incremented
    expect(response.body.numSpots).to.equal(newMockLot.numSpots - 1);

    // reset the mockLot object to have the new number of spots in order for the carIn test to work.
    mockLot.numSpots = response.body.numSpots;
  });

  it("Should decrement the numSpots count by one /lot/:lotId/carIn", async () => {
    // POST a lot to get
    const newMockLot = await postLot();

    const response = await request(app).put(
      "/lot/" + newMockLot._id + "/carIn"
    );
    expect(response.status).to.equal(200);
    expect(response.body).not.to.be.empty;
    expect(response.body).to.be.an("object");
    // check to see if numSpots is incremented
    expect(response.body.numSpots).to.equal(newMockLot.numSpots + 1);
  });
});

describe("LotLog tests: ", () => {
  it("Should GET ALL /lotLog", async () => {
    // POST a lot to get
    const { _id: mockLotId } = await postLot();
    // Add a log
    await request(app).put("/lot/" + mockLotId + "/carIn");

    const response = await request(app).get("/log");
    expect(response.status).to.equal(200);
    expect(response.body).not.to.be.empty;
    expect(response.body).to.be.an("array");
  });

  it("Should GET logs for a lot by lotId /log/:lotId", async () => {
    // POST a lot to get
    const { _id: mockLotId } = await postLot();
    // Add a log
    await request(app).put("/lot/" + mockLotId + "/carIn");

    const response = await request(app).get("/log/" + mockLotId);
    expect(response.status).to.equal(200);
    expect(response.body).not.to.be.empty;
    expect(response.body).to.be.an("array");
  });
});

describe("Lot and LotLog Tests: deleting lots and lotLogs", () => {
  it("Should DELETE a lot by id /lot/:id", async () => {
    // POST a lot to get
    const { _id: mockLotId } = await postLot();

    const response = await request(app).delete("/lot/" + mockLotId);
    expect(response.status).to.equal(200);
    expect(response.body).not.to.be.empty;
    expect(response.body).to.be.an("object");
  });

  it("Should DELETE all logs", async () => {
    const response = await request(app).delete("/log");
    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal("Successfully deleted all lots");
    expect(response.body).to.be.an("object");
  });
});

import { expect } from 'chai';
import { app } from '../server';
import { agent as request } from 'supertest';
import { Lot } from '../api/models/lotModel'
import { LotLog } from '../api/models/lotLogModel'

// Tests for both lot and lotLog ctrl
// Combined because the lotLog tests will use a lot obj

let mockLot = {
    lotName: 'test lot',
    numSpots: 150,
    totalSpots: 200,
    lotAddress: '1234 SW test street',
    lotStatus: true,
    lastUpdated: "2020-06-07T21:34:43.833Z"
}

const mockLotUpdated = {
    lotName: 'test lot updated',
    numSpots: 150,
    totalSpots: 200,
    lotAddress: '1234 SW test street',
    lotStatus: true,
    lastUpdated: "2020-06-07T21:34:43.833Z"
}

let mockLotUpdatedWithId = {
    _id: '',
    lotName: 'test lot updated',
    numSpots: 150,
    totalSpots: 200,
    lotAddress: '1234 SW test street',
    lotStatus: true,
    lastUpdated: "2020-06-07T21:34:43.833Z"
}

let mockLotId = '';

let lotLog = {};
let lotLogLotId = '';

// clear out the db before all the test and after tests are complete
before(async () => {
    // delete everything in the lot and lotLog collection
    await Lot.deleteMany({});
    await LotLog.deleteMany({});
});

after(async () => {
    // delete everything in the lot and lotLog collection
    await Lot.deleteMany({});
    await LotLog.deleteMany({});
});

describe('Lot Tests: ', () => {
    it('Should POST to /lot and create a new lot', async () => {
        const response = await request(app).post('/lot').send(mockLot);
        expect(response.status).to.equal(200);
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("object");

        // set lotID variable equal to the new lotID
        mockLotId = response.body._id;
    });
    
    it('Should GET ALL /lot', async () => {
        const response = await request(app).get('/lot');
        expect(response.status).to.equal(200);
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("array");
    });

    it('Should GET a lot by id /lot/:id', async () => {
        const response = await request(app).get('/lot/' + mockLotId);
        expect(response.status).to.equal(200);
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("object");
    });

    it('Should UPDATE a lot by id /lot/:id', async () => {
        const response = await request(app).put('/lot/' + mockLotId).send(mockLotUpdated);
        expect(response.status).to.equal(200);
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("object");
        // check to see if the lotName has been accurately updated
        expect(response.body.lotName).to.equal(mockLotUpdated.lotName);
    });

    it('Should throw a 403 error when trying to UPDATE lot._id', async () => {
        mockLotUpdatedWithId._id = mockLotId;
        const response = await request(app).put('/lot/' + mockLotId).send(mockLotUpdatedWithId);
        expect(response.status).to.equal(403);
        expect(response.error).not.to.be.empty;
        expect(response).to.be.an("object");
    });

    it('Should increment the numSpots count by one /lot/:lotId/carOut', async () => {
        const response = await request(app).put('/lot/' + mockLotId + '/carOut');
        expect(response.status).to.equal(200);
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("object");
        // check to see if numSpots is incremented
        expect(response.body.numSpots).to.equal(mockLot.numSpots - 1);

        // reset the mockLot object to have the new number of spots in order for the carIn test to work.
        mockLot.numSpots = response.body.numSpots;
    });

    it('Should decrement the numSpots count by one /lot/:lotId/carIn', async () => {
        const response = await request(app).put('/lot/' + mockLotId + '/carIn');
        expect(response.status).to.equal(200);
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("object");
        // check to see if numSpots is incremented
        expect(response.body.numSpots).to.equal(mockLot.numSpots + 1);
    });
});

describe('LotLog tests: ', () => {
    it('Should GET ALL /lotLog', async () => {
        const response = await request(app).get('/log');
        expect(response.status).to.equal(200);
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("array");

        // save one log for the next lotLog tests
        lotLog = response.body[0];
        lotLogLotId = response.body[0].lotId;
    });

    it('Should GET logs for a lot by lotId /log/:lotId', async () => {
        const response = await request(app).get('/log/' + lotLogLotId);
        expect(response.status).to.equal(200);
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("array");
    });
});

describe('Lot and LotLog Tests: deleting lots and lotLogs', () => {
    it('Should DELETE a lot by id /lot/:id', async () => {
        const response = await request(app).delete('/lot/' + mockLotId);
        expect(response.status).to.equal(200);
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("object");
    });

    it('Should DELETE all logs', async () => {
        const response = await request(app).delete('/log');
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal("Successfully deleted all lots");
        expect(response.body).to.be.an("object");
    });
});
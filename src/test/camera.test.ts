import { expect } from 'chai';
import { app } from '../server';
import { agent as request } from 'supertest';
import { Camera } from '../api/models/cameraModel'

let mockCamera = {
    lotName: "test lot",
    cameraID: '12345',
    ipv4: "some long ipv4",
    ipv6: "some long ipv6",
    online: true,
}

let mockID = 0;

// clear out the db before all the test and after tests are complete
before(async () => {
    // delete everything in feedback collection
    await Camera.deleteMany({});
});

after(async () => {
    // delete everything in feedback collection
    await Camera.deleteMany({});
});

describe("Camera Tests: ", () => {
    it('should POST /camera creating a new camera object', async () => {
        const response = await request(app).post('/camera').send(mockCamera);
        expect(response.status).to.equal(200);
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("object");

        // set mockID to equal response.body._id for the test to get by ID
        mockID = response.body._id;
    });

    it('should GET ALL /cameras objects', async () => {
        const response = await request(app).get('/cameras');
        expect(response.status).to.equal(200);
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("array");
    });

    it('should GET a camera by id /camera/:cameraID', async () => {
        const response = await request(app).get('/camera/' + mockID);
        expect(response.status).to.equal(200);
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("object");
    });

    it('should DELETE ALL /cameras from the db', async () => {
        const response = await request(app).delete('/cameras');
        expect(response.status).to.equal(200);
        expect(response.body).not.to.be.empty;
    });
});
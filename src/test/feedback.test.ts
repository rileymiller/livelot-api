import { expect } from 'chai';
import { app } from '../server';
import {agent as request} from 'supertest';

let mockFeedback = {
    user: "maddie",
    email: "maddierogers20@gmail.com",
    type: "test",
    location: "Seattle",
    feedback: "testing the feedback endpoint",
    source: "my laptop",
}

describe("Feedback Tests: ", () => {
    it('should POST /feedback', async function () {
        const response = await request(app).post('/feedback').send(mockFeedback);
        expect(response.status).to.equal(200);
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("object");

        // set mockFeedback to equal response.body for the next test
        mockFeedback = response.body;
    });

    it('should GET ALL /feedback', async function () {
        const response = await request(app).get('/feedback');
        expect(response.status).to.equal(200);
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("array");
    });
});
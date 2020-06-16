import { expect } from 'chai';
import { app } from '../server';
import {agent as request} from 'supertest';
import { Feedback } from '../api/models/feedbackModel'

const mockFeedback = {
    user: "maddie",
    email: "maddierogers20@gmail.com",
    type: "test",
    location: "Seattle",
    feedback: "testing the feedback endpoint",
    source: "my laptop",
}

// clear out the db before all the test and after tests are complete
before(async () => {
    // delete everything in feedback collection
    await Feedback.deleteMany({});
});

after(async () => {
    // delete everything in feedback collection
    await Feedback.deleteMany({});
});

describe("Feedback Tests: ", () => {
    it('should POST /feedback', async () => {
        const response = await request(app).post('/feedback').send(mockFeedback);
        expect(response.status).to.equal(200);
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("object");
    });

    it('should GET ALL /feedback', async () => {
        const response = await request(app).get('/feedback');
        expect(response.status).to.equal(200);
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("array");
    });
});
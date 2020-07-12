import { expect } from 'chai';
import { app } from '../server';
import { agent as request } from 'supertest';
import { User } from '../api/models/userModel';

const mockUser = {
    username: 'maddie',
    password: '123456',
    fullName: 'maddie rogers',
    email: 'livelotdev@gmail.com',
    phoneNumber: '253-123-4567',
    createDate: '2020-07-02T15:39:53.000Z'
};

const mockUserUpdated = {
    username: 'maddie',
    password: '123456',
    fullName: 'Madison Rogers',
    email: 'livelotdev@gmail.com',
    phoneNumber: '253-123-4567',
    createDate: '2020-07-02T15:39:53.000Z'
};

const mockUserUpdatedWithID = {
    _id: '',
    username: 'maddie',
    password: '123456',
    fullName: 'Madison Rogers',
    email: 'livelotdev@gmail.com',
    phoneNumber: '253-123-4567',
    createDate: '2020-07-02T15:39:53.000Z'
};

let mockUserID = '';

// clear out the db before all the test and after tests are complete
before(async () => {
    // delete everything in the lot and lotLog collection
    await User.deleteMany({});
});

after(async () => {
    // delete everything in the lot and lotLog collection
    await User.deleteMany({});
});

describe('User Tests: ', () => {
    it('Should POST to create a new user', async () => {
        const response = await request(app).post('/user').send(mockUser);
        expect(response.status).to.equal(200);
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("object");

        // set lotID variable equal to the new lotID
        mockUserID = response.body._id;
    });

    it('Should GET all /user', async () => {
        const response = await request(app).get('/user');
        expect(response.status).to.equal(200);
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("array");
    });

    it('Should GET user by /user/:userID', async () => {
        const response = await request(app).get('/user/' + mockUserID);
        expect(response.status).to.equal(200);
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("object");
    });

    it('Should UPDATE a user by id /user/:userID', async () => {
        const response = await request(app).put('/user/' + mockUserID).send(mockUserUpdated);
        expect(response.status).to.equal(200);
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("object");
        // check to see if the lotName has been accurately updated
        expect(response.body.fullName).to.equal(mockUserUpdated.fullName);
    });

    it('Should throw a 403 error when trying to UPDATE user._id', async () => {
        mockUserUpdatedWithID._id = mockUserID;
        const response = await request(app).put('/lot/' + mockUserID).send(mockUserUpdatedWithID);
        expect(response.status).to.equal(403);
        expect(response.error).not.to.be.empty;
        expect(response).to.be.an("object");
    });

    it('Should DELETE a user by id /user/:userID', async () => {
        const response = await request(app).delete('/lot/' + mockUserID);
        expect(response.status).to.equal(200);
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("object");
    });

    // NOTE: Still need to test the authentication stuff: signup, login, resetPassword, me
});
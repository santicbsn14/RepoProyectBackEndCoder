import { faker } from '@faker-js/faker';
import chai from "chai";
import supertest from "supertest";
import initServer from "./index.js";

const expect = chai.expect;
let jwt = "";

describe("Testing User Endpoints Success", () => {
    before(async function () {
        const { app, db } = await initServer();
        const application = app.callback();
        this.requester = supertest.agent(application);
        this.app = app;
        this.db = db;
        this.payload = {};
    });
    after(async () => {
        // await this.db.dropDatabase()
        // await this.db.close()
      })
    beforeEach(async function () {
        this.timeout(2000);
        // await new Promise(resolve => setTimeout(resolve, 500));
    });
    it('Creacion de cuenta /api/session/signup', function ()
    {
        this.payload = {
            firstname: `${faker.person.firstName()} Ana Maria`,
            lastname: `${faker.person.lastName()} Ana Maria`,
            email: faker.internet.email(),
            age: 20,
            password: "12345678"
        };

        return this.requester
            .post('/api/session/signup')
            .send(this.payload)
            .then(result =>
            {
                const { _body, status } = result;
                expect(status).to.be.equals(201);
                expect(_body.user.email).to.be.equals(this.payload.email);
                expect(_body.message).to.be.equals("User created.");
            }
        );
    });
    it('Login de cuenta /api/session/login', function ()
    {
        const payload = {
            email: this.payload.email,
            password: this.payload.password
        };

        return this.requester
            .post('/api/session/login')
            .send(payload)
            .then(result =>
            {
                const { _body, status } = result;

                expect(status).to.be.equals(201);
                expect(_body.message).to.be.equals('Login exited');

                jwt = _body.accessToken;
            }
        );
    });
    it('Current /api/session/current', function ()
    {
        const payload = {
            email: this.payload.email,
            password: this.payload.password
        };

        return this.requester
            .get('/api/session/current')
            .set('Authorization', ` ${jwt}`)
            .then(result =>
            {
                const { _body, status } = result;
                expect(status).to.be.equals(200);
                expect(_body.payload.email).to.be.equals(this.payload.email);
            }
        );
    });

})
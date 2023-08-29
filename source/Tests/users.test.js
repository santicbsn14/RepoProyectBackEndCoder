import { faker } from '@faker-js/faker';
import { expect, jest, test } from '@jest/globals';
import supertest from "supertest";
import initServer from "./index.js";
import mongoose from 'mongoose';

const api = supertest(await initServer().app)
let jwt = "";
    // before(async function () {
    //     // const { app } = await initServer();
    //     // const application = app.callback();
    //     // this.app = app;
    //     // this.db = db;
    //     this.payload = {};
    // });
afterAll(async () => {
    await mongoose.connection.close();
    await initServer().app.close()
  })
describe("Testing User Endpoints Success", () => {
       // before(async function () {
        //     // const { app } = await initServer();
        //     // const application = app.callback();
        //     // this.app = app;
        //     // this.db = db;
        //     this.payload = {};
        // });('Creacion de cuenta /api/session/signup', function ()
    test('Api/session', async ()=>{
        const payload = {
            firstname: `${faker.person.firstName()} Ana Maria`,
            lastname: `${faker.person.lastName()} Ana Maria`,
            email: faker.internet.email(),
            age: 20,
            password: "12345678"
        };

        const { status, body } = await api.post('/api/session/signup').send(payload);

                expect(status).toBe(201);
                expect(body.msg).toContain('User creado');
                expect(status).toBe(201);
                expect(body.user.email).toBe(payload.email);
                expect(body.message).toBe("User created.");
            
        
    });
    // test('Login de cuenta /api/session/login', function ()
    // {
    //     const payload = {
    //         email: this.payload.email,
    //         password: this.payload.password
    //     };

    //     return this.requester
    //         .post('/api/session/login')
    //         .send(payload)
    //         .then(result =>
    //         {
    //             const { _body, status } = result;

    //             expect(status).to.be.equals(201);
    //             expect(_body.message).to.be.equals('Login extested');

    //             jwt = _body.accessToken;
    //         }
    //     );
    // });
    // test('Current /api/session/current', function ()
    // {
    //     const payload = {
    //         email: this.payload.email,
    //         password: this.payload.password
    //     };

    //     return this.requester
    //         .get('/api/session/current')
    //         .set('Authorization', ` ${jwt}`)
    //         .then(result =>
    //         {
    //             const { _body, status } = result;
    //             expect(status).to.be.equals(200);
    //             expect(_body.payload.email).to.be.equals(this.payload.email);
    //         }
    //     );
    // });

})

import { faker } from '@faker-js/faker';
import { expect, jest, test } from '@jest/globals';
import supertest from "supertest";
import mongoose from 'mongoose';
import app from '../../app.js';

const api =  supertest(app.app)
let jwt = "";
let createdUser;
afterAll(async () => {
    await mongoose.connection.close();
    await app.close()
  })
  describe("Testing User Endpoints Success", () => {
    // Variable para almacenar los datos del usuario registrado

    test('Api/session/signup', async () => {
        const payload = {
            firstname: `${faker.person.firstName()} Ana Maria`,
            lastname: `${faker.person.lastName()} Ana Maria`,
            email: faker.internet.email(),
            age: 20,
            password: "12345678",
            isAdmin: true
        };

        const { status, body } = await api.post('/api/session/signup').send(payload);

        expect(status).toBe(201);
        expect(body.message).toBe("User created.");

        // Almacenar los datos del usuario registrado para usar en el test de inicio de sesión
        createdUser = {
            email: payload.email,
            password: payload.password
        };
    });
    test('Login de cuenta /api/session/login', async () => {
        const payload = {
            email: createdUser.email,
            password: createdUser.password
        };
        
        const { status, body } = await api.post('/api/session/login').send(payload);

        expect(status).toBe(201);
        expect(body.message).toBe('Login exited');


        jwt = body.accessToken;
    });
    test('Current /api/session/current', async ()=>
    {

        const { body, status } = await  api.get('/api/session/current').set('Authorization',` ${jwt}`)
        console.info(body)
                expect(status).toBe(200);
                expect(body.payload.email).toBe(createdUser.email);
            
        
    });
})
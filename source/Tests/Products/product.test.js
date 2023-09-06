import { expect, jest, test } from '@jest/globals';
import supertest from "supertest";
import mongoose from 'mongoose';
import app from '../../app.js';
import Product from '../../Data/Dao/Models/productSchema.js';
import initialProducts from './products.json'

const api =  supertest(app.app);

beforeEach(async()=>{
    
    const product = new Product(initialProducts[0]);
    await product.save();

    const product1 = new Product(initialProducts[1]);
    await product1.save();

    const product3 = new Product(initialProducts[2]);
    await product3.save();

    const product4 = new Product(initialProducts[3]);
    await product4.save();
})
afterAll(async () => {
    await Product.deleteMany({});
    await mongoose.connection.close();
    await app.close()
  })
  describe("Testing product Endpoints Success", () => {

    test('Api/products/', async () => {
        const { status, body } = await api.get('/api/products/');
        expect(status).toBe(200);

    });
    test('/api/products/?limit=2', async () => {
        const { status, body } = await api.get('/api/products/?limit=2');
        expect(status).toBe(200);
        expect(Array.isArray(body.products)).toBe(true);
        expect(body.products.length).toBe(2);
    });

})
import mongoose from 'mongoose'
import cartSchema from "../models/cartSchema.js";
import productSchema from "../models/productSchema.js";
class cartMongooseDao {
  async getall() {
    try{
    const listcarts = await cartSchema.find({}).populate('products._id')
    if (!listcarts) return null;
    return listcarts.map((cart) => ({
      id: cart._id,
      products: cart.products.map((product) => ({
        id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock,
        status: product.status,
      })),
      quantity: cart.quantity,
    }));
  }catch(error){
    console.log(error)
  }
  }
  async getOne(id) {
    try {
        const document = await cartSchema.findById(id).populate(['products']);
        console.log(document.products)
        if (!document) return null;
        return {
            id: document._id,
            products: document.products
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};
  async create() {
    const cartDocument = await cartSchema.create({});

    return {
      id: cartDocument._id,
      products: cartDocument.products.map((product) => ({
        id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock,
        status: product.status,
      })),
      status: cartDocument.status,
    };
  }

  async addproductbycart(cid,pid,qp) {
    try {
      let cartDocument = await cartSchema.findOne({_id:cid})
      let product = await  productSchema.findOne({_id:pid})
      cartDocument.products.push({id: product._id, quantity:qp})
      await cartSchema.updateOne({_id:cid},cartDocument)
      console.log(cartDocument)
      return {
        id: cartDocument._id,
        products: cartDocument.products.map((product) => ({
          id: product._id
        })),
        status: cartDocument.status,
      };
    } catch (error) {
      console.log(error)
    }
  }

  async updateCart(cid, cart) {
    try {
      await cartSchema.updateOne({ _id: cid }, cart);
    } catch (err) {
      console.log(err);
    }
  }

  async deletecart(cid) {
    return await cartSchema.deleteOne({ _id: cid });
  }
}
export default cartMongooseDao;

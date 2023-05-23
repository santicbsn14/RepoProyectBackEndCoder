import mongoose from 'mongoose'
import cartSchema from "../models/cartSchema.js";
import productSchema from "../models/productSchema.js";
class cartMongooseDao {
  async paginate(querys){
    try {
      const {limit,page, name} = querys
      const documents = cartSchema.paginate({limit,page, name})
      documents.docs= documents.docs.map((doc)=>({
        id: doc._id,
        products: doc.products,
        status: true
      }))
      return documents
    } catch (error) {
      throw new error
    }

  }
  async getall() {
    try{
    const listcarts = await cartSchema.find({})
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
        const document = await cartSchema.findById(id).populate(['products.id']);
        console.log(document.products)
        if (!document) return null;
        return {
            id: document._id,
            products: document.products.map((product) => ({
              id: product._id,
              title: product.title,
              description: product.description,
              price: product.price,
              thumbnail: product.thumbnail,
              code: product.code,
              stock: product.stock,
              status: product.status,
            })),
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
      let quantity = parseInt(qp.qp)
      cartDocument.products.push({_id: product._id, quantity: quantity})
       const document = await cartSchema.findOneAndUpdate({_id:cid}, cartDocument, {new: true})
       console.log(document)
      return {
        id: document._id,
        products: document.products,
        status: true
      };
    } catch (error) {
     throw new Error
    }
  }

  async updateCart(cid, cart) {
    try {
      let newcart = await cartSchema.findOneAndUpdate({ _id: cid }, cart, {new: true})
      return {
        id: newcart._id,
        products: newcart.products,
        status: true
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deletecart(cid) {
    return await cartSchema.deleteOne({ _id: cid });
  }
}
export default cartMongooseDao;

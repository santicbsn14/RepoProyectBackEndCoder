import cartSchema from "../models/cartSchema.js";
class cartMongooseDao {
  async getall() {
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
  }
  async getcartbyid(id) {
    const cartDocument = await cartSchema.findOne({ _id: id });
    if (!cartDocument) {
      return false;
    }
    return cartDocument;
  }
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

  async addproductbycart(pid, cid) {
    const newproductdocument = await cartSchema.insertOne(
      { _id: pid },
      { _id: cid }
    );
    return newproductdocument;
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

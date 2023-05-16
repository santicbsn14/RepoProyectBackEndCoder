import productSchema from "../models/productSchema.js";
class productMongooseDao {
  async getall() {
    const listproducts = await productSchema.find({});
    return listproducts.map((product) => ({
      id: product._id,
      quantity: product.quantity,
      title: product.title,
      description: product.description,
      code: product.code,
      price: product.price,
      stock: product.stock,
      category: product.category,
    }));
  }
  async getproductbyid(id) {
    const document = await productSchema.findById(id);

    return {
      id: document._id,
      quantity: document.quantity,
      title: document.title,
      description: document.description,
      code: document.code,
      price: document.price,
      stock: document.stock,
      category: document.category,
    };
  }
  async create(body) {
    const cartDocument = await productSchema.create(body);
    return {
      id: cartDocument._id,
      quantity: cartDocument.quantity,
      title: cartDocument.title,
      description: cartDocument.description,
      code: cartDocument.code,
      price: cartDocument.price,
      stock: cartDocument.stock,
      category: cartDocument.category,
    };
  }

  async deleteproduct(pid) {
    console.log(pid)
    return await productSchema.deleteOne({ _id: pid });
  }
  async updateProduct(pid, body) {
    console.log(pid);
    document = await productSchema.findByIdAndUpdate({ _id: pid }, body, {
      new: true,
    });
    if (!productDocument) {
      return false;
    }
  }
}
export default productMongooseDao;
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
  async getproductbyid(pid) {
    const document = await productSchema.findById(pid);

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
    const productDocument = await productSchema.create(body);
    return {
      id: productDocument._id,
      quantity: productDocument.quantity,
      title: productDocument.title,
      description: productDocument.description,
      code: productDocument.code,
      price: productDocument.price,
      stock: productDocument.stock,
      category: productDocument.category,
    };
  }

  async deleteproduct(pid) {
    console.log(pid)
    return await productSchema.deleteOne({ _id: pid });
  }
  async updateProduct(pid, body) {
    try {
      console.log(pid);
      let productDocument = await productSchema.findByIdAndUpdate({ _id: pid }, body, {
        new: true,
      });
      return  {
        id: productDocument._id,
        quantity: productDocument.quantity,
        title: productDocument.title,
        description: productDocument.description,
        code: productDocument.code,
        price: productDocument.price,
        stock: productDocument.stock,
        category: productDocument.category,
      };

    } catch (error) {
      console.log(error)
    }

  }
}
export default productMongooseDao;
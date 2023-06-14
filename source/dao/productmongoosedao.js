import productSchema from "../Models/productSchema.js";
class productMongooseDao {

  async paginate({ limit, sort, paginate })
  {
    try
    {
        const listProducts = await productSchema.paginate({limit, sort, paginate})
        console.log(listProducts)
        return listProducts.map((product) => ({
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
    catch(error)
    {
        throw new Error(error)
    }
  }


  async getall({limit, sort}) {
    let query = productSchema.find();

    if (limit) {
      query = query.limit(limit);
    }

    if (sort) {
      query = query.sort({ price: sort }); 
    }
    const listProducts = await query;
    return listProducts.map((product) => ({
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


  async getProductById(pid)
  {
    try {
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
    catch(error)
    {
      throw new Error(error)
    }

  }


  async create(body)
  {
    try
    {
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
    catch(error)
    {
      throw new Error(error)
    }
  }


  async deleteProduct(pid)
  {
    try
    {
      await productSchema.deleteOne({ _id: pid });
      return 'Producto eliminado con exito'
    }
    catch (error)
    {
      throw new Error(error)
    }

  }


  async updateProduct(pid, body)
  {
    try
    {
      let productDocument = await productSchema.findByIdAndUpdate({ _id: pid }, body, {
        new: true,
      });
      return{
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
    catch (error)
    {
      throw new Error(error)
    }
  }
}
export default productMongooseDao;
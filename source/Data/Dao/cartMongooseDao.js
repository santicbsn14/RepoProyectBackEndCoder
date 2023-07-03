
import cartSchema from "./Models/cartSchema.js";
import productSchema from "./Models/productSchema.js";

class cartMongooseDao {

    async paginate(criteria){
    try {
      const { limit, page } = criteria;
      const listcarts = await cartSchema.paginate({}, { limit, page })
    
      return listcarts.docs.map((cart) => ({
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
    } catch (error) {
      throw new Error(error)
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
    }
    catch(error){
    throw new Error(error)
  }
  }


  async getOne(id)
  {
    try
    {
        const document = await cartSchema.findById(id).populate('products._id')
        if (!document) return null;
        return {
          id: document._id,
          products: document.products,
        };
    }
    catch (error)
    {
      throw new Error(error);
    }
};


  async create()
  {
    try
    {
      const cartDocument = await cartSchema.create({})
      return {
        id: cartDocument._id,
        products: cartDocument.products,
        status: cartDocument.status,
      };
    }
    catch(error)
    {
        throw new Error(error)
    }
  }


  async addProductByCart(cid,pid,qp)
  {
    try 
    {
      let cartDocument = await cartSchema.findOne({_id:cid})
      let product = await  productSchema.findOne({_id:pid})
      let quantity = parseInt(qp.qp)
      cartDocument.products.push({_id: product._id, quantity: quantity})
       const document = await cartSchema.findOneAndUpdate({_id:cid}, cartDocument, {new: true}).populate('products._id')
       
      return {
        id: document._id,
        products: document.products,
        quantity: document.quantity,
        status: true
      };
    }
    catch (error)
    {
     throw new Error('Error en el dao')
    }
  }


  async updateCart(cid, cart) {
    try {
      let newcart = await cartSchema.findOneAndUpdate({ _id: cid }, cart, {new: true})
      if (!newcart) {
        return "Cart not found";
      }
      return {
        id: newcart._id,
        products: newcart.products,
        status: true
      }
    } catch (err) {
      console.log(err);
    }
  }


  async deleteCart(cid) {
    return await cartSchema.deleteOne({ _id: cid });
  }
}
export default cartMongooseDao;

import cartMongooseDao from "../dao/cartmongoosedao.js";
import productMongooseDao from "../Dao/productMongooseDao.js";
class cartManager {
  constructor() {
    this.dao = new cartMongooseDao();
    this.daoProduct = new productMongooseDao();
  }
  async getall(querys)
  {
    return this.dao.paginate(querys)
  }


  async getCartById(id) 
  {
    return this.dao.getOne(id);
  }


  async create() 
  {
    return this.dao.create();
  }


  async addProductByCart(cid, pid,qp) 
  {
    return await this.dao.addProductByCart(cid,pid,qp);    
  }


  async deleteCart(cid) 
  {
    return this.dao.deleteCart(cid);
  }


  async updateCart(cid,cart)
  {
    return this.dao.updateCart(cid,cart)
  }


  async updateProductCart(cid, pid,productQuantity)
  {
    let cart = await this.dao.getcartbyid(cid);

    if (!cart) {
      return "Cart not found";
    }

    let products = cart.products;
    let prod = products.find((prod) => prod.product === pid);
    prod.quantity = productQuantity.quantity;

    await this.dao.updateCart(cid, cart);
  }
}
export default cartManager;

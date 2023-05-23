import cartMongooseDao from "../dao/cartmongoosedao.js";
import productMongooseDao from "../dao/productmongoosedao.js";
class cartManager {
  constructor() {
    this.dao = new cartMongooseDao();
    this.daoProduct = new productMongooseDao();
  }
  async getall(querys) {
    try {
      return this.dao.paginate(querys)
    } catch (error) {
      console.log(error)
    }
  }
  async getcartbyid(id) {
    return this.dao.getOne(id);
  }
  async create() {
    return this.dao.create();
  }
  async addproductbycart(cid, pid,qp) {
    return await this.dao.addproductbycart(cid,pid,qp);    

  }
  async deletecart(cid) {
    return this.dao.deletecart(cid);
  }
  async updateCart(cid,cart){
    return this.dao.updateCart(cid,cart)
  }
  async updateProductCart(cid, pid,productQuantity) {
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

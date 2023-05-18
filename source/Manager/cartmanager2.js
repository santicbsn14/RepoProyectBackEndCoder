import cartMongooseDao from "../dao/cartmongoosedao.js";
import productMongooseDao from "../dao/productmongoosedao.js";
class cartManager {
  constructor() {
    this.dao = new cartMongooseDao();
    this.daoProduct = new productMongooseDao();
  }
  async getall() {
    try {
      return this.dao.getall();
    } catch (error) {
      console.log(error)
    }
  }
  async getcartbyid(id) {
    return this.dao.getcartbyid(id);
  }
  async create() {
    return this.dao.create();
  }
  async addproductbycart(cid, newproduct) {
    let prodExis = await this.dao.addproductbycart(cid,newproduct);

    if (!prodExis) {
      return "Product not found";
    }

    let cart = await this.dao.getcartbyid(cid);

    if (!cart) {
      return "Cart not found";
    }
    let products = cart.products;

    products.push({ product: newproduct, quantity: 1 });
    return await this.dao.updateCart(cid, cart);
  }
  async deletecart(cid) {
    return this.dao.deletecart(cid);
  }
  async updateOneProductCart(cid, pid) {
    let cart = await this.dao.getcartbyid(cid);

    if (!cart) {
      return "Cart not found";
    }

    let products = cart.products;
    let prod = products.find((prod) => prod.product === pid);
    prod.quantity = newQuantity.quantity;

    await this.dao.updateCart(cid, cart);
  }
}
export default cartManager;

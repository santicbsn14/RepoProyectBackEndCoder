import cartMongooseDao from "../dao/cartmongoosedao.js";
import productMongooseDao from "../dao/productmongoosedao.js";
class cartManager {
  constructor() {
    this.dao = new cartMongooseDao();
    this.daoProduct = new productMongooseDao();
  }
  async getall() {
    return this.dao.getall();
  }
  async getcartbyid(id) {
    return this.dao.getcartbyid(id);
  }
  async create() {
    return this.dao.create();
  }
  async addproductbycart(cid, pid) {
    let prodExis = await this.daoProduct.getproductbyid(pid);

    if (!prodExis) {
      return "Product not found";
    }

    let cart = await this.dao.getcartbyid(cid);

    if (!cart) {
      return "Cart not found";
    }
    let products = cart.products;

    products.push({ product: pid, quantity: 1 });
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

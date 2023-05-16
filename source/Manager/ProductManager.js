import productMongooseDao from "../dao/productmongoosedao.js";

class productManager {
  constructor() {
    this.dao = new productMongooseDao();
  }
  async getall() {
    return this.dao.getall();
  }
  async getproductbyid(pid) {
    return this.dao.getproductbyid(pid);
  }
  async create(body) {
    return this.dao.create(body);
  }
  async deleteproduct(pid) {
    return this.dao.deleteproduct(pid);
  }
  async updateProduct(pid, body) {
    return this.dao.updateProduct(pid,body);
  }
}
export default productManager;
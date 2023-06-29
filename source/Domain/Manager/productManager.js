import container from "../../container.js";

class productManager {
  constructor() {
    this.dao = container.resolve('ProductDao')
  }
  async paginate(criteria)
  {
    return this.dao.paginate(criteria);
  }


  async getProductById(pid)
  {
    return this.dao.getProductById(pid);
  }


  async create(body)
  {
    return this.dao.create(body);
  }


  async deleteProduct(pid)
  {
    return this.dao.deleteProduct(pid);
  }


  async updateProduct(pid, body)
  {
    return this.dao.updateProduct(pid,body);
  }
}
export default productManager;
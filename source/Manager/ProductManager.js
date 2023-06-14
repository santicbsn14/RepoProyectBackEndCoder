import productMongooseDao from "../Dao/productMongooseDao.js";

class productManager {
  constructor() {
    this.dao = new productMongooseDao();
  }
  async getall({ limit, sort, paginate })
  {
    return this.dao.getall({ limit, sort, paginate });
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
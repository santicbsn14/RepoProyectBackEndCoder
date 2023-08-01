import container from "../../container.js";
class cartManager {
  constructor() {
    this.dao = container.resolve('CartDao')
    this.daoProduct = container.resolve('ProductDao')
    this.daoTicket= container.resolve('TicketDao')
  }
  async getall(criteria)
  {
    return this.dao.paginate(criteria)
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


  async finalyBuy(cid, transInfoTicket)
  {
    let productsUpdated = await this.dao.finalyBuy(cid);
    
    let priceTotal = 0;

    
    for (const product of productsUpdated){
      let pid = product.product._id;
      
      priceTotal += product.product.price*product.quantity;

      let body = { ...product.product };
      delete body._id;
      await this.daoProduct.updateProduct(pid, body)
    }
    
    let ticket = await this.daoTicket.create({...transInfoTicket, amount:priceTotal});
    
    let returnTicket = await this.daoTicket.getOne(ticket.id)

    return {message: 'Compra realizada con exito', returnTicket}
  }


  async deleteCart(cid) 
  {
    return this.dao.deleteCart(cid);
  }


  async updateCart(cid,cart)
  {
    return this.dao.updateCart(cid,cart)
  }


  async updateProductCart(cid,cart,productQuantity)
  {
    return await this.dao.updateCart(cid, cart);
  }


  async deleteProductByCart(cid,pid)
  {
    return await this.dao.deleteProductByCart(cid,pid)
  }
}
export default cartManager;

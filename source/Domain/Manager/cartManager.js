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


  async create(data) 
  {
    return this.dao.create(data);
  }


  async addProductByCart(cid, pid,qp) 
  {
    let cart = await this.dao.getOne(cid);

    let product = await this.daoProduct.getProductById(pid);
    
    let quantity = parseInt(qp.qp);
  
    if(isNaN(quantity) || quantity < 1 ){ throw new Error('Es obligatorio ingresar la cantidad de cada producto')}

    let existingProduct = cart.products.find((product) => product._id._id?.toString() === pid);
    if(existingProduct)
    {
      existingProduct.quantity += quantity;
    }else
    {
      if(product.stock< quantity)throw new Error(`No disponemos de stock del producto ingresado ${product}`);
      cart.products.push({ _id: product.id, quantity: quantity });
    }
    
   
    let updatedQuantity = product.stock - quantity
    let productUpdated = {...product, stock: updatedQuantity, status: updatedQuantity === 0 ? false : product.status}
    await this.daoProduct.updateProduct(pid, productUpdated)
    let cartUpdated = {
      id: cart._id,
      products:cart.products,
      quantity: cart.quantity,
      }
     return await this.dao.updateCart(cid, cartUpdated)
  }


  async finalyBuy(cid, transInfoTicket)
  {
    let cart = await this.dao.getOne(cid);

    let updatedProducts = []

      for (const item of cart.products){
        let product = item._id;

        let quantityInCart = item.quantity;

        if(quantityInCart> product.stock) throw new Error(`No contamos con el stock de este producto ${product}`)
        
        let stock = item._id.stock;

        let updatedStock = stock-quantityInCart;

        product.stock= updatedStock
        
        updatedProducts.push({product, quantity: item.quantity})
      }
   
    
    let priceTotal = 0;

    for (const product of updatedProducts){
      let pid = product.product._id;
      
      priceTotal += product.product.price*product.quantity;
      let body = { ...product.product };
      console.log(product.product.stock)
      if(product.product.stock===0) body = {...product.product, status: false}
      delete body._id;
      await this.daoProduct.updateProduct(pid, body)
    }
    
    let ticket = await this.daoTicket.create({...transInfoTicket, purchaser:transInfoTicket.purchaser.id, amount:priceTotal});
    await this.dao.deleteCart(cid)

    return {message: 'Estas a solo un paso de realizar la compra!', ticket}
  }


  async deleteCart(cid) 
  {
    return this.dao.deleteCart(cid);
  }


  async updateCart(cid,cart)
  {
    return this.dao.updateCart(cid,cart)
  }


  async deleteProductByCart(cid,pid)
  {
    return await this.dao.deleteProductByCart(cid,pid)
  }
}
export default cartManager;

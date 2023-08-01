
import cartSchema from "./Models/cartSchema.js";
import container from "../../container.js";

class cartMongooseDao {

  constructor()
  {
    this.Product = container.resolve('ProductDao')
  }
    async paginate(criteria){
    try {
      const { limit, page } = criteria;
      const listcarts = await cartSchema.paginate({}, { limit, page })
    
      return listcarts.docs.map((cart) => ({
        id: cart._id,
        products:listcarts.products,
        quantity: cart.quantity,
      }));
    } catch (error) {
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
          products:document.products,
          status: true
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
      const document = await cartSchema.create({})
      return {
        id: document._id,
        products: document.products,
        quantity: document.quantity,
        status: true
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
    let cartDocument = await cartSchema.findOne({_id:cid});

    let productDocument = await this.Product.getProductById({_id:pid});
    
    let quantity = parseInt(qp.qp);
    
    if(isNaN(quantity) || quantity < 1 ){ throw new Error('Es obligatorio ingresar la cantidad de cada producto')}

    let existingProduct = cartDocument.products.find((product) => product._id?.toString() === pid);
    
    if(existingProduct)
    {
      existingProduct.quantity += quantity;
      
      if(existingProduct.quantity > productDocument.stock)
      {
       throw new Error(`No disponemos stock del producto ingresado ${existingProduct}`);
      }
    }else
    {
      if(productDocument.stock< quantity)throw new Error(`No disponemos de stock del producto ingresado ${productDocument}`);
      cartDocument.products.push({ _id: productDocument.id, quantity: quantity });

    }

    const document = await cartSchema.findOneAndUpdate({_id:cid}, cartDocument, {new: true}).populate('products._id');

  return {

   id: document._id,

   products: document.products,

   quantity: document.quantity,

   status: true

        };

  }
  catch(error)
  {
    throw new Error(error)
  }

}


  async updateCart(cid, cart) 
  {
    try 
    {
      let newcart = await cartSchema.findOneAndUpdate({ _id: cid }, cart, {new: true})
      if (!newcart) {
        throw new Error("Cart not found")
      }
      return {
        id: newcart._id,
        products: newcart.products,
        status: true
      }
    } catch (err) 
    {
      throw new Error(err);
    }
  }


  async deleteCart(cid) {
    return await cartSchema.deleteOne({ _id: cid });
  }

  async finalyBuy(cid,body)
  {
    try 
    {
      let cartDocument = await cartSchema.findOne({_id:cid}).populate('products._id')
      
      let updatedProducts = []
      for (const item of cartDocument.products){
        let product = item._id;

        let quantityInCart = item.quantity;

        if(quantityInCart> product.stock) throw new Error(`No contamos con el stock de este producto ${product}`)
        
        let stock = item._id.stock;

        let updatedStock = stock-quantityInCart;

        product.stock= updatedStock
        
        updatedProducts.push({product, quantity: item.quantity})
      }
      
      return updatedProducts
    } 
    catch (error) 
    {
      throw new Error(error)
    }
  }

  async deleteProductByCart(cid,pid)
  {
    try 
    {
      let cartDocument = await this.getOne(cid);
      
      let productsUpdated = cartDocument.products.filter((product) => product._id._id.toString() !== pid);

      let cartUpdated = {...cartDocument, products:productsUpdated}

      if(productsUpdated)
      {
        await cartSchema.findOneAndUpdate({ _id: cid }, cartUpdated, {new: true})
      }else
      {
        throw new Error('No se ha podido eliminar el producto')
      }
      return cartUpdated
    } 
    catch (error) 
    {
      throw new Error(error)
    }
  }
}
export default cartMongooseDao;

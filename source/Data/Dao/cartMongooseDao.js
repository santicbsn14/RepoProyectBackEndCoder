
import cartSchema from "./Models/cartSchema.js";
import container from "../../container.js";

class cartMongooseDao {

  constructor()
  {
    this.Product = container.resolve('ProductDao')
  }
    async paginate(criteria){
    try {
      let { limit, page } = criteria;
      if(!limit) limit=4
      const listcarts = await cartSchema.paginate({}, { limit, page })

    
      return listcarts.docs.map((document) => ({
        id: document._id,
        user: document.user.email,
        products:document.products,
        status: document.status
      }));
    } catch (error) {
      throw new Error(error)
    }  
  }

  async getOne(id)
  {
    try
    {
        const document = await cartSchema.findById(id).populate(['products._id','user'])
        if (!document) return null;
        
        return {
          id: document._id,
          user: document.user,
          products:document.products,
          status: true
        };
    }
    catch (error)
    {
      throw new Error(error);
    }
  };

  async create(data)
  {
    try
    {
      const document = await cartSchema.create(data)
      return {
        id: document._id,
        user: document.user,
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
      let document = await cartSchema.findOneAndUpdate({ _id: cid }, cart, {new: true}).populate(['products._id','user'])
      if (!document) {
        throw new Error("Cart not found")
      }  
        return {
          id: document._id,
          user: document.user,
          products:document.products,
          quantity: document.quantity,
          status: true
        };
      
    } catch (err) 
    {
      throw new Error(err);
    }
  }

  async deleteCart(cid) {
    return await cartSchema.deleteOne({ _id: cid });
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

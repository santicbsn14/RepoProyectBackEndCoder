import cartSchema from "../models/cartSchema.js";
 class cartMongooseDao{

    async getall(){
        const listcarts = await  cartSchema.find()
        return listcarts.map(cart=>(
            {
                id: cart._id,
                quantity: cart.quantity
            }
        ))
    }
    async getcartbyid(id){
        const document = await cartSchema.findById(id).populate('products._id');
        return {
            id: document._id,
            products: document.products.map(item => {
                const { _id: product } = item;
                return {
                    id: product._id,
                    quantity: item.quantity,
                    title: product.title,
                    description: product.description,
                    code: product.code,
                    price: product.price,
                    stock: product.stock,
                    category: product.category,
                }
            })}
    }
    async create(){
        const cartDocument = await  cartSchema.create()
        return {
            id:cartDocument._id,
            products: cartDocument.products.map(item => {
                return {
                    id: item._id,
                    quantity: item.quantity
                }
            })
        }
    }
    async addproductbycart(pid,cid){
        const newproductdocument = await cartSchema.insertOne( {_id:pid},{_id:cid})
        return newproductdocument
    }
    async deletecart(cid){
        return await  cartSchema.deleteOne({_id:cid})
    }
 }
 export default cartMongooseDao
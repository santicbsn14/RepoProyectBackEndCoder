import cartSchema from "../models/cartSchema.js";
 class cartManager{
    async getall(){
        return cartSchema.find()
    }
    async getcartbyid(id){
        return cartSchema.findOne({_id:id})
    }
    async create(){
        return cartSchema.create()
    }
    async addproductbycart(pid,cid){
        return cartSchema.insertOne( {_id:pid},{_id:cid})
    }
    async deletecart(cid){
        return cartSchema.deleteOne({_id:cid})
    }
 }
 export default cartManager
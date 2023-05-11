import cartMongooseDao from "../dao/cartmongoosedao.js"
 class cartManager{
    constructor(){
        this.dao= new cartMongooseDao()
    }
    async getall(){
        return this.dao.getall()
    }
    async getcartbyid(id){
        return this.dao.getcartbyid(id)
    }
    async create(){
        return this.dao.create()
    }
    async addproductbycart(pid,cid){
        return this.dao.addproductbycart( pid,cid)
    }
    async deletecart(cid){
        return this.dao.deletecart(cid)
    }
 }
 export default cartManager
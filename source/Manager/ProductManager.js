import productMongooseDao from '../dao/productmongoosedao.js'
 
class productManager{
    constructor(){
        this.dao= new  productMongooseDao()
    }
    async getall(){
        return this.dao.getall()
    }
    async getproductbyid(pid){
        return this.dao.getproductbyid(pid)
    }
    async create(){
        return this.dao.create()
    }
    async deleteproduct(pid){
        return this.dao.deleteproduct(pid)
    }
    async updateProduct(pid, body){
        return this.dao.updateProductpid, body()
    }
}
export default productManager
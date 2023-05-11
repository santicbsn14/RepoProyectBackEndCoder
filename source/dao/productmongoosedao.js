import productSchema from "../models/productSchema.js";
 class productMongooseDao{

    async getall(){
        const listproducts = await  productSchema.find()
        return listproducts.map(product=>(
            {
                id: product._id,
                quantity: item.quantity,
                title: product.title,
                description: product.description,
                code: product.code,
                price: product.price,
                stock: product.stock,
                category: product.category,
            }
        ))
    }
    async getproductbyid(id){
        const document = await productSchema.findById(id)

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
            }
    async create(){
        const cartDocument = await  productSchema.create()
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
        }
    

    async deleteproduct(pid){
        return await productSchema.deleteOne({_id:pid})
    }
    async updateProduct(pid,body){
        document = await productSchema.findByIdAndUpdate(id, body);
        return {
            id: document._id,
            title: document.title,
            description: document.description,
            code: document.code,
            price: document.price,
            status: document.status,
            stock: document.stock,
            category: document.category,
            thumbnail: document.thumbnail
        }
    }
 }
 export default productMongooseDao
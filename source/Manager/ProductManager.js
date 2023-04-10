import fs from 'fs/promises'
const typeProduct = {
    title:'string',
    description:'string',
    price: 'number',
    code:'string',
    stock:'number',
    status: 'boolean',
    category:'string',
}
class ProductManager{
    
    constructor(){
        this.products= []
        this.nextid= 1;
        this.path= './source/products.json';
    }
    async addproduct({title,description,price,thumbnail,code,stock,category}){
    try{
        let products = await this.getProducts()
        if (!products) {  // si products es undefined, crea una lista vacía
            products = []
        }
         if (!title || !description || !code || !price || !stock || !category) throw new Error('Todos los campos son obligatorios');
         if (!(typeof title === typeProduct.title) || !(typeof description === typeProduct.description) || !(typeof code === typeProduct.code) || !(typeof price === typeProduct.price) || !(typeof stock === typeProduct.stock) || !(typeof category === typeProduct.category) ) throw new Error('Los tipos de datos son incorrectos');
        const newProduct = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            status: true,
            category: category,
            id : ++ this.nextid 
        }
        products.push(newProduct)
        await fs.writeFile(this.path, JSON.stringify(products))
        return  {message: 'producto agregado con exito'}
    }catch(error){
        console.log(error,'El producto no ha sido ingresado con exito')
    }
    }
    async getProducts(){
        try{
       let products = await fs.readFile(this.path, 'utf-8')
       return JSON.parse(products)
        }catch(error){
            console.log(error)
        }
    }
    async getProductbyid(idProduct){
        try{
        let products = await fs.readFile(this.path, 'utf-8')
        let dataproducts = JSON.parse(products)
        let productbyid = dataproducts.find(p=> p.id === idProduct)
        if(!productbyid) throw new Error('El producto ingresado no existe')
        return {productbyid}
        }catch(error){
         console.log(error, 'Ese producto no existe')
        }
    }
   async updateProduct(idProduct, newobj){
    try{
        const data = await this.getProducts()
        const isExist = await this.getProductExists('id', idProduct, data);
        if (!isExist) throw new Error(`No se encontro el id ${idProduct} para modificar.`);

        
        let newproduct= data.map(product=>product.id===idProduct ? {...product, ...newobj}: product)
        await fs.writeFile(this.path, JSON.stringify(newproduct))
        return {message: 'Producto actualizado con exito'}
    }catch(error){
        console.log(error)
    }
   }
   async deleteProduct(productid){
    try{
        const data = await this.getProducts()
        const isExist = await this.getProductExists('id', productid, data);
        if (!isExist) throw new Error(`No se encontro el id: ${productid} para eliminar.`);
    let products = data.filter(product=> product.id!==productid)
    await fs.writeFile(this.path, JSON.stringify(products))
    return {message: `El producto ha sido eliminado con exito `}
    }catch(error){
        console.log(error, 'No se ha podido eliminar el producto')
    }
   }
   
  async getProductExists(key, value, data) {
    try {
      return data.find(product => product[key] === value);
    } catch (error) {
      throw error;
    }
  }
    }

export default ProductManager
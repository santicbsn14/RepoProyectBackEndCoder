import fs from 'fs/promises';
import ProductManager from './ProductManager.js'
class ShoppingCartManager {
    #nextId;

    constructor() {
        this.carts=[];
        this.#nextId = 1;
        this.path = './source/carts.json';
    }

    async addCart(){
        try{

        let carts = await this.getCarts()
        const newCart = [...carts,{id: await this.getLastId(),
        products:[]}]
        await fs.writeFile(this.path, JSON.stringify(newCart))
        return {message: 'carrito de compras creado conn exito'}
        }catch(error){
            throw {error: error.message};
        }
    }
    async getCarts() {
        try {
            let data = await fs.readFile(this.path, 'utf-8');
            if(data){
            return JSON.parse(data)
        }
            else{
                 return data=[]
                }

        }   catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            } else {
                throw error;
            }
        }
    }

    async getProductsByCartId(idCart) {
        try {
            const data = await this.getCarts()
            let  productsbycartid = data.find(cart=> cart.id ===idCart)
            if(!productsbycartid) throw new Error('El carrito ingresado no existe')
            return {productsbycartid}
        
        } catch (error) {
            console.log(error)
        }
    }
    async addProductbycartId(idproduct, idC){
        try {
            let carts = await this.getCarts()
            let idCart =  carts.find(cart=> cart.id===idC)
            let product= idCart.products.find(p=> p.id === idproduct)
            product ? product.quantity+=1 : idCart.products.push({id:idproduct, quantity:1})
             await fs.writeFile(this.path, JSON.stringify(carts))
             return {message:`Producto creado con exito`, carts}
        } catch (error) {
            console.log(error)
        }
    }
    async getLastId() {
        try {
            let lastId = this.#nextId;
            const data = await this.getCarts();
            for (let i = 0; i < data.length; i++) {
                if (data[i].id > lastId) {
                    lastId = data[i].id;
                }
            }

            return lastId + 1;

        } catch (error) {
            throw error;
        }
    }
}
export default ShoppingCartManager;
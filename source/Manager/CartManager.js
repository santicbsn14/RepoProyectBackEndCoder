import fs from 'fs/promises';


class ShoppingCartManager {
    #nextId;

    constructor() {
        this.#nextId = 1;
        this.path = './source/carts.json';
    }

    async addCart(body){
        try{
        const carts = await this.getCarts()
        const newCart = [...carts,{id:this.#nextId++,
        products:[body]}]
        await fs.writeFile(this.path, JSON.stringify(newCart))
        return {message: 'carrito de compras creado conn exito'}
        }catch(error){
            throw {error: error.message};
        }
    }


    async getCarts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);

        } catch (error) {
            throw error;
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



}

export default ShoppingCartManager;
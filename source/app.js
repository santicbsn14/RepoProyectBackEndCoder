import express from 'express'
import {engine} from 'express-handlebars'
import {resolve} from 'path'
import {Server} from 'socket.io'
import ProductManager from './Manager/ProductManager.js';
import productRouter from './routes/products.js'
import cartRouter from './routes/shoppingCart.js'
void(async()=>{
    try {
        const app = express()
        app.use(express.json())
        app.use(express.urlencoded({extended:true}))

        const viewpath = resolve('source/views')

        app.use('/api/carts', cartRouter)
        app.use('/api/products', productRouter)

        app.engine('handlebars', engine({
            layoutsDir: `${viewpath}/layouts`,
            defaultLayout:`${viewpath}/layouts/main.handlebars`
        }))
        app.set('view engine','handlebars')
        app.set('views',viewpath )


        app.get('/products', async (req,res)=>{
            const productManager = new ProductManager()
            const data = await productManager.getProductsTitle()

            res.render('home', {products:  data})
            
        })
        app.get('/realtimeproducts', async (req,res)=>{
            const productManager = new ProductManager()
            const data = await productManager.getProductsTitle()
            res.render('realTimeProducts', {products:  data})
            
        })
        const productManager = new ProductManager();

        const httpServer =  app.listen(8080,()=>{
            console.log('escuchando en puerto 8080')
            const socketServer = new Server(httpServer)
            socketServer.on('connection', socket=>{
                console.log('Nuevo cliente conectado')
                socket.on('agregando_producto', (data)=>{
                    console.log(data)
                    try {
                        productManager.addproduct(data);
                        
                    } catch (error) {
                        console.error(error);
                        console.log('El producto no ha sido ingresado con éxito');
                    }
                })
                socket.on('eliminando_producto', (iddelete)=>{
                    try {
                        console.log(iddelete)
                        productManager.deleteProduct(iddelete)
                    } catch (error) {
                        console.log('No se pudo eliminar el producto')
                    }
                })
            })
        });
        
    } catch (error) {
        console.log(error)
    }
})()


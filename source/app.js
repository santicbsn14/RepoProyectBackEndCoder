//Imports de paquetes
import express from 'express'
import {engine} from 'express-handlebars'
import {resolve} from 'path'
import {Server} from 'socket.io'
import mongoose from 'mongoose'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
//Imports locales
import dotenv from 'dotenv'
dotenv.config()
import ProductManager from './Manager/ProductManager.js';
import productRouter from './routes/products.js' 
import cartRouter from './routes/shoppingCart.js'
import sessionRouter from './routes/session.js'
import errorHandler from './middlewares/errorHandler.js'
import userRouter from './routes/user.js'
void(async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const app = express()
        app.use(express.json())
        app.use(express.urlencoded({extended:true}))
        app.use(cookieParser())
        app.use(session({
            store: MongoStore.create({
                mongoUrl:process.env.MONGO_DB_URI,
                ttl:15
            }),
            secret: 'bElGrAnO.sN',
            resave: false,
            saveUninitialized: false
        }))

        const viewpath = resolve('source/views')

        app.use('/api/carts', cartRouter)
        app.use('/api/products', productRouter)
        app.use('/api/session', sessionRouter)
        app.use('/api/users', userRouter)
        app.use(errorHandler)
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
                socket.on('agregando_producto', async (data)=>{
                    console.log(data)
                    try {
                        productManager.addproduct(data);
                        let dataact = await productManager.getProductsTitle()
                        socket.emit('productos_actualizadosadd', dataact)
                    } catch (error) {
                        console.error(error);
                        console.log('Problemas al ingresar el producto')
                    }
                })
                socket.on('eliminando_producto', async (iddelete)=>{
                    try {
                        console.log(iddelete)
                        await productManager.deleteProduct(iddelete)
                        let dataact = await productManager.getProductsTitle()
                        socket.emit('productos_actualizados', dataact)
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


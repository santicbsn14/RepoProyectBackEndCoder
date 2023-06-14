//Imports de paquetes
import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
//Imports locales
import dotenv from 'dotenv'
dotenv.config()
import productRouter from './Routes/products.js' 
import cartRouter from './Routes/cart.js'
import sessionRouter from './routes/session.js'
import errorHandler from './Middlewares/errorHandler.js'
import userRouter from './Routes/user.js'
import roleRouter from './Routes/role.js'
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



        app.use('/api/carts', cartRouter)
        app.use('/api/products', productRouter)
        app.use('/api/session', sessionRouter)
        app.use('/api/users', userRouter)
        app.use('/api/roles', roleRouter);
        app.use(errorHandler)


        app.listen(8080,()=>{
            console.log('escuchando en puerto 8080')})
            
        
    } catch (error) {
        throw new Error(error)
    }
})()


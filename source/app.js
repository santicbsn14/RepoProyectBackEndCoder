import express from 'express'
import productRouter from './routes/products.js'
import cartRouter from './routes/shoppingCart.js'
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/carts', cartRouter)
app.use('/api/products', productRouter)
app.listen(8080,()=>{
    console.log('escuchando en puerto 8080')
})

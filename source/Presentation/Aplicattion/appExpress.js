import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

//
import productRouter from '../../Presentation/Routes/products.js' 
import cartRouter from '../../Presentation/Routes/cart.js'
import sessionRouter from '../../Presentation/Routes/session.js'
import errorHandler from '../../Presentation/Middlewares/errorHandler.js'
import userRouter from '../../Presentation/Routes/user.js'
import roleRouter from '../../Presentation/Routes/role.js'
import {swaggerOptions } from '../../Utils/swagger.config.js'

class AppExpress
{
    constructor()
    {
        
    }
    init()
    {
        this.app = express()
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(cookieParser())
        this.app.use(cors())
    }

    build()
    {
        this.app.use('/api/carts', cartRouter)
        this.app.use('/api/products', productRouter)
        this.app.use('/api/session', sessionRouter)
        this.app.use('/api/users', userRouter)
        this.app.use('/api/roles', roleRouter);
        const specs = swaggerJSDoc(swaggerOptions)
        this.app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
        this.app.use(errorHandler)
    }

    listen()
    {
        this.app.listen(8080,()=>{
            console.log('escuchando en puerto 8080')})
    }

}
export default AppExpress


//Imports de paquetes

//Imports locales
import dotenv from 'dotenv'

import AppFactory from './Presentation/Factories/appFactory.js'
import DbFactory from './Data/Dao/Factories/dbFactory.js'
dotenv.config()

void(async()=>{
    try {
        const db = DbFactory.create(process.env.DB)
        db.init(process.env.DB_URI)


        const app = AppFactory.create(process.env.APPLICATION)
        app.init()
        app.build()
        app.listen()
        
    } catch (error) {
        console.log(error)
    }
})()


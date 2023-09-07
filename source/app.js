//Imports locales
import dotenv from 'dotenv'

import AppFactory from './Presentation/Factories/appFactory.js'
dotenv.config()


const app = AppFactory.create(process.env.APPLICATION)

app.start()
export default app
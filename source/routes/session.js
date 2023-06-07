import { Router } from "express";
import {login, signup, login2, current} from '../controllers/sessioncontroller.js'
import auth from '../middlewares/auth.js'
const sessionRouter = Router()

//Routes
sessionRouter.post('/signup', signup)
sessionRouter.post('/login', login, )
sessionRouter.get('/current', current)
sessionRouter.post('/login2', login2)
export default sessionRouter
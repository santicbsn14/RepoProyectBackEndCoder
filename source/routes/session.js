import { Router } from 'express';
import {login, signup, current} from '../controllers/sessioncontroller.js'
const sessionRouter = Router()

//Routes
sessionRouter.post('/signup', signup)
sessionRouter.post('/login', login, )
sessionRouter.get('/current', current)
export default sessionRouter
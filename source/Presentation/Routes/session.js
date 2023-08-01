import { Router } from 'express';

import { current, login, signup, verifyForgetYourPassword, forgetYourPassword} from '../Controllers/sessionController.js';
import auth from '../Middlewares/auth.js';
import authorization from '../Middlewares/authorization.js';
const sessionRouter = Router()

//Routes
sessionRouter.post('/signup', signup);

sessionRouter.post('/login', login, );

sessionRouter.get('/current',auth, authorization(), current);

sessionRouter.post('/newPassword', forgetYourPassword);

sessionRouter.post('/forgetYourPassword', verifyForgetYourPassword);

export default sessionRouter
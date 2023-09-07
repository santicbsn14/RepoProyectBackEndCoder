import { Router } from 'express';

import { current, login, signup, forgotYourPassword, changeForgotYourPassword, viewChangePassword, logout} from '../Controllers/sessionController.js';
import auth from '../Middlewares/auth.js';
import authorization from '../Middlewares/authorization.js';
const sessionRouter = Router()

//Routes
sessionRouter.post('/signup', signup);

sessionRouter.post('/login', login );

sessionRouter.delete('/logout', logout);

sessionRouter.get('/current',auth, current);

sessionRouter.post('/forgotYourPassword', forgotYourPassword);

sessionRouter.get('/viewChangePassword', viewChangePassword);

sessionRouter.put('/changeForgotYourPassword', changeForgotYourPassword);

export default sessionRouter
import SessionManager from '../../Domain/Manager/sessionManager.js';
import loginValidation from '../../Domain/Manager/validations/sessionValidation/loginValidation.js';




export const current = async  (req, res, next) =>
{
  try
  {
    
    res.status(200).send({ status: 'Success', payload: req.user });
  }
  catch (error)
  {
		next(error);
  }
};
export const forgetYourPassword = async (req,res, next)=>{
  try {
    let {newPassword, email} = req.body
    const manager = new SessionManager()
    const user = await manager.forgetYourPassword({newPassword,email})
    res.status(201).send({status:'success', message:'Password'})
  } catch (error) {
    next(error)
  }
}

export const signup = async (req, res, next) =>
{
  try
  {
    const manager = new SessionManager();
    const user = await manager.signup(req.body);

    res.status(201).send({ status: 'success', user, message: 'User created.' });
  }
  catch (error)
  {
		next(error);
  }
};






export const login = async (req,res, next)=>
{
    try
    {
        const {email, password} = req.body
        

        await loginValidation.parseAsync(req.body);

        const manager = new SessionManager();
        const accessToken = await manager.login(email, password);
    
        return  res.status(201).send({accessToken, message: 'Login exited'}) 
    }
    catch (error)
    {
        next(error)
    }
}

export const verifyForgetYourPassword = async (req, res, next)=>
{
  try 
  {
    let {email} = req.body
    const manager = new SessionManager();
    await manager.verifyForgetYourPassword({email})
    res.status(201).send({message:'Te hemos enviado un email a tu direccion de correo electronico que ingresaste'})
  } 
  catch (error) 
  {
    next(error)
  }
}
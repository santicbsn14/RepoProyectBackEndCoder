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

export const forgotYourPassword = async (req, res, next)=>
{
  try 
  {
    let {email} = req.body
    const manager = new SessionManager();
    await manager.forgotYourPassword({email})
    res.status(201).send({message:'Te hemos enviado un email a tu direccion de correo electronico que ingresaste'})
  } 
  catch (error) 
  {
    next(error)
  }
};

export const viewChangePassword = async (req,res, next)=>
{
  try
  {
    const manager = new SessionManager()
    let view = await manager.viewChangePassword()
    res.status(200).send(view)
  }
  catch(error)
  {
    console.log(error)
  }

}

export const changeForgotYourPassword = async (req,res, next)=>{
  try {
    let {newPassword, email, confirmPassword, params} = req.body
    let token = params
    const manager = new SessionManager()
    const user = await manager.changeForgotYourPassword({newPassword,email,confirmPassword, token})
    res.status(201).send({status:'success', message:'Password Changed'})
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
        return res.cookie('accessToken', accessToken, {
          maxAge: 60 * 60 * 1000,
          httpOnly: true
      }).status(201).send({status: "success", message: "login exitoso", accessToken});
    }
    catch (error)
    {
        next(error)
    }
};

export const logout = async (req, res) => {
  try
  {
    const manager = new SessionManager();
    const user = await manager.logout();

    res.status(200).send({ status: 'success', message: 'Logout exitoso' });
  } catch (error)
  {
    next(error)
  }

};


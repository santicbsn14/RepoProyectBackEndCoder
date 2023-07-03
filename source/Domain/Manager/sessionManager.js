import {createHash, generateToken, validPassword} from "../../Shared/index.js";
import createUserValidation from "./validations/userValidations/createUserValidation.js";
import updateUserValidation from "./validations/userValidations/updateUserValidation.js"
import { mailForGetPassword } from "../../Shared/mailing.js";
import loginValidation from "./validations/sessionValidation/loginValidation.js";
import container from "../../container.js";

class SessionManager
{
  constructor()
  {
     this.userRepository = container.resolve('UserDao');
  }

  async login(email, password)
  {
    await loginValidation.parseAsync({ email, password });
    const user = await this.userRepository.getUserByEmail(email);
    if(!user)
    {
      throw new Error('User dont exist.');
    }
    
    const isHashedPassword = await validPassword(password, user.password);

    if (!isHashedPassword)
    {
        throw new Error('Login failed, invalid password.');
    }

    return await generateToken(user);
  }

  async signup(payload)
  {
    await createUserValidation.parseAsync(payload);

    const dto = {
      ...payload,
      password: await createHash(payload.password, 10)
    }

    const user  = await this.userRepository.create(dto);

    return { ...user, password: undefined};

  }

  async forgetYourPassword({email, newPassword})
  {
    
    const user = await this.userRepository.getUserByEmail(email)
    const dto = {
      ...user,
      password: await createHash(newPassword, 10)
    }

    let id = user._id
    let uid = id.toString(); // Convertir el ObjectId a una cadena
    await this.userRepository.updateUser(uid, dto)

  }

  async verifyForgetYourPassword({email})
  {


      const verifyUser = await this.userRepository.getUserByEmail(email)
      
      if(verifyUser)mailForGetPassword(email)
      
  
  }
  
}

export default SessionManager;
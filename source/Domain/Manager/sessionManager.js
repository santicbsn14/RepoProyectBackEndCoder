import {createHash, generateToken, validPassword} from "../../Shared/index.js";
import createUserValidation from "./validations/userValidations/createUserValidation.js";
import { mailForGetPassword } from "../../Shared/mailing.js";
import loginValidation from "./validations/sessionValidation/loginValidation.js";
import container from "../../container.js";
import fs from 'fs';
import Handlebars  from "handlebars";
import {resolve} from 'path';

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
    console.log(user)
    const isHashedPassword = await validPassword(password, user.password);

    if (!isHashedPassword)
    {
        throw new Error('Login failed, invalid password.');
    }
    let uid = user.id
    let body = {lastLogin: new Date()}
    await this.userRepository.updateUser(uid, body)
    return await generateToken(user);
  };

  async signup(payload)
  {
    await createUserValidation.parseAsync(payload);

    const dto = {
      ...payload,
      password: await createHash(payload.password, 10)
    }

    const user  = await this.userRepository.create(dto);

    return { ...user, password: undefined};

  };

  async forgotYourPassword({email})
  {
    
      const verifyUser = await this.userRepository.getUserByEmail(email);
      const tokenConfirmation = await generateToken(verifyUser);
      const urlConfirmationToken = `http://localhost:8080/api/session/viewChangePassword/?token=${tokenConfirmation}`
      if(verifyUser)mailForGetPassword(email,urlConfirmationToken);
      
  
  };

  async viewChangePassword()
  {
    const templatePath= resolve('source/Presentation/Templates/changeforgotpassword.hbs')
    const source = fs.readFileSync(templatePath).toString()
    const template = Handlebars.compile(source)
    const html = template()
    return html
  
  }

  async changeForgotYourPassword({email, newPassword,confirmPassword, token})
  {
    if(newPassword===confirmPassword){
    const user = await this.userRepository.getUserByEmail(email)
    const dto = {
      ...user,
      password: await createHash(newPassword, 10)
    }

    let id = user._id
    let uid = id.toString();
    if(token)await this.userRepository.updateUser(uid, dto)
  };
  }

  async automaticUsersDelete()
  {
    const currentDate = new Date();
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(currentDate.getDate() - 2);
    let daysAgo = twoDaysAgo.getDate()
    let users = this.userRepository.getall()
    for(const user of users){
      let uid = user.id
      let lastLogin = user.lastLogin
      if(daysAgo=== lastLogin.getDate()) await this.userRepository.deleteUser(uid)
    }
  }
}

export default SessionManager;
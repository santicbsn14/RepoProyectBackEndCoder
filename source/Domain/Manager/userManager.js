import createUserValidation from "./validations/userValidations/createUserValidation.js"
import updateUserValidation from "./validations/userValidations/updateUserValidation.js";
import emailValidation from "./validations/emailValidations.js";
import idValidation from "./validations/idValidations.js";
import container from "../../container.js";

class userManager{
    constructor(){
        this.dao= container.resolve('UserDao')
    }


    async getall(criteria) 
    {
      return this.dao.getall(criteria);
    }


    async getuserById(id)
    {
        await idValidation.parseAsync({id})
        return this.dao.getuserById(id)
    }
    
    
    async getUserByEmail(email) 
    {
        await emailValidation.parseAsync({email})
        return this.dao.getUserByEmail(email);
    }
    
    
    async create(body) 
    {
      await createUserValidation.parseAsync(body)
      return this.dao.create(body);
    }
    
    
    async deleteUser(uid) 
    {
        return this.dao.deleteUser(uid);
    }
    
    
    async updateUser(uid, body) 
    {
      await updateUserValidation.parseAsync({...body, uid})
      return this.dao.updateUser(uid,body);
    }

    async automaticUsersDelete()
    {
      const currentDate = new Date();
      const twoDaysAgo = new Date();
      let body = {status: false}
      twoDaysAgo.setDate(currentDate.getDate() - 2);
      let daysAgo = twoDaysAgo.getDate()
      let users = this.userRepository.getall()
      for(const user of users){
        let uid = user.id
        let lastLogin = user.lastLogin
        if(daysAgo=== lastLogin.getDate())  await this.dao.updateUser(uid, body)
      }
    }
}
export default userManager

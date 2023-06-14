import userMongooseDao from "../dao/usermongoosedao.js"; 
import createUserValidation from "../validations/userValidations/createUserValidation.js"
import updateUserValidation from "../validations/userValidations/updateUserValidation.js";
import emailValidation from "../validations/emailValidations.js";
import idValidation from "../validations/idValidations.js";

class userManager{
    constructor(){
        this.dao= new userMongooseDao()
    }


    async getall({limit}) 
    {
      return this.dao.paginate({limit});
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
      await updateUserValidation.parseAsync({...body, id})
      return this.dao.updateuser(uid,body);
    }
}
export default userManager

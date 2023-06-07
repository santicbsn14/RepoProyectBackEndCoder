import userMongooseDao from "../dao/usermongoosedao.js";
import createUserValidation from "../validations/userValidations/createUserValidation.js"
import { createHash } from "../utils/index.js";
import updateUserValidation from "../validations/userValidations/updateUserValidation.js";
import emailValidation from "../validations/emailValidations.js";
import idValidation from "../validations/idValidations.js";

class userManager{
    constructor(){
        this.dao= new userMongooseDao()
    }
    async getall({limit}) {
      try {
        return this.dao.getall({limit});
      } catch (error) {
        console.log(error)
      }
        
      }
    async getuserById(id){
  
        await idValidation.parseAsync({id})
        return this.dao.getuserById(id)
    }
      async getuserbyemail(email) {
        await emailValidation.parseAsync({email})
        return this.dao.getuserbyemail(email);
      }
      async create(body) {
        try {
          await createUserValidation.parseAsync(body)
          return this.dao.create(body);

        } catch (error) {
          console.log(error)
        }
      }
      async deleteuser(uid) {
        return this.dao.deleteuser(uid);
      }
      async updateuser(uid, body) {
        await updateUserValidation.parseAsync({...body, id})
        return this.dao.updateuser(uid,body);
      }
}
export default userManager

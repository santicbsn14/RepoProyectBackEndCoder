import userMongooseDao from "../dao/usermongoosedao.js";

class userManager{
    constructor(){
        this.dao= new userMongooseDao()
    }
    async getall({limit}) {
        return this.dao.getall({limit});
      }
      async getuserbyemail(email) {
        return this.dao.getuserbyemail(email);
      }
      async create(body) {
        try {
          return this.dao.create(body);
        } catch (error) {
          console.log(error)
        }
      }
      async deleteuser(uid) {
        return this.dao.deleteuser(uid);
      }
      async updateuser(uid, body) {
        return this.dao.updateuser(uid,body);
      }
}
export default userManager

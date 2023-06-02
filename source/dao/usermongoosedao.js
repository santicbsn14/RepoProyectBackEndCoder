import userSchema from "../models/userSchema.js";
import { createHash } from "../utils/index.js";
class userMongooseDao {
  async getall({limit, sort}) {
    let query = userSchema.find();

    if (limit) {
      query = query.limit(limit);
    }

    if (sort) {
      query = query.sort({ price: sort }); 
    }
    const listusers = await query;
    return listusers.map((user) => ({
        firstname:user.firstname,
        lastname: user.lastname,
        email: user.email,
        age: user.age,
        password: user.password
    }));
  }
  async getuserbyemail(emailuser) {
    const user = await userSchema.findOne({email: emailuser});
    if(!user){
      throw new Error(`User dont exist`)
    }
    return user
  }
  async create(body) {
    try {
      const user = await userSchema.create(body);
      return {
          firstname:user.firstname,
          lastname: user.lastname,
          email: user.email,
          age: user.age,
          password: user.password
      };
    } catch (error) {
      console.log(error)
    }

  }

  async deleteuser(pid) {
    console.log(pid)
    return await userSchema.deleteOne({ _id: pid });
  }
  async updateuser(pid, body) {
    try {
      console.log(pid);
      let user = await userSchema.findByIdAndUpdate({ _id: pid }, body, {
        new: true,
      });
      return  {
        firstname:user.firstname,
        lastname: user.lastname,
        email: user.email,
        age: user.age,
        password: user.password
      };

    } catch (error) {
      console.log(error)
    }

  }
}
export default userMongooseDao;
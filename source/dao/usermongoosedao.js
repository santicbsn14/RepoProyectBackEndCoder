import userSchema from "../Models/userSchema.js";

class userMongooseDao{
  async getall({limit, sort}) {
    try
    {
      let query = userSchema.find();

    if (limit) {
      query = query.limit(limit);
    }

    if (sort) {
      query = query.sort({ price: sort }); 
    }
    const listusers = await query;
    return listusers.map((user) => ({
        id: user._id,
        firstname:user.firstname,
        lastname: user.lastname,
        email: user.email,
        age: user.age,
        password: user.password
    }));
    }
    catch (error)
    {
      throw new Error(error)
    }
    
  }


  async getUserByEmail(emailuser)
  {
    try {
      const user = await userSchema.findOne({email: emailuser});
      if(!user){
        throw new Error(`User dont exist`)
      }
      return user
    }
    catch(error)
    {
      throw new Error(error)
    }
  }


  async create(body)
  {
    try
    {
      const user = await userSchema.create(body);
      return {
          firstname:user.firstname,
          lastname: user.lastname,
          email: user.email,
          age: user.age,
          password: user.password
      };
    }
    catch (error)
    {
      throw new Error('Error')
    }
  }


  async getUserById(id)
  {
    try
    {
      const user = await userSchema.findById({_id: id})
      return{
        firstname:user.firstname,
        lastname: user.lastname,
        email: user.email,
        age: user.age
      };
    }
    catch (error)
    {
      throw new Error({error: error.message})
    }
  }


  async deleteUser(pid)
  {
    try
    {
      return await userSchema.deleteOne({ _id: pid });
    }
    catch (error)
    {
      throw new Error({error: error.message})
    }
  }


  async updateUser(pid, body)
  {
    try
    {
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

    }
    catch (error)
    {
      throw new Error({error: error.message})
    }

  }
}
export default userMongooseDao;
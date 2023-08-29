import mongoose from 'mongoose'

class DbMongoose{
    async init()
    {
        try {
            this.connection = await mongoose.connect(process.env.DB_URI,{
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
        } catch (error) {
            console.log(error)
        }

    }
    async close()
    {
        await this.connection.disconnect()
    }
    async drop()
    {
      await this.connection.db.dropDatabase();
    }
}
export default DbMongoose
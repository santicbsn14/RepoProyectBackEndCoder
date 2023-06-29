import mongoose from 'mongoose'

class DbMongoose{
    async init()
    {
        this.connection = await mongoose.connect(process.env.DB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }
    async close()
    {
        await this.connection.disconnect()
    }
}
export default DbMongoose
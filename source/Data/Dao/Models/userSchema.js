import mongoose,  { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const usercollection = 'users'

const userSchema = new Schema({
    firstname:{type: Schema.Types.String, required: true},
    lastname: {type: Schema.Types.String, required: true},
    email: {type: Schema.Types.String, unique:true, required: true},
    age: {type: Schema.Types.Number, required: true},
    role: { type: Schema.Types.ObjectId, index: true, ref: 'roles', default:null },
    isAdmin: { type: Schema.Types.Boolean, default: false },
    password: {type: Schema.Types.String, required: true}
})
userSchema.plugin(paginate)
 export default mongoose.model(usercollection, userSchema)
import mongoose,  { Schema } from "mongoose";
import paginate from  'mongoose-paginate-v2'
const productscollection = 'products'

const productModel= new Schema({
    title:{type:Schema.Types.String , required: true},
    description:{type:Schema.Types.String , required: true},
    price:{type:Schema.Types.Number , required: true},
    img:[{type: Schema.Types.String, required: true}],
    code:{type:Schema.Types.String , required: true},
    stock: {type:Schema.Types.Number , required: true},
    status: {type:Schema.Types.Boolean , required: true},
    owner:{type:Schema.Types.ObjectId, ref:'users', default:'64efc3e4510894d950d87fe7'},
    category:{type:Schema.Types.String , required: true}
})
productModel.plugin(paginate)
export default mongoose.model(productscollection, productModel)
import mongoose,  { Schema } from "mongoose";
import paginate from  'mongoose-paginate-v2'
const productscollection = 'products'

const productModel= new Schema({
    title:{type:Schema.Types.String , require: true},
    description:{type:Schema.Types.String , require: true},
    price:{type:Schema.Types.Number , require: true},
    code:{type:Schema.Types.String , require: true},
    stock: {type:Schema.Types.String , require: true},
    status: {type:Schema.Types.Boolean , require: true},
    category:{type:Schema.Types.String , require: true}
})
productModel.plugin(paginate)
export default mongoose.model(productscollection, productModel)
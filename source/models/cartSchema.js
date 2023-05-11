import { ObjectId } from "mongodb";
import mongoose,  { Schema } from "mongoose";
const cartscollection = 'carts'

const cartModel = new Schema({
    products: {
        type : [{
            id:{
                type:  ObjectId,
                require: true
            },
            quantity:{
                type: Number,
                require: true
            },
        }],
        required:[true, 'Debe ser ingresado algun producto']
    }
})

export default mongoose.model(cartscollection, cartModel)
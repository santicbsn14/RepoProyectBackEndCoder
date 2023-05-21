import { ObjectId } from "mongodb";
import mongoose,  { Schema } from "mongoose";
const cartscollection = 'carts'

const cartModel = new Schema({
    products: [{
      id: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Schema.Types.Number, default: 0 }
    }]
  });

export default mongoose.model(cartscollection, cartModel)
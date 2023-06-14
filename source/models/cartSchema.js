

import mongoose,  { Schema } from "mongoose";
const cartscollection = 'carts'

const cartModel = new Schema({
    products: [{
      _id: { type: Schema.Types.ObjectId, ref: 'products' },
      quantity: { type: Schema.Types.Number, default: 0 }
    }]
  })


export default mongoose.model(cartscollection, cartModel) 
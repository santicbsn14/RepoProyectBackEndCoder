

import mongoose,  { Schema } from "mongoose";
import paginate from  'mongoose-paginate-v2';
const cartscollection = 'carts'

const cartModel = new Schema({
  user:{ type: Schema.Types.ObjectId, ref: 'users' },
    products: [{
      _id: { type: Schema.Types.ObjectId, ref: 'products', required: true },
      quantity: { type: Schema.Types.Number, required: true }
    }]
  })

cartModel.plugin(paginate)
export default mongoose.model(cartscollection, cartModel) 
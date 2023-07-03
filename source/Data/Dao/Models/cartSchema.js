

import mongoose,  { Schema } from "mongoose";
import paginate from  'mongoose-paginate-v2';
const cartscollection = 'carts'

const cartModel = new Schema({
    products: [{
      _id: { type: Schema.Types.ObjectId, ref: 'products' },
      quantity: { type: Schema.Types.Number, default: 0 }
    }]
  })

cartModel.plugin(paginate)
export default mongoose.model(cartscollection, cartModel) 
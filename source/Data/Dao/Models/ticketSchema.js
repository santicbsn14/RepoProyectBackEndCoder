import mongoose,  { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const ticketcollection = 'tickets'

const ticketSchema = new Schema({
    code: {type: Schema.Types.String, required: true},
    purchaseDatetime: {type: Schema.Types.Date,  required: true},
    amount: {type: Schema.Types.Number, required: true},
    purchaser: { type: Schema.Types.ObjectId, required:true, ref:'users' }
})
ticketSchema.plugin(paginate)
 export default mongoose.model(ticketcollection, ticketSchema)
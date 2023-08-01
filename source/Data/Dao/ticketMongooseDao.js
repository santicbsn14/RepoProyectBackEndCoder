import ticketSchema from './Models/ticketSchema.js';

class ticketMongooseDao
{
  async paginate(criteria)
  {
    const { limit, page } = criteria;
    const ticketDocuments = await ticketSchema.paginate({}, { limit, page });

    ticketDocuments.docs = ticketDocuments.docs.map(ticketDocument => ({
        
            firstname: ticketDocument.firstname,
            code: ticketDocument.code,
            purchaseDatetime: ticketDocument.purchaseDatetime,
            amount: ticketDocument.amount,
            purchaser: ticketDocument.purchaser
        
    }));

    return ticketDocuments;
  }

  async getOne(id)
  {
    const ticketDocument = await ticketSchema.findOne({ _id: id }).populate('purchaser')

    if(!ticketDocument)
    {
      throw new Error('ticket dont exist.');
    }

    return {
        firstname:ticketDocument.firstname,
        code: ticketDocument.code,
        purchaseDatetime: ticketDocument.purchaseDatetime,
        amount: ticketDocument.amount,
        purchaser: ticketDocument.purchaser
    }
  }

  async create(data)
  {
    const ticketDocument = await ticketSchema.create(data);
    
    return {
        id: ticketDocument._id,
        code: ticketDocument.code,
        purchaseDatetime: ticketDocument.purchaseDatetime,
        amount: ticketDocument.amount,
        purchaser: ticketDocument.purchaser
    }
  }

  async updateOne(id, data)
  {
    const ticketDocument = await ticketSchema.findOneAndUpdate({ _id: id }, data, { new: true});

    if(!ticketDocument)
    {
      throw new Error('ticket dont exist.');
    }

    return {
        firstname:ticketDocument.firstname,
        code: ticketDocument.code,
        purchaseDatetime: ticketDocument.purchaseDatetime,
        amount: ticketDocument.amount,
        purchaser: ticketDocument.purchaser
    }
  }

  async deleteOne(id)
  {
    return ticketSchema.deleteOne({ _id: id });
  }
}

export default ticketMongooseDao;
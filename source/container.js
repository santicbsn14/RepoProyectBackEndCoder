import dotenv from 'dotenv'
dotenv.config()
import { createContainer, asClass, Lifetime } from 'awilix'
import userMongooseDao from './Data/Dao/userMongooseDao.js'
import RoleMongooseDao from './Data/Dao/roleMongooseDao.js'
import productMongooseDao from './Data/Dao/productMongooseDao.js'
import cartMongooseDao from './Data/Dao/cartMongooseDao.js'
import ticketMongooseDao from './Data/Dao/ticketMongooseDao.js'

const container = createContainer()

container.register('UserDao', asClass(userMongooseDao), {lifetime: Lifetime.SINGLETON});

container.register('RoleDao', asClass(RoleMongooseDao ), {lifetime: Lifetime.SINGLETON});

container.register('ProductDao', asClass(productMongooseDao ), {lifetime: Lifetime.SINGLETON});

container.register('CartDao', asClass(cartMongooseDao ), {lifetime: Lifetime.SINGLETON});

container.register('TicketDao', asClass(ticketMongooseDao ), {lifetime: Lifetime.SINGLETON});

export default container

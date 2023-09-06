import { Router } from "express";

import {
  getall,
  getOne,
  save,
  update,
  deleteOne,
} from "../Controllers/productController.js";
import auth from "../Middlewares/auth.js";
import authorization from "../Middlewares/authorization.js"

const productsRouter = Router();

productsRouter.get('/', getall);

productsRouter.get('/:pid', getOne);

productsRouter.post('/',auth, authorization('saveProduct'),  save);

productsRouter.put('/:pid', auth, authorization('updateProduct'), update);

productsRouter.delete('/:pid',auth, authorization('deleteProduct'), deleteOne);

export default productsRouter;

import { Router } from "express";

import {
  getall,
  getOne,
  save,
  update,
  deleteOne,
} from "../controllers/productcontroller.js";
import auth from "../Middlewares/auth.js";

const productsRouter = Router();

productsRouter.get("/", getall);

productsRouter.get("/:pid",  getOne);
productsRouter.post(`/`, auth, save);
productsRouter.put(`/:pid`, auth, update);
productsRouter.delete(`/:pid`,auth, deleteOne);

export default productsRouter;

import { Router } from "express";
import ProductManager from "../Manager/ProductManager.js";
import {
  getall,
  getone,
  save,
  update,
  deleteone,
} from "../controllers/productcontroller.js";
import auth from "../middlewares/auth.js";

const productsRouter = Router();

productsRouter.get("/", getall);

productsRouter.get("/:pid", auth, getone);
productsRouter.post(`/`, auth, save);
productsRouter.put(`/:pid`, auth, update);
productsRouter.delete(`/:pid`,auth, deleteone);

export default productsRouter;

import { Router } from "express";
import ProductManager from "../Manager/ProductManager.js";
import {
  getall,
  getone,
  save,
  update,
  deleteone,
} from "../controllers/productcontroller.js";
const productManager = new ProductManager();
const userRouter = Router();

userRouter.get("/", getall);
userRouter.get("/:uid", getone);
userRouter.post(`/`, save);
userRouter.put(`/:uid`, update);
userRouter.delete(`/:uid`, deleteone);

export default userRouter;



// export default sessionRouter
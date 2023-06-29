import { Router } from "express";
import auth from "../Middlewares/auth.js";
import { getOneById, getall, save, update, deleteOne } from "..//controllers/userController.js";

const userRouter = Router();

userRouter.get("/", getall);

userRouter.get("/:uid", getOneById);

userRouter.post('/', save);

userRouter.put(`/:uid`, auth, update);

userRouter.delete(`/:uid`,auth,  deleteOne);

export default userRouter;



// export default sessionRouter
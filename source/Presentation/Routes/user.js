import { Router } from "express";
import auth from "../Middlewares/auth.js";
import { getOneById, getall, save, update, deleteOne } from "../Controllers/userController.js";

const userRouter = Router();

userRouter.get("/", auth, getall);

userRouter.get("/:uid", getOneById);

userRouter.post('/',  authorization('saveUser'), save);

userRouter.put(`/:uid`, auth,  authorization('updateUser'), update);

userRouter.delete(`/:uid`,auth, authorization('deleteUser'),  deleteOne);

export default userRouter;




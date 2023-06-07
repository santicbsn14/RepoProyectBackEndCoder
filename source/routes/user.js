import { Router } from "express";
import auth from "../middlewares/auth.js";
import { getonebyId, getall, save, update, deleteone } from "../controllers/usercontroller.js";

const userRouter = Router();

userRouter.get("/", getall);
userRouter.get("/:uid", getonebyId);
userRouter.post(`/`, save);
userRouter.put(`/:uid`, update);
userRouter.delete(`/:uid`,  deleteone);

export default userRouter;



// export default sessionRouter
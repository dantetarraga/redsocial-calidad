import { Router } from "express";
import publicacionController from "../controllers/publicacion.js";

const userRouter = Router()


userRouter.post("/create", publicacionController.createUser);
userRouter.put("/update/:id", publicacionController.updateUser);
userRouter.delete("/delete/:id", publicacionController.deleteUser);

export default publicacionRouter;
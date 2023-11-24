import { Router } from "express";
import messageController from "../controllers/mensaje.js";

const mensajeRouter = Router();

mensajeRouter.post("/", messageController.createMessage);
mensajeRouter.get("/", messageController.getAllMessage);

export default mensajeRouter;

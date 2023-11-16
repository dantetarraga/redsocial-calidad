import { Router } from "express";
import conversacionesController from "../controllers/conversations.js";

const conversationRouter = Router();

conversationRouter.post("/create", conversacionesController.crearConversacion);
conversationRouter.get("/users/:userId", conversacionesController.obtenerConversacionesUsuario);
conversationRouter.get("/:conversationId", conversacionesController.obtenerConversacionPorId);

export default conversationRouter;

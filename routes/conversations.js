const express = require("express");
const conversacionesController = require("../controllers/conversations.js");

const conversationRouter = express.Router();

conversationRouter.post("/create", conversacionesController.crearConversacion);
conversationRouter.get(
  "/users/:userId",
  conversacionesController.obtenerConversacionesUsuario
);
conversationRouter.get(
  "/:conversationId",
  conversacionesController.obtenerConversacionPorId
);

module.exports = conversationRouter;

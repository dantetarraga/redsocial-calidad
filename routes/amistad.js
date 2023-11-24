const Router = require("express").Router;
const amistadController = require("../controllers/amistad.js");

const amistadRouter = Router();

amistadRouter.post("/agregar-amigo", amistadController.agregarAmigo);
amistadRouter.post("/enviar-solicitud", amistadController.enviarSolicitud);
amistadRouter.post("/rechazar-solicitud", amistadController.rechazarSolicitud);

module.exports = amistadRouter;

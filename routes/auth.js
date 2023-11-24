const authController = require("../controllers/auth.js");
const Router = require("express").Router;

const authRouter = Router();

authRouter.post("/iniciar-sesion", authController.iniciarSesion);
authRouter.post("/registrar", authController.registrarUsuario);

module.exports = authRouter;

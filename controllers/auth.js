const generarToken = require("../utils/authToken.js");
const Usuario = require("../models/userModel.js");

class authController {
  static async iniciarSesion(req, res) {
    const { correo, contrasena } = req.body;

    try {
      const usuario = await Usuario.findOne({ correo: correo });

      if (!usuario) req.status(401).json({ error: "Credenciales invalidas" });
      if (contrasena !== usuario.contrasena)
        return res.status(401).json({ error: "Credenciales invalidas" });

      const token = generarToken(usuario._id);

      return res.send({ token, correo: usuario.correo });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error al iniciar sesion", message: error.message });
    }
  }

  static async registrarUsuario(req, res) {
    try {
      const fotoPerfil = "public/default-img.webp";
      const nuevoUsuario = new Usuario({
        ...req.body,
        foto_perfil: fotoPerfil,
      });

      await nuevoUsuario.save();
      return res.status(201).json({ Usuario: nuevoUsuario });
    } catch (error) {
      return res.status(500).json({
        error: "Error al registrar el usuario",
        message: error.message,
      });
    }
  }
}

module.exports = authController;

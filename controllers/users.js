const Usuario = require("../models/userModel.js");
const fs = require("fs");

class userController {
  static async createUser(req, res) {
    const nuevoUsuario = new Usuario({ ...req.body });
    const usuarioInsertado = await nuevoUsuario.save();
    return res.status(201).json(usuarioInsertado);
  }

  static async actualizarFotoPerfil(req, res) {
    const usuarioId = req.params.usuarioId;
    try {
      if (!req.file)
        return res
          .status(400)
          .json({ error: "Por favor, seleccione una imagen." });

      const foto = req.file;
      const rutaFoto = `public/uploads/${usuarioId}/foto-perfil/${foto.filename}`;
      const usuario = await Usuario.findByIdAndUpdate(usuarioId, {
        foto_perfil: rutaFoto,
      });

      if (usuario && usuario.foto_perfil !== "public/default-img.webp") {
        const rutaFotoAnterior = usuario.foto_perfil;
        fs.unlinkSync(rutaFotoAnterior);
      }

      return res.status(200).json({
        mensaje: "Foto de perfil actualizada con éxito",
        usuario: usuario,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error interno del servidor", message: error.message });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const allUsers = await Usuario.find();
      return res.status(200).json(allUsers);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener los usuarios" });
    }
  }

  static async getUser(req, res) {
    try {
      const user = await Usuario.findById(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Error al actualizar el usuario" });
    }
  }

  static async deleteUser(req, res) {
    try {
      const usuarioEliminado = await Usuario.findByIdAndDelete(id);

      return res.status(200).json(usuarioEliminado);
    } catch (error) {
      return res.status(500).json({ error: "Error al actualizar el usuario" });
    }
  }

  static async updateUser(req, res) {
    const { id } = req.params;
    const updatedUserData = req.body;

    try {
      await Usuario.updateOne({ _id: id }, updatedUserData);
      const updatedUser = await Usuario.findById(id);

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: "Error al actualizar el usuario" });
    }
  }

  static async getUsersByName(req, res) {
    const nombre = req.params.nombre;

    if (!nombre) {
      return res.status(400).json({ error: "Se debe proporcionar un nombre" });
    }

    try {
      const users = await Usuario.find({ nombre: nombre });

      if (users.length === 0) {
        return res.status(404).json({ error: "No se encontraron usuarios" });
      }

      return res.status(200).json(users);
    } catch {
      res.status(500).json({ error: "Error al buscar usuarios" });
    }
  }
}

module.exports = userController;

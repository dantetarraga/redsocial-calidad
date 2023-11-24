const jwt = require("jsonwebtoken");
const PublicacionModel = require("../models/publicacionModel.js");
const { ComentarioModel } = require("../models/comentarioModel.js");
const { ReaccionModel } = require("../models/reaccionModel.js");
const { Reacciones } = require("../utils/global.js");

//import { Publicacion } from '../models/PublicacionModel.js';
class publicacionController {
  static async createUser(req, res) {
    const nuevaPublicacion = new Publicacion({ ...req.body });
    const PublicacionInsertada = await nuevoUsuario.save();
    return res.status(201).json(PublicacionInsertada);
  }

  static async getAllPublicacion(req, res) {
    try {
      const publicaciones = await PublicacionModel.find({});
      return res.status(200).json(publicaciones);
    } catch (error) {
      return res.status(500).json({ error: "Error al actualizar publicacion" });
    }
  }

  static async getPublicacion(req, res) {
    const token = req.headers.authorization.split(" ")[1];

    if (!token)
      return res.status(401).json({ error: "No se ha enviado el token" });

    try {
      jwt.verify(token, process.env.SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ error: "Token inválido" });
      });
      const publicacion = await Publicacion.findById(req.params.id);
      return res.status(200).json(publicacion);
    } catch (error) {
      return res.status(500).json({ error: "Error al actualizar el usuario" });
    }
  }

  static async createPublicacion(req, res) {
    try {
      const { usuario, fecha, descripcion } = req.body;
      console.log({ usuario, fecha, descripcion });
      const publicacion = new PublicacionModel({ usuario, fecha, descripcion });

      const publicacionCreada = await publicacion.save();
      return res.status(200).json(publicacionCreada);
    } catch (error) {
      return res.status(500).json({ error: "Error al crear publicacion" });
    }
  }

  static async updatePublicacion(req, res) {
    try {
      const { id, descripcion } = req.body;
      console.log({ id, descripcion });

      const publicacion = await PublicacionModel.findByIdAndUpdate(id, {
        descripcion,
      });
      publicacion.descripcion = descripcion;
      return res.status(200).json(publicacion);
    } catch (error) {
      return res.status(500).json({ error: "Error al actualizar publicacion" });
    }
  }

  static async reactedPublicacion(req, res) {
    try {
      const { id, usuario, fecha, reaccion } = req.body;
      console.log({ id, usuario, fecha, reaccion });

      if (!Reacciones[reaccion]) {
        throw new Error("La reaccion no esta definida en la red social");
      }

      const reaccionM = new ReaccionModel({
        usuario,
        fecha,
        reaccion: Reacciones[reaccion],
      });

      const publicacion = await PublicacionModel.findByIdAndUpdate(
        id,
        { $push: { reacciones: reaccionM } },
        { new: true, useFindAndModify: false }
      );
      return res.status(200).json(publicacion);
    } catch (error) {
      return res.status(500).json({
        error: "Error al reaccionar publicacion",
        message: error.message,
      });
    }
  }

  static async commentPublicacion(req, res) {
    try {
      const { id, usuario, fecha, comentario } = req.body;
      console.log({ id, usuario, fecha, comentario });

      const comentarioM = new ComentarioModel({ usuario, fecha, comentario });

      const publicacion = await PublicacionModel.findByIdAndUpdate(
        id,
        { $push: { comentarios: comentarioM } },
        { new: true, useFindAndModify: false }
      );
      return res.status(200).json(publicacion);
    } catch (error) {
      return res.status(500).json({
        error: "Error al comentar publicacion",
        message: error.message,
      });
    }
  }

  static async deletePublicacion(req, res) {
    try {
      const { id } = req.params;
      console.log({ id });
      const publicacionEliminada = await PublicacionModel.findByIdAndDelete(id);

      return res.status(200).json(publicacionEliminada);
    } catch (error) {
      return res.status(500).json({ error: "Error al eliminar publicacion" });
    }
  }

  static async getPubliacionesByName(req, res) {
    const usuario = req.params.usuario;

    if (!usuario) {
      return res.status(400).json({ error: "Se debe proporcionar un nombre" });
    }

    try {
      const publicaciones = await Publicacion.find({ usuario: usuario });

      if (Publicaciones.length === 0) {
        return res
          .status(404)
          .json({ error: "No se encontraron publicaciones" });
      }

      return res.status(200).json(publicaciones);
    } catch {
      res.status(500).json({ error: "Error al buscar publicaciones" });
    }
  }
}

module.exports = publicacionController;

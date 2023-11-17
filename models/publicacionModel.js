// PublicacionModel.js
import db from "../conexion/conexion.js";
import mongoose from "mongoose";
import { esquemaComentario } from "../models/comentarioModel.js";
import { esquemaReaccion } from "../models/reaccionModel.js";

const esquemaPublicacion = mongoose.Schema({
  usuario: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  comentarios: [esquemaComentario],
  reacciones: [esquemaReaccion],
});

const Publicacion = db.model("publicacion", esquemaPublicacion);

export default Publicacion;

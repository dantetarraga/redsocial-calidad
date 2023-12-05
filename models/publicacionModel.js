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
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
  },
  tipoFile: {
    type: String,
  },
  comentarios: [esquemaComentario],
  reacciones: [esquemaReaccion],
});

const Publicacion = db.model("publicacion", esquemaPublicacion);

export default Publicacion;

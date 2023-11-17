// PublicacionModel.js
import db from "../conexion/conexion.js";
import mongoose from "mongoose";

const esquemaComentario = mongoose.Schema({
  usuario: {
    type: String,
  },
  fecha: {
    type: String,
  },
  comentario: {
    type: String,
  },
});

const ComentarioModel = db.model("comentario", esquemaComentario);

export { esquemaComentario, ComentarioModel };

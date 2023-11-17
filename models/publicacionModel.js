// PublicacionModel.js
import db from "../conexion/conexion.js";
import mongoose from "mongoose";

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
  reacciones: [String],
  comentarios: [String],
});

const Publicacion = db.model("publicacion", esquemaPublicacion);

export default Publicacion;

// PublicacionModel.js
const db = require("../conexion/conexion.js");
const mongoose = require("mongoose");
const { esquemaComentario } = require("../models/comentarioModel.js");
const { esquemaReaccion } = require("../models/reaccionModel.js");

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

module.exports = Publicacion;

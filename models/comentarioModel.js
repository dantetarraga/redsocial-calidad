// PublicacionModel.js
const mongoose = require("mongoose");
const db = require("../conexion/conexion.js");

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

module.exports = { esquemaComentario, ComentarioModel };

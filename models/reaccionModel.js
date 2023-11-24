// PublicacionModel.js
const mongoose = require("mongoose");
const db = require("../conexion/conexion.js");

const esquemaReaccion = mongoose.Schema({
  usuario: {
    type: String,
  },
  fecha: {
    type: String,
  },
  reaccion: {
    type: String,
  },
});

const ReaccionModel = db.model("reaccion", esquemaReaccion);

module.exports = { esquemaReaccion, ReaccionModel };

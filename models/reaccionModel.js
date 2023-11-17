// PublicacionModel.js
import db from "../conexion/conexion.js";
import mongoose from "mongoose";

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

export { esquemaReaccion, ReaccionModel };

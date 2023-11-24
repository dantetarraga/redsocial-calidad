import db from "../conexion/conexion.js";
import mongoose from "mongoose";

const mensajeSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  mensaje: {
    type: String,
    required: true,
  },
});

const Mensaje = db.model("mensaje", mensajeSchema);

export default Mensaje;

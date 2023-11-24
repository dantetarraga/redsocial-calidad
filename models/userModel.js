// models/bookModel.js
const mongoose = require("mongoose");

const esquemaUsuario = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  fecha_registro: {
    type: String,
    default: () => new Date().toISOString(),
  },
  fecha_nacimiento: {
    type: String,
  },
  contrasena: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
  },
  amigos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
  ],
  solicitudes_amistad: [
    {
      usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
      },
      estado: {
        type: String,
        enum: ["pendiente", "aceptado"],
        default: "pendiente",
        required: true,
      },
    },
  ],
  foto_perfil: {
    type: String,
  },
});

const Usuario = mongoose.model("Usuario", esquemaUsuario);

module.exports = Usuario;

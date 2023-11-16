// PublicacionModel.js
import mongoose from 'mongoose';

const esquemaPublicacion = new mongoose.Schema({
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
});

const Publicacion = mongoose.model("Publicacion", esquemaPublicacion);

export {Publicacion};

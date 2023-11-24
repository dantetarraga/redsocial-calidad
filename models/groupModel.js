import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId, // Cambio aquí a un ObjectId para el creador
        ref: 'Usuario',
        required: true
    },
    miembros: [{
        type: mongoose.Schema.Types.ObjectId, // Cambio aquí a un array de ObjectId para los miembros
        ref: 'Usuario',
        required: true
    }],
 })
 
 const Grupo = mongoose.model('grupo', groupSchema);
 
 export {
    Grupo
 }
 
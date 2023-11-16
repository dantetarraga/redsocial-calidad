import mongoose from 'mongoose';

const esquemaConversaciones = new mongoose.Schema({
  participantes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario'
    }
  ],
  mensajes: [
    {
      senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
      },
      receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
      },
      messageText: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const Conversacion = mongoose.model('Conversacion', esquemaConversaciones);

export { Conversacion };

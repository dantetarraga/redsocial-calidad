import MensajeModel from "../models/mensajeModel.js";

class messageController {
  static async getAllMessage(req, res) {
    try {
      const messages = await MensajeModel.find({});
      return res.status(200).json(messages);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  static async createMessage(req, res) {
    try {
      const { nombre, mensaje } = req.body;
      console.log({ nombre, mensaje });
      const mensajeM = new MensajeModel({ nombre, mensaje });

      const mensajeCreada = await mensajeM.save();
      //console.log("socketio", req.socketio);
      req.socketio.emit("mensaje", { nombre, mensaje });
      return res.status(200).json(mensajeCreada);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default messageController;

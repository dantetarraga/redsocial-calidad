const Usuario = require("../models/userModel.js");

class AmistadController {
  static async agregarAmigo(req, res) {
    try {
      const usuarioId = req.body.usuarioId;
      const amigoId = req.body.amigoId;
      const estado = req.body.estado;

      const usuario = await Usuario.findById(usuarioId);
      const amigo = await Usuario.findById(amigoId);

      if (!usuario || !amigo)
        return res.status(404).json({ error: "Usuario no encontrado" });

      if (!amigo.amigos.includes(usuarioId) && estado == "aceptado") {
        usuario.amigos.push(amigoId);
        amigo.amigos.push(usuarioId);
        amigo.solicitudes_amistad = amigo.solicitudes_amistad.filter(
          (solicitud) => solicitud.usuario != usuarioId
        );
        usuario.save();
        amigo.save();
      }

      return res.status(200).json({
        mensaje: "Amigo agregado con exito",
        usuario: usuario,
        amigo: amigo,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error al agregar amigo", mensaje: error.message });
    }
  }

  static async enviarSolicitud(req, res) {
    try {
      const emisorId = req.body.emisorId;
      const receptorId = req.body.receptorId;

      const emisor = await Usuario.findById(emisorId);
      const receptor = await Usuario.findById(receptorId);

      if (!emisor || !receptor)
        return res.status(404).json({ error: "Usuario no encontrado" });

      if (
        !receptor.amigos.includes(emisorId) &&
        !emisor.amigos.includes(receptorId) &&
        !receptor.solicitudes_amistad.find(
          (solicitud) => solicitud.usuario == emisorId
        )
      ) {
        receptor.solicitudes_amistad.push({ usuario: emisorId });
        await receptor.save();
      }

      return res.status(200).json({
        mensaje: "Solicitud de amistad enviada con éxito",
        usuario: receptor,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Error al enviar solicitud de amistad",
        mensaje: error.message,
      });
    }
  }

  static async rechazarSolicitud(req, res) {
    try {
      const usuarioId = req.body.usuarioId;
      const solicitudId = req.body.solicitudId;
      const estado = req.body.estado;

      const usuario = await Usuario.findById(usuarioId);

      if (!usuario)
        return res.status(404).json({ error: "Usuario no encontrado" });

      if (
        usuario.solicitudes_amistad.find(
          (solicitud) => solicitud.usuario == solicitudId
        ) &&
        estado === "rechazado"
      ) {
        usuario.solicitudes_amistad = usuario.solicitudes_amistad.filter(
          (solicitud) => solicitud.usuario != solicitudId
        );
        usuario.save();
      }

      return res.status(200).json({
        mensaje: "Solicitud de amistad rechazada con exito",
        usuario: usuario,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Error al rechazar solicitud de amistad",
        mensaje: error.message,
      });
    }
  }
}

module.exports = AmistadController;

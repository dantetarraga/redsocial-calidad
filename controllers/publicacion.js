import jwt from 'jsonwebtoken';
import { Publicacion } from '../models/PublicacionModel.js';
class publicacionController {
    static async createUser(req, res) {
        const nuevaPublicacion = new Publicacion({ ...req.body });
        const PublicacionInsertada = await nuevoUsuario.save();
        return res.status(201).json(PublicacionInsertada);
    }

    static async getAllPublicacion(req, res) {
        const token = req.headers.authorization.split(' ')[1]

        if (!token)
            return res.status(401).json({ error: 'No se ha enviado el token' })

        try {
            jwt.verify(token, process.env.SECRET, async (err, decoded) => {
                if (err)
                    return res.status(403).json({ error: 'Token inválido' })
            })

            const allPublicaciones = await Publicacion.find();
            return res.status(200).json(allPublicaciones);

        } catch (error) {
            return res.status(500).json({ error: "Error al actualizar publicacion" });
        }
    }

    static async getPublicacion(req, res) {
        const token = req.headers.authorization.split(' ')[1]

        if (!token)
            return res.status(401).json({ error: 'No se ha enviado el token' })

        try {
            jwt.verify(token, process.env.SECRET, async (err, decoded) => {
                if (err)
                    return res.status(403).json({ error: 'Token inválido' })
            })
            const publicacion = await Publicacion.findById(req.params.id);
            return res.status(200).json(publicacion);
        } catch (error) {
            return res.status(500).json({ error: "Error al actualizar el usuario" });
        }

    }

    static async deletePublicacion(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        const { id } = req.params;

        if (!token)
            return res.status(401).json({ error: 'No se ha enviado el token' })

        try {
            jwt.verify(token, process.env.SECRET, async (err, decoded) => {
                if (err)
                    return res.status(403).json({ error: 'Token inválido' })
            })

            // Recupera el usuario actualizado
            const publicacionEliminada = await Usuario.findByIdAndDelete(id);

            return res.status(200).json(publicacionEliminada);
        } catch (error) {
            return res.status(500).json({ error: "Error al actualizar publicacion" });
        }

    }

    static async updatePublicacion(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        const { id } = req.params;
        const updatedPublicacionData = req.body;

        if (!token)
            return res.status(401).json({ error: 'No se ha enviado el token' })

        try {
            jwt.verify(token, process.env.SECRET, async (err, decoded) => {
                if (err)
                    return res.status(403).json({ error: 'Token inválido' })

                // Actualiza el usuario en la base de datos
                await Publicacion.updateOne({ _id: id }, updatedPublicacionData);
            })

            // Recupera el usuario actualizado
            const updatedPublicacion = await Publicacion.findById(id);

            return res.status(200).json(updatedPublicacion);
        } catch (error) {
            return res.status(500).json({ error: "Error al actualizar publicacion" });
        }
    }

    static async getPubliacionesByName(req, res) {
        const usuario = req.params.usuario;

        if (!usuario) {
            return res.status(400).json({ error: "Se debe proporcionar un nombre" });
        }

        try {
            const publicaciones = await Publicacion.find({ usuario: usuario });

            if (Publicaciones.length === 0) {
                return res.status(404).json({ error: "No se encontraron publicaciones" });
            }

            return res.status(200).json(publicaciones);
        } catch {
            res.status(500).json({ error: "Error al buscar publicaciones });
        }
    }
}

export default publicacionController;
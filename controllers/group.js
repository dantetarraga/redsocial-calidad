import jwt from 'jsonwebtoken';
import {Grupo} from '../models/groupModel.js'


class groupController {
   static async createGroup (req, res){
       const dataGroup = new Grupo ({...req.body});
       const groupInsert = await dataGroup.save();
       return res.status(201).json(groupInsert);
   }

   static async getAllGroups(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) return res.status(401).json({ error: 'No se ha enviado el token' })

        try {
            jwt.verify(token, process.env.SECRET, async (err) => {
                if (err) return res.status(403).json({ error: 'Token inválido' })
            })

            const groups = await Grupo.find();
            return res.status(200).json(groups);

        } catch (error) {
            return res.status(500).json({ error: "Error" });
        }
    }

    static async deleteGroup(req, res) {
        const { id } = req.params;
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'No se ha enviado el token' });

        try {
            jwt.verify(token, process.env.SECRET, async (err, decoded) => {
                if (err) return res.status(403).json({ error: 'Token inválido' });

                const group = await Grupo.findById(id);
                if (!group) return res.status(404).json({ error: 'Grupo no encontrado' });

                // Lógica de votación para eliminar el grupo (simplemente como ejemplo)
                const votes = req.body.votes || 0;
                if (votes >= 3) { // Suponiendo que 1se necesita al menos 3 votos para eliminar
                    await Grupo.findByIdAndDelete(id);
                    return res.status(200).json({ message: 'Grupo eliminado con éxito' });
                } else {
                    return res.status(403).json({ error: 'No hay suficientes votos para eliminar el grupo' });
                }
            });
        } catch (error) {
            return res.status(500).json({ error: "Error" });
        }
    }

    static async editGroup(req, res) {
        const { id } = req.params;
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'No se ha enviado el token' });

        try {
            jwt.verify(token, process.env.SECRET, async (err, decoded) => {
                if (err) return res.status(403).json({ error: 'Token inválido' });

                const group = await Grupo.findById(id);
                if (!group) return res.status(404).json({ error: 'Grupo no encontrado' });

                /*
                // Verificar si el usuario actual es el creador del grupo
                if (decoded.userId !== group.creador) {
                    return res.status(403).json({ error: 'No tienes permiso para editar este grupo' });
                }
                */
                // Actualizar el grupo con los datos enviados en el cuerpo de la solicitud
                await Grupo.findByIdAndUpdate(id, { $set: req.body });
                return res.status(200).json({ message: 'Grupo editado con éxito' });
            });
        } catch (error) {
            return res.status(500).json({ error: "Error" });
        }
    }

    static async getGroupByName(req, res) {
        const { groupName } = req.params;
        try {
            const group = await Grupo.findOne({ nombre: groupName });
            if (!group) return res.status(404).json({ error: 'Grupo no encontrado' });
            return res.status(200).json(group);
        } catch (error) {
            return res.status(500).json({ error: "Error" });
        }
    }

    static async getGroupById(req, res) {
        const { id } = req.params;
        try {
            const group = await Grupo.findById(id);
            if (!group) return res.status(404).json({ error: 'Grupo no encontrado' });
            return res.status(200).json(group);
        } catch (error) {
            return res.status(500).json({ error: "Error" });
        }
    }

    
    static async addMember(req, res) {
        const { id } = req.params; // ID del grupo
        const { userId } = req.body; // ID del usuario a agregar al grupo

        try {
            const grupo = await Grupo.findById(id);
            if (!grupo) {
                return res.status(404).json({ error: 'Grupo no encontrado' });
            }

            // Verifica si el usuario ya es miembro del grupo para evitar duplicados
            const isMember = grupo.miembros.includes(userId);
            if (isMember) {
                return res.status(400).json({ error: 'El usuario ya es miembro del grupo' });
            }

            // Agrega el ID del usuario a la lista de miembros del grupo
            grupo.miembros.push(userId);
            await grupo.save();

            return res.status(200).json({ message: 'Usuario agregado al grupo correctamente' });
        } catch (error) {
            return res.status(500).json({ error: "Error al agregar usuario al grupo" });
        }
    }
}



export default groupController;
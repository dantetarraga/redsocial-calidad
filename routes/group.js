import { Router } from "express";
import groupController from "../controllers/group.js";

const groupRouter = Router();

groupRouter.post("/create", groupController.createGroup);
groupRouter.get("/all", groupController.getAllGroups);
groupRouter.delete("/:id/delete", groupController.deleteGroup); // Eliminar un grupo por ID mediante votación
groupRouter.put("/:id/edit", groupController.editGroup); // Editar un grupo por ID (solo por el creador)
groupRouter.get("/byname/:groupName", groupController.getGroupByName); // Obtener un grupo por nombre
groupRouter.get("/:id", groupController.getGroupById); // Obtener un grupo por ID
groupRouter.post("/:id/add-member", groupController.addMember); // Añadir un usuario a un grupo

export default groupRouter;

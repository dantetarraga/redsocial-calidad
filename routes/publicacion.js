import { Router } from "express";
import publicacionController from "../controllers/publicacion.js";

const publicacionRouter = Router();

publicacionRouter.post("/create", publicacionController.createPublicacion);
//publicacionRouter.put("/update/:id", publicacionController.updateUser);
publicacionRouter.delete(
  "/delete/:id",
  publicacionController.deletePublicacion,
);

export default publicacionRouter;

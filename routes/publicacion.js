import { Router } from "express";
import publicacionController from "../controllers/publicacion.js";
import upload from "../storage/index.js";

const publicacionRouter = Router();

publicacionRouter.post(
  "/create",
  upload,
  publicacionController.createPublicacion,
);
publicacionRouter.delete(
  "/delete/:id",
  publicacionController.deletePublicacion,
);
publicacionRouter.put("/update", publicacionController.updatePublicacion);
publicacionRouter.get("/", publicacionController.getAllPublicacion);
publicacionRouter.post("/reacted", publicacionController.reactedPublicacion);
publicacionRouter.post("/comment", publicacionController.commentPublicacion);

export default publicacionRouter;

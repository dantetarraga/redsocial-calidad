const Router = require("express").Router;
const publicacionController = require("../controllers/publicacion.js");

const publicacionRouter = Router();

publicacionRouter.post("/create", publicacionController.createPublicacion);
publicacionRouter.delete(
  "/delete/:id",
  publicacionController.deletePublicacion
);
publicacionRouter.put("/update", publicacionController.updatePublicacion);
publicacionRouter.get("/", publicacionController.getAllPublicacion);
publicacionRouter.post("/reacted", publicacionController.reactedPublicacion);
publicacionRouter.post("/comment", publicacionController.commentPublicacion);

module.exports = publicacionRouter;

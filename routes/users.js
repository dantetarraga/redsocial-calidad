const Router = require("express").Router;
const userController = require("../controllers/users.js");
const multer = require("multer");
const fs = require("fs");

const userRouter = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const usuarioId = req.params.usuarioId;
    const carpetaUsuario = `public/uploads/${usuarioId}/foto-perfil/`;

    fs.mkdirSync(carpetaUsuario, { recursive: true });

    cb(null, carpetaUsuario);
  },
  filename: (req, file, cb) => {
    const usuarioId = req.params.usuarioId;
    const uniqueSuffix = Date.now() + "-" + usuarioId;
    const extension = file.originalname.split(".").pop();
    cb(null, `perfil-${uniqueSuffix}.${extension}`);
  },
});

const upload = multer({ storage: storage });

userRouter.patch(
  "/:usuarioId/actualizar-foto",
  upload.single("foto_perfil"),
  userController.actualizarFotoPerfil
);
userRouter.get("/all", userController.getAllUsers);
userRouter.get("/:id", userController.getUser);
userRouter.get("/name/:nombre", userController.getUsersByName);
userRouter.post("/create", userController.createUser);
userRouter.put("/update/:id", userController.updateUser);
userRouter.delete("/delete/:id", userController.deleteUser);

module.exports = userRouter;

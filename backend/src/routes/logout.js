import express from "express"; // framework web para Node.js
import loginController from "../controllers/loginController.js"; // controlador de login

const router = express.Router(); // creamos un router de Express


router
  .route("/") // definimos la ruta raíz para login/logout
  .post(loginController.logout);

  export default router; // exportamos el router para usarlo en app.js
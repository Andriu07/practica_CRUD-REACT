import express from "express"; // framework web para Node.js
import productsController from "../controllers/productsController.js"; // controlador de productos


const router = express.Router(); // creamos un router de Express


router.route("/")
.get(productsController.getProducts)
.post(productsController.postProduct);

router.route("/:id")
.get(productsController.getProductById)
.put(productsController.putProduct)  
.delete(productsController.deleteProduct);

export default router; // exportamos el router para usarlo en app.js

import Product from "../models/products.js"; // Modelo de productos

import HttpResponses from "../traits/HttpResponses.js"; // manejador de respuestas HTTP

const productsController = {}; // objeto controlador para productos

// Controlador para manejar la ruta GET /api/products
productsController.getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // obtenemos todos los productos
    return HttpResponses.ok(res, products, "Productos obtenidos correctamente"); // respondemos con los productos y mensaje de éxito
  } catch (error) {
     // manejamos errores inesperados con un 500
       console.log("error" + error)
     return res.status(500).json({message: "Internal server error"});
  }
};

// Controlador para manejar la ruta GET /api/products/:id
productsController.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // obtenemos el producto por ID
    if (!product) { // si no existe el producto, respondemos con un 404
      return HttpResponses.notFound(res, "Producto no encontrado");
    }
    return HttpResponses.ok(res, product, "Producto obtenido correctamente"); // respondemos con el producto y mensaje de éxito
  } catch (error) {
    // manejamos errores inesperados con un 500
     console.log("error" + error)
     return res.status(500).json({message: "Internal server error"});
  }
};

// Controlador para manejar la ruta POST /api/products
productsController.postProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.validatedBody; // obtenemos los datos
    const newProduct = new Product({ name, description, price, stock }); // creamos una nueva instancia del producto con los datos recibidos
    const savedProduct = await newProduct.save(); // guardamos el producto

    if (savedProduct) { // si se guardó correctamente, respondemos con un 201
   return res.status(201).json({message: "producto creado correctamente"});
    }
  } catch (error) { // manejamos errores inesperados con un 500
   console.log("error" + error)
   return res.status(500).json({message: "error al crear el producto"});
  }
};

// Controlador para manejar la ruta PUT /api/products/:id
productsController.putProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate( // actualizamos el producto por ID con los datos validados
      req.params.id, // ID del producto a actualizar
      req.validatedBody, // datos validados para actualizar el producto
      { new: true }, // opción para devolver el documento actualizado en lugar del original
    );
    if (!updatedProduct) {// si no existe el producto, respondemos con un 404
       return res.status(404).json({message: "producto no encontrado"});
    }
     // respondemos con el producto actualizado y mensaje de éxito
      return res.status(200).json({message: "producto actualizado exitosamente"});
  } catch (error) {
    console.log("error" + error)
    return res.status(500).json({message: "Internal server error"});
  }
};

productsController.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id); // eliminamos el producto por ID
    if (!deletedProduct) { // si no existe el producto, respondemos con un 404
     return res.status(404).json({message: "producto no encontrado"});
    }
    // respondemos con el producto eliminado y mensaje de éxito
    return res.status(200).json({message: "producto eliminado exitosamente"});
  } catch (error) {
   // manejamos errores inesperados con un 500
   console.log("error" + error)
     return res.status(500).json({message: "Internal server error"});
  }
};

export default productsController; // exportamos el controlador para usarlo en las rutas

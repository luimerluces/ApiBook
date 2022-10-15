const express = require("express");
const ensureToken = require("../middleware/middleware");
const router = express.Router();
const controllerHelloWorld = require("../controller/HelloWorld");
const controllerBook = require("../controller/Book");
const controllerUser = require("../controller/User");
router.get("/api/HelloWorld",controllerHelloWorld.HelloWorld);
///Controlador Libro
router.get("/api/ListarLibros",controllerBook.ListarLibros);
router.get("/api/BuscarLibro/:idLibro",controllerBook.BuscarLibro);
router.get("/api/BuscarLibroISBN/:ISBN",controllerBook.BuscarLibroISBN);
router.post("/api/AddNewBook",controllerBook.AddNewBook);
router.put("/api/UpdateBook",controllerBook.UpdateBook);
router.delete("/api/InactivarBook/:idLibro",controllerBook.InactivarBook);
///Controlador User
router.post("/api/Login",controllerUser.Login);
router.post("/api/RegistrarUsuario",controllerUser.RegistrarUsuario);
module.exports = router;
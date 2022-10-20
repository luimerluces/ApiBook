const express = require("express");
const ensureToken = require("../middleware/middleware");
const router = express.Router();
const controllerHelloWorld = require("../controller/HelloWorld");
const controllerBook = require("../controller/Book");
const controllerUser = require("../controller/User");
router.get("/api/HelloWorld",controllerHelloWorld.HelloWorld);
///Controlador Libro
router.get("/api/ListarLibros",ensureToken.ensureToken,controllerBook.ListarLibros);
router.get("/api/BuscarLibro/:idLibro",ensureToken.ensureToken,controllerBook.BuscarLibro);
router.get("/api/BuscarLibroISBN/:ISBN",ensureToken.ensureToken,controllerBook.BuscarLibroISBN);
router.post("/api/AddNewBook",ensureToken.ensureToken,controllerBook.AddNewBook);
router.put("/api/UpdateBook",ensureToken.ensureToken,controllerBook.UpdateBook);
router.delete("/api/InactivarBook/:idLibro",ensureToken.ensureToken,controllerBook.InactivarBook);
///Controlador User
router.post("/api/Login",controllerUser.Login);
router.post("/api/RegistrarUsuario",controllerUser.RegistrarUsuario);
module.exports = router;
const express = require('express');
const router = express.Router();
const categoriaControlador = require('../controladores/categoriaContolador');

//Obtener todas las categorias existentes
// /categorias
router.get('/', categoriaControlador.obtenerCategorias);

module.exports = router;
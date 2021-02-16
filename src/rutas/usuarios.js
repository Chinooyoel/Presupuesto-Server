const express = require("express");
const router = express.Router();
const usuarioControlador = require('../controladores/usuarioControlador');
const { check } = require('express-validator');


//crear usuario
// /usuarios
router.post('/',[
    check('nombre', "El concepto es obligatorio").not().isEmpty().trim(),
    check('password', "El monto es obligatorio").not().isEmpty().trim(),
    check('email', "La fecha es obligatoria").not().isEmpty().trim(),
    check('email', "El email no cumple con el formato").isEmail()
], 
usuarioControlador.crearUsuario);


module.exports = router;
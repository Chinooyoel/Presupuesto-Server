const express = require('express');
const router = express.Router();
const authControlador = require('../controladores/authControlador');
const { check } = require('express-validator');
const { validarToken } = require('../middleware/auth');

//Validar credenciales
// /auth
router.post('/', [
    check('email', 'El email es obligatorio').not().isEmpty().trim(),
    check('password', 'El password es obligatorio').not().isEmpty().trim(),
], authControlador.validarCredenciales);

//obtener el usuario autenticado
// /auth/token
router.get('/', validarToken, authControlador.usuarioAutenticado);


module.exports = router;
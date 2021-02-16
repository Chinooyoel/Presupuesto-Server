const express = require('express');
const router = express.Router();
const operacionControlador = require('../controladores/operacionControlador');
const { check, param } = require('express-validator');
const { validarToken } = require("../middleware/auth")

// Obtener todos los operaciones
// /operaciones
router.get('/obtener/:limite', validarToken,
[
    param("limite", "El limite no es un numero").isNumeric(),
]
,operacionControlador.obtenerOperaciones);

// Guarda una operacion
// /operaciones/crear
router.post('/crear', validarToken,
[
    check('concepto', "El concepto es obligatorio").not().isEmpty().trim(),
    check('fecha', "La fecha es obligatoria").not().isEmpty().trim(),
    check('monto', "El monto es obligatorio").not().isEmpty().trim(),
    check('monto', "El monto no es un numero").isNumeric(),
    check('categoria', "La categoria es obligatoria").not().isEmpty().trim(),
    check('tipo', "El tipo es obligatorio").not().isEmpty().trim(),
    check('tipo', "El tipo debe ser 'EGRESO' o 'INGRESO'").isIn(["INGRESO", "EGRESO"])
], 
operacionControlador.crearOperacion);


// Eliminar una operacion
// /operaciones/:id
router.delete('/:id', validarToken, operacionControlador.eliminarOperacion);


// Actualizar el monto de una operacion
// /operaciones/:id
router.put('/:id', validarToken,
[
    check('monto', "El monto es obligatorio").not().isEmpty().trim(),
    check('monto', "El monto no es un numero").isNumeric(),
],
operacionControlador.actualizarOperacion);


// Obtener el balance de las operaciones
// /operaciones/balance
router.get('/balance', validarToken, operacionControlador.obtenerBalance);

module.exports = router;
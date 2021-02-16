const Usuario = require('../modelos/Usuario');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');
const { semilla } = require('../config/variables');

exports.crearUsuario = async ( req, res ) => {
    //comprobamos si hubo errores en las validaciones
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ msg: errores.array() });
    }


    try {
        const { nombre, email, password } = req.body;

        //verificamos que el email no esta registrado
        const usuarioRegistrado = await Usuario.findOne({email});

        if( usuarioRegistrado ){
            return res.status(400).json({
                msg: 'El email ya esta registrado'
            })
        }

        //hasheamos la password
        const hash = await bcrypt.hash(password, 5)

        const usuario = new Usuario({
            nombre,
            email,
            password: hash
        });

        //guardamos al usuario
        const usuarioCreado = await usuario.save();

        //creamos el token
        const token = jwt.sign({ 
            _id: usuarioCreado._id
        }, semilla, { expiresIn: '24h'});


        res.json({
            token
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            msg: "No se pudo registrar el usuario, intente mas tarde"
        })
    }
}
const jwt = require('jsonwebtoken');
const Usuario = require('../modelos/Usuario');
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");
const { semilla } = require('../config/variables');

exports.validarCredenciales = async ( req, res ) => {
    //comprobamos si hubo errores en las validaciones
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ msg: errores.array() });
    }

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({email: email});

        //comprobamos si existe el usuario
        if(!usuario) {
            return res.status(400).json({
                msg: "Credenciadas invalidas"
            })
        }
        
        //validamos la password
        const passwordCorrecta = await bcrypt.compare(password, usuario.password);

        if(!passwordCorrecta){
            return res.status(400).json({
                msg: "Credenciadas invalidas"
            })
        }

        //creamos el token
        const token = jwt.sign({ 
            _id: usuario._id,
        }, semilla, { expiresIn: '24h'});

        //retornamos el token
        res.json({
            token
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            msg: "Error interno. Intente mas tarde"
        })
    }

}


exports.usuarioAutenticado = async (req, res) => {

    try {
        const { nombre, email } = await Usuario.findOne({_id: req.usuario});

        res.json({
            usuario: {
                nombre,
                email
            }
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            msg: "Error interno. Intente mas tarde"
        })
    }

}
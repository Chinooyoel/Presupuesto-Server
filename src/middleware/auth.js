const jwt = require("jsonwebtoken");
const { semilla } = require("../config/variables");

exports.validarToken = ( req, res, next ) => {
    const token = req.header('x-auth-token');

    //validamos la existencia del token
    if(!token) {
        return res.status(401).json({msg: 'No hay Token, permiso no valido'})
    }

    try {
        //verificamos el token
        const cifrado = jwt.verify(token, semilla);

        //guardamos el id del usuario en la peticion
        req.usuario = cifrado._id;
        next();

    } catch (error) {
        res.status(401).json({msg: "Token no es valido"})
    }
}
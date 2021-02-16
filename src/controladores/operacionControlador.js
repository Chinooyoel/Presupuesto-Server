const Operacion = require('../modelos/Operacion');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose')

//obtener todos las operaciones
exports.obtenerOperaciones = async ( req, res ) => {
    //comprobamos si hubo errores en las validaciones
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ msg: errores.array() });
    }

    const limite = Number(req.params.limite);
    const categoria = req.query.categoria;

    try {
        let operaciones;
        //si no eligio categoria
        if( !categoria ){

            operaciones = await Operacion.find({ usuarioId: req.usuario },{},{ sort: { fecha: -1 }, limit: limite});

        } else{
            //busqueda por categoria
            operaciones = await Operacion.find({categoria: categoria, usuarioId: req.usuario},{},{ sort: { fecha: -1 }, limit:limite});
        }
        res.json({
            operaciones
        });

    } catch (error) {
        console.log(error)

        res.status(500).json({
            msg: "No se pudo obtener las operaciones, intente mas tarde"
        })
    }
}

//crear un operacion
exports.crearOperacion = async ( req, res ) => {
    //comprobamos si hubo errores en las validaciones
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ msg: errores.array() });
    }

    try {
        //guardamos la operacion y le asignamos el id del usuario loguiado
        const operacion = new Operacion({...req.body, usuarioId: req.usuario});
        const operacionCreada = await operacion.save();

        res.json({
            msg: "Se creo correctamente",
            operacion: operacionCreada
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            msg: "No se pudo crear la operacion, intente mas tarde"
        })
    }

}

//actualizar un operacion por id
exports.actualizarOperacion = async ( req, res ) => {
     //comprobamos si hubo errores en las validaciones
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ msg: errores.array() });
    }


    const idOperacion = req.params.id;
    const { monto } = req.body;

    try {
        //buscamos la operacion
        const operacion = await Operacion.findById({_id: idOperacion});

        if( !operacion ) {
            return res.status(404).json({
                msg: 'No se encuentra dicha operacion'
            })
        }


        //validamos que la operacion le pertenezca al usuario loguiado
        if( req.usuario !== operacion.usuarioId.toString() ){
            return res.status(401).json({ msg: 'No autorizado'})
        }

        //actualizamos la operacion
        const operacionActualizada = await Operacion.findByIdAndUpdate({_id: idOperacion}, { monto }, {new: true});

        res.json({
            msg: 'Operacion actualizada correctamente',
            operacion: operacionActualizada
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            msg: "No se pudo actualizar la operacion, intente mas tarde"
        })
    }
}

//eliminar un operacion por id
exports.eliminarOperacion = async ( req, res ) => {
    const idOperacion = req.params.id;

    try {
        //buscamos la operacion
        const operacion = await Operacion.findById({_id: idOperacion});

        if( !operacion ) {
            return res.status(404).json({
                msg: 'No se encuentra dicha operacion'
            })
        }

        //validamos que la operacion le pertenezca al usuario loguiado
        if( req.usuario !== operacion.usuarioId.toString() ){
            return res.status(401).json({ msg: 'No autorizado'})
        }

        //borramos la operacion
        await Operacion.findByIdAndDelete({_id: idOperacion})

        res.json({
            msg: 'Operacion eliminada correctamente'
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            msg: "No se pudo eliminar la operacion, intente mas tarde"
        })
    }
}

//obtener el balance de las operaciones
exports.obtenerBalance = async ( req, res ) => {

    try {
        //traemos la suma de ingresos 
        const ingresos = await Operacion.aggregate([
            {
                $match: { tipo: "INGRESO", usuarioId: mongoose.Types.ObjectId(req.usuario) }
            },
            {
                $group : {
                    _id: null,
                    totalSuma: { $sum: "$monto"},
                }
            }
        ]);

        //traemos la suma de egresos
        const egresos = await Operacion.aggregate([
            {
                $match: { tipo: "EGRESO", usuarioId: mongoose.Types.ObjectId(req.usuario) }
            },
            {
                $group : {
                    _id: null,
                    totalSuma: { $sum: "$monto"},
                }
            }
        ]);

        let balance = 0;

        console.log( egresos, ingresos, " hola")

        //si existen operacion de ingresos, sumamos al balance
        if( ingresos.length !== 0 ){
            balance += ingresos[0].totalSuma;
        }

        //si existen operacion de egresos, restamos al balance
        if(  egresos.length !== 0 ){
            balance -= egresos[0].totalSuma
        }

        res.json({
            balance
        })
        
    } catch (error) {
        console.log(error)

        res.status(500).json({
            msg: "No se pudo obtener el balance"
        })
    }
}
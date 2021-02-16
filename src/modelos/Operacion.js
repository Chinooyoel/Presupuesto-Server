const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const OperacionSchema = new Schema({
    fecha: {
        type: Date,
        required: true
    },
    concepto: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true,
        enum: ["COMIDA", "SUELDO", "SEGURO", "ROPA", "TRANSPORTE", "SERVICIOS"]
    },
    tipo: {
        type: String,
        required: true,
        enum: ['INGRESO', 'EGRESO']
    },
    monto: {
        type: Number,
        required: true,
    },
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    }
})

module.exports = mongoose.model('operaciones', OperacionSchema);
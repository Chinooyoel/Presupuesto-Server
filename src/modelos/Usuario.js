const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const UsuarioSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("Usuario", UsuarioSchema);
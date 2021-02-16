const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const conectarDB = require('./config/db');
const cors = require('cors');
const { puerto } = require('./config/variables');

//conectamos a la base de datos
conectarDB();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//no haya problemas de cors
app.use(cors());

//importamos las rutas
app.use('/operaciones', require('./rutas/operaciones.js'));
app.use('/categorias', require('./rutas/categorias.js'));
app.use('/usuarios', require('./rutas/usuarios.js'));
app.use('/auth', require('./rutas/auth.js'));


app.listen(puerto, () => {
    console.log("Server online ", puerto)
})
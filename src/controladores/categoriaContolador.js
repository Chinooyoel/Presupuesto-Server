

exports.obtenerCategorias = (req, res) => {
    res.json({
        categorias: [
            { nombre:'COMIDA' },
            { nombre:'SUELDO' },
            { nombre:'SEGURO' },
            { nombre:'ROPA' },
            { nombre:'TRANSPORTE' },
            { nombre:'SERVICIOS'},
        ]
    })
}
const mongoose = require('mongoose');
const { mongoDB } = require('./variables');

const conectarDB = async () => {
    try {
        await mongoose.connect(mongoDB, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }
        );
        console.log("Base de datos Online")

    } catch (error) {
        console.log(error);
    }
}


module.exports = conectarDB;
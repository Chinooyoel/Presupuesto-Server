
const puerto = process.env.PORT || 8080;

const semilla = process.env.SEMILLA || '1234';

const mongoDB = process.env.MONGODB || 'mongodb://localhost:27017/presupuesto_personal';

module.exports = {
    puerto,
    semilla,
    mongoDB
}
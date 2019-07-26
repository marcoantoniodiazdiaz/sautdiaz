const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let departamentosSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El campo nombre es requerido"]
    },
});


module.exports = mongoose.model('Departamentos', departamentosSchema);
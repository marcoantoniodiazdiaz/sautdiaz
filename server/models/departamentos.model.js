const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let departamentosSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es requerida"]
    }
});


module.exports = mongoose.model('Departamentos', departamentosSchema);
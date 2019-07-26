const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let trabajadoresSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El campo nombre es requerido"]
    },
});


module.exports = mongoose.model('Trabajadores', trabajadoresSchema);
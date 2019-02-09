const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let trabajadoresSchema = new Schema({
    nombre: {
        required: [true, "El nombre es requerido"],
        type: String
    }

});


module.exports = mongoose.model('Trabajadores', trabajadoresSchema);
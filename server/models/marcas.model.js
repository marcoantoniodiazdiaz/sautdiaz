const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let marcasSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es requerido"]
    }
});


module.exports = mongoose.model('Marcas', marcasSchema);
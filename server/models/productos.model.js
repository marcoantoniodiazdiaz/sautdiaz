const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let productosSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es requerida"]
    },
    precio: {
        type: String,
        required: [true, "El precio es requerido"]
    },
    departamento: {
        required: [true, "El departamento es requerido"],
        type: Schema.ObjectId,
        ref: "Departamentos"
    },
    tipo: {
        type: String,
        required: [true, "El tipo es requerido"]
    }
});


module.exports = mongoose.model('Productos', productosSchema);
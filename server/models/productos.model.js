const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let productosSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El campo nombre es requerido"]
    },
    departamento: {
        type: Schema.ObjectId,
        required: [true, "El campo departamento es requerido"],
        ref: "Departamentos"
    },
    codigo: {
        type: String,
        required: [true, "El campo codigo es requerido"]
    },
    precio: {
        type: String,
        required: [true, "El campo precio es requerido"]
    },
    compra: {
        type: String,
        required: [true, "El campo compra es requerido"]
    },
    existencia: {
        type: Number,
        required: [true, "El campo existencia es requerido"]
    }
});



module.exports = mongoose.model('Productos', productosSchema);
const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let detalleSchema = new Schema({
    producto: {
        type: Schema.ObjectId,
        ref: "Productos",
        required: [true, "El producto es requerido"]
    },
    cantidad: {
        type: Number,
        required: [true, "La cantidad es requerida"]
    },
    servicio: {
        type: Schema.ObjectId,
        ref: "Servicios",
        required: [true, "El servicio es requerido"]
    }
});


module.exports = mongoose.model('Detalle', detalleSchema);
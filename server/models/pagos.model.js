const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let pagosSchema = new Schema({
    cantidad: {
        type: Number,
        required: [true, "El nombre es requerida"]
    },
    fecha: {
        type: String,
        required: [true, "La fecha es requerida"]
    },
    servicio: {
        required: [true, "El servicio es requerido"],
        type: Schema.ObjectId,
        ref: "Servicios"
    }
});


module.exports = mongoose.model('Pagos', pagosSchema);
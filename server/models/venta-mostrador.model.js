const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ventaMostradorSchema = new Schema({
    producto: {
        type: Schema.ObjectId,
        required: [true, "El campo producto es requerido"],
        ref: 'Productos'
    },
    cantidad: {
        type: String,
        required: [true, "El campo cantidad es requerido"]
    },
    venta: {
        type: Schema.ObjectId,
        required: [true, "El campo venta es requerido"],
        ref: 'Mostrador'
    },
});


module.exports = mongoose.model('VentaMostrador', ventaMostradorSchema);
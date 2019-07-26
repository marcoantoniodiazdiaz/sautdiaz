const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ventasSchema = new Schema({
    producto: {
        type: Schema.ObjectId,
        required: [true, "El campo producto es requerido"],
        ref: 'Productos'
    },
    cantidad: {
        type: String,
        required: [true, "El campo cantidad es requerido"]
    },
    servicio: {
        type: Schema.ObjectId,
        required: [true, "El campo servicio es requerido"],
        ref: 'Servicios'
    },
});


module.exports = mongoose.model('Ventas', ventasSchema);
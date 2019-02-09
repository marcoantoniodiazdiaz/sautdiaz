const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};


let Schema = mongoose.Schema;


let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'El username es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    direccion: {
        type: String,
        required: false,
        default: "NO ESPECIFICADO"
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    telefono: {
        type: String,
        required: false,
        default: "NO ESPECIFICADO"
    },
    celular: {
        type: String,
        required: false,
        default: "NO ESPECIFICADO"
    }
});


usuarioSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}


usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });


module.exports = mongoose.model('Usuario', usuarioSchema);
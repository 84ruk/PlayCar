
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true,

    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
        default: 'USER_ROLE'
    },
    img: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true,
      },
    token: {
        type: String,
    },
    confirmado: {
        type: Boolean,
        default: false,
    }
    })

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject(); //Quita la v el password 
    usuario.uid = _id;
    
    return usuario;
}
UsuarioSchema.statics.getUserByEmail = async function (email) {
    return await this.findOne({ correo: email });
  };
  
module.exports = model("Usuario", UsuarioSchema);
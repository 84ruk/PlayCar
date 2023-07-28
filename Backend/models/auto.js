const { Schema, model } = require("mongoose");

const AutoSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    categoria: {
        type: String,
        default: "Auto",
        },
    marca: {
        type: String,
        required: [true, "La marca es obligatoria"],
    },
    modelo: {
        type: Number,
        required: [true, "El modelo es obligatorio"],
    },
    descripcion: {
        type: String,
    },
    precio: {
        type: Number,
        required: [true, "El precio es obligatorio"],
        min: 0,
    },
    estado: {
        type: Boolean,
    },
    imagenes: [{
        type: String,
        required: false,
    }],
    fechasReservadas: [{
        type: Schema.Types.ObjectId,
        ref: "FechaReservada"
      }]

})
 
AutoSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
  }

  // Eliminar índice único para el campo "nombre"

module.exports = model("Auto", AutoSchema);
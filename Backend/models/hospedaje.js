const { Schema, model } = require("mongoose");

const HospedajeSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    direccion: {
        calle: String,
        numero: String,
        ciudad: String,
      },
    tipo: {
        type: String,
        enum: ['hotel', 'departamento', 'casa', 'hostal'],
        required: true
      },
    habitaciones: {
        type: Number,
        required: [true, "Las habitaciones son obligatorias"],
    },
    capacidad: {
        type: String,
        required: [true, "La capacidad es obligatoria"],
    },
    descripcion: {
        type: String,
        required: [true, "la descripcion es obligatoria"],
    },
    precio: {
        type: Number,
        required: [true, "El precio es obligatorio"],
        min: 0,
    },
    estado: {
        type: Boolean,
        default: true,
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


HospedajeSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
  } //El estado lo excluia

module.exports = model("Hospedaje", HospedajeSchema);
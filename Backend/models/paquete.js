const { Schema, model } = require("mongoose");

const PaqueteSchema = Schema({
    nombre: {
        type: String,
        /* required: [true, "El nombre es obligatorio"], */
    },
    capacidad: {
        type: String,
    },
    descripcion: {
        type: String,
        /* required: [true, "la descripcion es obligatoria"], */
    },
    precio: {
        type: Number,
        /* required: [true, "El precio es obligatorio"], */
        min: 0,
    },
    estado: {
        type: Boolean,
        default: true,
    },
    imagenes: [{
        type: String,
        required: false,
        default: "no-image.jpg"
    }],
    autos: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Auto'
        }
      ],
      hospedajes: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Hospedaje'
        }
      ],

})

module.exports = model("Paquete", PaqueteSchema);
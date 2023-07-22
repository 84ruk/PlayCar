const { Schema, model } = require("mongoose");


const FechaReservadaSchema = Schema({
    fechaInicio: {
      type: Date,
      required: true
    },
    fechaFin: {
      type: Date,
      required: true
    },
    auto: {
      type: Schema.Types.ObjectId,
      ref: "Auto"
    },
    hospedaje: {
        type: Schema.Types.ObjectId,
        ref: 'Hospedaje'
      },
    paquete: {
        type: Schema.Types.ObjectId,
        ref: 'Paquete'
    }
  });

  
module.exports = model('FechaReservada', FechaReservadaSchema);

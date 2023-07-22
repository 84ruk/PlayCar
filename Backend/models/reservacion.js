const { Schema, model } = require("mongoose");

const ReservacionSchema = Schema({
  cliente: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  fechaInicio: {
    type: Date,
    required: [true, 'La fecha de inicio es obligatoria']
  },
  fechaFin: {
    type: Date,
    required: [true, 'La fecha de fin es obligatoria']
  },
  numeroPersonas: {
    type: Number,
    min: 1,
  },
  autoReservado: {
    type: Schema.Types.ObjectId,
    ref: 'Auto'
  },
  hospedajeReservado: {
    type: Schema.Types.ObjectId,
    ref: 'Hospedaje'
    },
  paqueteReservado: {
    type: Schema.Types.ObjectId,
    ref: 'Paquete'
    },
  fechasReservadas: [{
    type: Schema.Types.ObjectId,
    ref: "FechaReservada"
  }]
});

module.exports = model('Reservacion', ReservacionSchema);

const Reservacion = require("../models/reservacion");
const Auto = require("../models/auto");
const Hospedaje = require("../models/hospedaje");




// Middleware para validar las fechas reservadas
const validarFechasMiddleware = async (req, res, next) => {
  try{
    const { fechaInicio, fechaFin, paqueteReservado, hospedajeReservado, autoReservado } = req.body;

    if (fechaInicio >= fechaFin) {
      return res.status(400).json({ message: 'La fecha de inicio debe ser anterior a la fecha de fin' });
    }

    const hospedaje = await Hospedaje.findById(hospedajeReservado);

    if (!hospedaje) {
      return res.status(404).json({ message: 'El hospedaje no existe' });
    }

    const auto = await Auto.findById(autoReservado);
    if(!auto){
      return res.status(404).json({ message: 'El auto no existe' });
    }

    // Buscar reservaciones que se superpongan con las fechas de la nueva reserva
    const reservasHospedaje = await Reservacion.find({
      hospedajeReservado: hospedajeReservado,
      $or: [
        { fechaInicio: { $gte: fechaInicio, $lte: fechaFin } }, // Verifica si la fecha de inicio está dentro del rango
        { fechaFin: { $gte: fechaInicio, $lte: fechaFin } }, // Verifica si la fecha de fin está dentro del rango
        { fechaInicio: { $lte: fechaInicio }, fechaFin: { $gte: fechaFin } }, // Verifica si el rango está completamente cubierto
      ],
    });

    // Si se encontraron reservaciones que se superpongan, devolver un error
    if (reservasHospedaje.length > 0) {
      return res.status(409).json({ message: 'El hospedaje esta reservado para el rango de fechas seleccionado' });
    }

    const reservasAuto = await Reservacion.find({
      autoReservado: autoReservado,
      $or: [
        { fechaInicio: { $gte: fechaInicio, $lte: fechaFin } }, // Verifica si la fecha de inicio está dentro del rango
        { fechaFin: { $gte: fechaInicio, $lte: fechaFin } }, // Verifica si la fecha de fin está dentro del rango
        { fechaInicio: { $lte: fechaInicio }, fechaFin: { $gte: fechaFin } }, // Verifica si el rango está completamente cubierto
      ],
    });

    if (reservasAuto.length > 0) {
      return res.status(409).json({ message: 'El auto esta reservado para el rango de fechas seleccionado' });
    }

    
/*     
Hacer middleware para paquetes limitados ejemplo tour donde no tenga nada que ver autos ni hospedajes, y no pueden haber dos reservas el mismo dia 
const reservasPaquete = await Reservacion.find({
      paqueteReservado: paqueteReservado,
      $or: [
        { fechaInicio: { $gte: fechaInicio, $lte: fechaFin } }, // Verifica si la fecha de inicio está dentro del rango
        { fechaFin: { $gte: fechaInicio, $lte: fechaFin } }, // Verifica si la fecha de fin está dentro del rango
        { fechaInicio: { $lte: fechaInicio }, fechaFin: { $gte: fechaFin } }, // Verifica si el rango está completamente cubierto
      ],
    });
    
    if (reservasPaquete.length > 0) {
      return res.status(409).json({ message: 'Las fechas seleccionadas están dentro del rango de una reserva existente' });
    } */
    // Si ambas validaciones pasan, pasar al siguiente middleware
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocurrió un error al validar las fechas' });
  }
};




  const validarFechasHospedajeMiddleware = async (req, res, next) => {
    try {
      const { fechaInicio, fechaFin, hospedajeReservado } = req.body;
  
      // Validar que la fecha de inicio sea anterior a la fecha de fin
      if (fechaInicio >= fechaFin) {
        return res.status(400).json({ message: 'La fecha de inicio debe ser anterior a la fecha de fin' });
      }
  
      // Esperar a que se resuelva la promesa de findById antes de continuar
      const hospedaje = await Hospedaje.findById(hospedajeReservado);
      if (!hospedaje) {
        return res.status(404).json({ message: 'El hospedaje no existe' });
      }
  
      // Buscar reservaciones que se superpongan con las fechas de la nueva reserva
      const reservasHospedaje = await Reservacion.find({
        hospedajeReservado: hospedajeReservado,
        $or: [
          { fechaInicio: { $gte: fechaInicio, $lte: fechaFin } }, // Verifica si la fecha de inicio está dentro del rango
          { fechaFin: { $gte: fechaInicio, $lte: fechaFin } }, // Verifica si la fecha de fin está dentro del rango
          { fechaInicio: { $lte: fechaInicio }, fechaFin: { $gte: fechaFin } }, // Verifica si el rango está completamente cubierto
        ],
      });
  
      // Si se encontraron reservaciones que se superpongan, devolver un error
      if (reservasHospedaje.length > 0) {
        return res.status(409).json({ message: 'Las fechas seleccionadas están dentro del rango de una reserva existente' });
      }
  
      // Si la validación pasa, pasar al siguiente middleware
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ocurrió un error al validar las fechas del hospedaje' });
    }
  };
  
  
  const validarFechasAutoMiddleware = async (req, res, next) => {
    try {
      const {
        fechaInicio,
        fechaFin,
        autoReservado,
      } = req.body;

      // Validar que la fecha de inicio sea anterior a la fecha de fin
      if (fechaInicio >= fechaFin) {
        return res.status(400).json({ message: 'La fecha de inicio debe ser anterior a la fecha de fin' });
      }
  
      const auto = await Auto.findById(autoReservado);
      if (!auto) {
        return res.status(404).json({ message: 'El auto no existe' });
      }
  
  
      
      // Buscar reservaciones que se superpongan con las fechas de la nueva reserva
      const reservasAuto = await Reservacion.find({
        autoReservado: autoReservado,
        $or: [
          { fechaInicio: { $gte: fechaInicio, $lte: fechaFin } }, // Verifica si la fecha de inicio está dentro del rango
          { fechaFin: { $gte: fechaInicio, $lte: fechaFin } }, // Verifica si la fecha de fin está dentro del rango
          { fechaInicio: { $lte: fechaInicio }, fechaFin: { $gte: fechaFin } }, // Verifica si el rango está completamente cubierto
        ],
      });
  
      if (reservasAuto.length > 0) {
        return res.status(409).json({ message: 'Las fechas seleccionadas están dentro del rango de una reserva existente' });
      }
  
      // Si la validación pasa, pasar al siguiente middleware
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ocurrió un error al validar las fechas del auto' });
    }
  };


  const validarFecha = async (req, res, next) => {
    try {
      const { fechaInicio, fechaFin } = req.body;
      if (fechaInicio >= fechaFin) {
        return res.status(400).json({ message: 'La fecha de inicio debe ser anterior a la fecha de fin' });
      }
      next();
      }
      catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocurrión un error al validar las fechas' });
      }
      }


  module.exports = {
    validarFecha,
    validarFechasMiddleware,
    validarFechasAutoMiddleware,
    validarFechasHospedajeMiddleware,
  };
  
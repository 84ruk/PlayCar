const Reservacion = require("../models/reservacion");
const Auto = require("../models/auto");
const Hospedaje = require("../models/hospedaje");




// Middleware para validar las fechas reservadas
const validarFechasMiddleware = async (req, res, next) => {
    try {
      const {
        fechaInicio,
        fechaFin,
        hospedajeReservado,
        autoReservado,
      } = req.body;
      
      const hospedaje = await Hospedaje.findById( hospedajeReservado );
      if(!hospedaje){
        return res.status(404).json({ message: 'El hospedaje no existe' });
      }
      
      const auto = await Auto.findById( autoReservado );
      if(!auto){
        return res.status(404).json({ message: 'El auto no existe' });
      }
  
      // Verificar si el hospedaje está reservado en el rango de fechas especificado
      const reservasHospedaje = await Reservacion.find({
        hospedajeReservado,
        fechaInicio: { $lte: fechaFin },
        fechaFin: { $gte: fechaInicio },
      });
  
      if (reservasHospedaje.length > 0) {
        return res
          .status(409)
          .json({ message: 'El hospedaje no está disponible en el rango de fechas especificado' });
      }
  
      // Verificar si el auto está reservado en el rango de fechas especificado
      const reservasAuto = await Reservacion.find({
        autoReservado,
        fechaInicio: { $lte: fechaFin },
        fechaFin: { $gte: fechaInicio },
      });
  
      if (reservasAuto.length > 0) {
        return res
          .status(409)
          .json({ message: 'El auto no está disponible en el rango de fechas especificado' });
      }
  
      // Si ambas validaciones pasan, pasar al siguiente middleware
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ocurrió un error al validar las fechas' });
    }
  };
  
  
  
  const validarFechasHospedajeMiddleware = async (req, res, next) => {
    try {
      const {
        fechaInicio,
        fechaFin,
        hospedajeReservado,
      } = req.body;

      const hospedaje = await Hospedaje.findById(hospedajeReservado);
      if (!hospedaje) {
        return res.status(404).json({ message: 'El hospedaje no existe' });
      }

      // Validar que la fecha de inicio sea anterior a la fecha de fin
      if (fechaInicio >= fechaFin) {
        return res.status(400).json({ message: 'La fecha de inicio debe ser anterior a la fecha de fin' });
      }
      
        // Verificar si el hospedaje está disponible en el rango de fechas especificado
        const reservasHospedaje = await Reservacion.find({
          hospedajeReservado: hospedajeReservado,
          fechaInicio: { $lte: fechaFin },
          fechaFin: { $gte: fechaInicio },
        });
        
  

      if (reservasHospedaje) {
        return res.status(409).json({ message: 'El hospedaje no está disponible en el rango de fechas especificado' });
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
  
      const auto = await Auto.findById(autoReservado);
      if (!auto) {
        return res.status(404).json({ message: 'El auto no existe' });
      }
  
      // Validar que la fecha de inicio sea anterior a la fecha de fin
      if (fechaInicio >= fechaFin) {
        return res.status(400).json({ message: 'La fecha de inicio debe ser anterior a la fecha de fin' });
      }
  
      // Verificar si el auto está disponible en el rango de fechas especificado
      const reservaAuto = await Reservacion.findOne({
        autoReservado: autoReservado,
        fechaInicio: { $lte: fechaFin },
        fechaFin: { $gte: fechaInicio },
      });
  
      if (reservaAuto) {
        return res.status(409).json({ message: 'El auto no está disponible en el rango de fechas especificado' });
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
  
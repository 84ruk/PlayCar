const { response } = require("express");
const Reservacion = require("../models/reservacion"); 
const Auto = require("../models/auto"); 
const Hospedaje = require("../models/hospedaje");
const FechaReservada = require("../models/fecha-reservada");
const Paquete = require("../models/paquete");
const usuario = require("../models/usuario");


const crearReservacionHospedaje = async (req, res = response) => {
  try {
    const {
      cliente,
      fechaInicio,
      fechaFin,
      numeroPersonas,
      hospedajeReservado
    } = req.body;

    const existeCliente = await usuario.findById(cliente);

      if(!existeCliente){

        return res.status(404).json({ message: 'El usuario no existe' });

      }


    const reservacion = new Reservacion({
      cliente,
      fechaInicio,
      fechaFin,
      numeroPersonas,
      hospedajeReservado,
    });

    console.log('===============================', hospedajeReservado)
    const rangosFechasReservadas = [{
      fechaInicio: new Date(fechaInicio),
      fechaFin: new Date(fechaFin),
    }];

    const fechasReservadas = rangosFechasReservadas.map(async (rangoFecha) => {
      const fechaReservada = new FechaReservada({
        fechaInicio: rangoFecha.fechaInicio,
        fechaFin: rangoFecha.fechaFin,
        reservacion: reservacion._id
      });

      await fechaReservada.save();
      return fechaReservada; // Retornar el objeto completo en lugar del ID
    });

    reservacion.fechasReservadas = await Promise.all(fechasReservadas);

    await Promise.all([
      reservacion.save(),
      Hospedaje.findByIdAndUpdate(hospedajeReservado, { $push: { fechasReservadas: { $each: reservacion.fechasReservadas } } })
    ]);
    


    res.json({ message: 'Reserva creada correctamente', reserva: reservacion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocurrió un error al crear la reserva' });
  }
};




  

const crearReservacionAuto = async (req, res = response) => {

  try {
    // Obtener los parámetros de la reserva del cuerpo de la solicitud
    const {
      cliente,
      fechaInicio,
      fechaFin,
      autoReservado,
    } = req.body;


    const existeCliente = await usuario.findById(cliente);

    if(!existeCliente){

      return res.status(404).json({ message: 'El usuario no existe' });

    }

    const reservacion = new Reservacion({
      cliente,
      fechaInicio,
      fechaFin,
      autoReservado,
    });

    const rangosFechasReservadas = [{
      fechaInicio: new Date(fechaInicio),
      fechaFin: new Date(fechaFin),
    }];

    const fechasReservadas = rangosFechasReservadas.map(async (rangoFecha) => {
      const fechaReservada = new FechaReservada({
        fechaInicio: rangoFecha.fechaInicio,
        fechaFin: rangoFecha.fechaFin,
        reservacion: reservacion._id
      });

      await fechaReservada.save();
      return fechaReservada; // Retornar el objeto completo en lugar del ID
    });
    
    reservacion.fechasReservadas = await Promise.all(fechasReservadas);

    await Promise.all([
      reservacion.save(),
      Auto.findByIdAndUpdate(autoReservado, { $push: { fechasReservadas: { $each: reservacion.fechasReservadas } } })
    ]);

    res.json({ message: 'Reserva creada correctamente', reserva: reservacion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocurrió un error al crear la reserva' });
  }

}




const crearReservacionPaquete = async (req, res) => {
  try {
    const {
      cliente,
      fechaInicio,
      fechaFin,
      paqueteReservado,
      numeroPersonas,
      hospedajeReservado,
      autoReservado,
    } = req.body;

    const existeCliente = await usuario.findById(cliente);

    if (!existeCliente) {
      return res.status(404).json({ message: 'El usuario no existe' });
    }

    // Resto del código para crear la reserva de paquete...
    const rangosFechasReservadas = [{
      fechaInicio: new Date(fechaInicio),
      fechaFin: new Date(fechaFin),
    }];

    // Reservar hospedajes si están incluidos en el paquete
    if (hospedajeReservado && Array.isArray(hospedajeReservado)) {
      for (const hospedaje of hospedajeReservado) {
        const reservacionHospedaje = new Reservacion({
          cliente,
          fechaInicio,
          fechaFin,
          numeroPersonas,
          hospedajeReservado: hospedaje._id,
        });

        const fechasReservadasHospedajes = rangosFechasReservadas.map(async (rangoFecha) => {
          const fechaReservada = new FechaReservada({
            fechaInicio: rangoFecha.fechaInicio,
            fechaFin: rangoFecha.fechaFin,
            reservacion: reservacionHospedaje._id,
          });

          await fechaReservada.save();
          return fechaReservada;
        });

        reservacionHospedaje.fechasReservadas = await Promise.all(fechasReservadasHospedajes);

        await Promise.all([
          reservacionHospedaje.save(),
          Hospedaje.findByIdAndUpdate(hospedaje._id, { $push: { fechasReservadas: { $each: reservacionHospedaje.fechasReservadas } } }),
        ]);
      }
    }

    // Reservar autos si están incluidos en el paquete
    if (autoReservado && Array.isArray(autoReservado)) {
      for (const auto of autoReservado) {
        const reservacionAuto = new Reservacion({
          cliente,
          fechaInicio,
          fechaFin,
          numeroPersonas,
          autoReservado: auto._id,
        });

        const fechasReservadasAutos = rangosFechasReservadas.map(async (rangoFecha) => {
          const fechaReservada = new FechaReservada({
            fechaInicio: rangoFecha.fechaInicio,
            fechaFin: rangoFecha.fechaFin,
            reservacion: reservacionAuto._id,
          });

          await fechaReservada.save();
          return fechaReservada;
        });

        reservacionAuto.fechasReservadas = await Promise.all(fechasReservadasAutos);

        await Promise.all([
          reservacionAuto.save(),
          Auto.findByIdAndUpdate(auto._id, { $push: { fechasReservadas: { $each: reservacionAuto.fechasReservadas } } }),
        ]);
      }
    }

    res.json({ message: 'Reserva de paquete creada correctamente' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocurrió un error al crear la reserva de paquete' });
  }
};



  const crearReservacion = async (req, res = response) => {

    try {
      const {
        cliente,
        fechaInicio,
        fechaFin,
        numeroPersonas,
        hospedajeReservado,
        autoReservado,
      } = req.body;

      const reservacion = new Reservacion({
        cliente,
        fechaInicio,
        fechaFin,
        numeroPersonas,
        hospedajeReservado,
        autoReservado
      });
  
      const rangosFechasReservadas = [{
        fechaInicio: new Date(fechaInicio),
        fechaFin: new Date(fechaFin),
      }];
  
      const fechasReservadas = rangosFechasReservadas.map(async (rangoFecha) => {
        const fechaReservada = new FechaReservada({
          fechaInicio: rangoFecha.fechaInicio,
          fechaFin: rangoFecha.fechaFin,
          reservacion: reservacion._id
        });
  
        await fechaReservada.save();
        return fechaReservada._id;
      });
  
      reservacion.fechasReservadas = await Promise.all(fechasReservadas);
  
      await Promise.all([
        reservacion.save(),
        Hospedaje.findByIdAndUpdate(hospedajeReservado, { $push: { fechasReservadas: { $each: reservacion.fechasReservadas } } })
      ]);
  
      res.json({ message: 'Reserva creada correctamente', reserva: reservacion });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ocurrió un error al crear la reserva' });
    }
}



const obtenerReservaciones = async (req, res = response) => {
  try {
    const reservaciones = await Reservacion.find().populate('fechasReservadas');

    const reservacionesConFechas = reservaciones.map((reservacion) => {
      const fechasReservadas = reservacion.fechasReservadas.map((fechaReservada) => ({
        fechaInicio: fechaReservada.fechaInicio,
        fechaFin: fechaReservada.fechaFin,
      }));

      return {
        _id: reservacion._id,
        cliente: reservacion.cliente,
        fechaInicio: reservacion.fechaInicio,
        fechaFin: reservacion.fechaFin,
        numeroPersonas: reservacion.numeroPersonas,
        hospedajeReservado: reservacion.hospedajeReservado,
        autoReservado: reservacion.autoReservado,
        fechasReservadas: fechasReservadas,
        __v: reservacion.__v,
      };
    });

    res.json({ reservaciones: reservacionesConFechas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocurrió un error al obtener las reservaciones' });
  }
};


const obtenerReservacion = async (req, res = response) => {
  try {
    const reservacion = await Reservacion.findById(req.params.id).populate('fechasReservadas');

    if (!reservacion) {
      return res.status(404).json({ message: 'La reservación no existe' });
    }

    const fechasReservadas = reservacion.fechasReservadas.map((fechaReservada) => ({
      fechaInicio: fechaReservada.fechaInicio,
      fechaFin: fechaReservada.fechaFin,
    }));

    const autoReservado = await Auto.findById(reservacion.autoReservado);

    res.json({
      _id: reservacion._id,
      cliente: reservacion.cliente,
      fechaInicio: reservacion.fechaInicio,
      fechaFin: reservacion.fechaFin,
      numeroPersonas: reservacion.numeroPersonas,
      hospedajeReservado: reservacion.hospedajeReservado,
      autoReservado: {
        _id: autoReservado._id,
        // Agrega aquí las propiedades específicas del auto que deseas mostrar
      },
      paqueteReservado: reservacion.paqueteReservado,
      fechasReservadas: fechasReservadas,
      __v: reservacion.__v,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocurrió un error al obtener la reservación' });
  }
};

const actualizarReservacion = async ( req, res = response) => {
  try {
    const {
      cliente,
      fechaInicio,
      fechaFin,
      numeroPersonas,
      hospedajeReservado,
      autoReservado,
    } = req.body;

    const existeReservacion = await Reservacion.findById(req.params.id);
    if (!existeReservacion) {
      return res.status(404).json({ message: 'La reservación no existe' });
    }

    const reservacion = await Reservacion.findByIdAndUpdate(req.params.id, {
      cliente,
      fechaInicio,
      fechaFin,
      numeroPersonas,
      hospedajeReservado,
      autoReservado,
      fechasReservadas: [],
      paqueteReservado: null,
      __v: 0,
    });

    res.json({ message: 'Reservación actualizada correctamente', reservacion });
    
  } catch (error) {
    
  }
}

module.exports = {
      crearReservacion,
      crearReservacionAuto,
      crearReservacionHospedaje,
      obtenerReservaciones,
      crearReservacionPaquete,
      obtenerReservacion,
      actualizarReservacion
}/* const crearReservacion = async (req, res = response) =>  {
 *//*  
    try {
        // Obtener los parámetros de la reserva del cuerpo de la solicitud
        const {
          cliente,
          fechaInicio,
          fechaFin,
          numeroPersonas,
          autoReservado,
          hospedajeReservado
        } = req.body;
    
        const auto = await Auto.findById(autoReservado);
        if (!auto) {
          return res.status(404).json({ message: 'El auto no existe' });
        }    
    
        // Verificar la disponibilidad del auto en las fechas especificadas
        const reservasAuto = await Reservacion.find({
          autoReservado: autoReservado,
          fechaInicio: { $lte: fechaFin },
          fechaFin: { $gte: fechaInicio }
        });
    
        if (reservasAuto.length > 0) {
          return res.status(409).json({ message: 'El auto no está disponible en el rango de fechas especificado' });
        }
    
        // Verificar la existencia del hospedaje utilizando el helper
        const hospedaje = await Hospedaje.findById(hospedajeReservado);
        if (!hospedaje) {
          return res.status(404).json({ message: 'El hospedaje no existe' });
        }
    
        // Verificar la disponibilidad del hospedaje en las fechas especificadas
        const reservasHospedaje = await Reservacion.find({
          hospedajeReservado: hospedajeReservado,
          fechaInicio: { $lte: fechaFin },
          fechaFin: { $gte: fechaInicio }
        });
    
        if (reservasHospedaje.length > 0) {
          return res.status(409).json({ message: 'El hospedaje no está disponible en el rango de fechas especificado' });
        }
    
        // Generar las fechas reservadas
        const fechasReservadas = [];
        const currentDate = new Date(fechaInicio);
    
        while (currentDate <= fechaFin) {
          fechasReservadas.push(currentDate.toISOString());
          currentDate.setDate(currentDate.getDate() + 1);
        }
    
        // Crear el documento de reserva
        const reserva = new Reservacion({
          cliente,
          fechaInicio,
          fechaFin,
          numeroPersonas,
          autoReservado,
          hospedajeReservado,
          fechasReservadas
        });
    
        // Guardar la reserva en la base de datos
        await reserva.save();
    
        res.json({ message: 'Reserva creada correctamente', reserva });
    
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocurrió un error al crear la reserva' });
      }
     */


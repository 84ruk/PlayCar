const { response } = require("express");
const { default: mongoose } = require("mongoose");

const Paquete = require("../models/paquete"); 
const Auto = require("../models/auto"); 
const Hospedaje = require("../models/hospedaje");
const { uploadFile, getFiles } = require("../s3");
const hospedaje = require("../models/hospedaje");
const FechaReservada = require("../models/fecha-reservada");


const crearPaquete = async (req, res) => {
  
  try {
  const { nombre, descripcion, precio, autos, hospedajes} = req.body;
  const files = req.files
  const autosArray = JSON.parse(autos);
  const hospedajesArray = JSON.parse(hospedajes);


    const existePaquete = await Paquete.findOne({ nombre });

    
    if(!nombre || !descripcion || !precio){
      return res.status(400).json({ message: 'Faltan datos' });
    }

    if (existePaquete) {
      return res.status(400).json({ message: 'El paquete ya existe' });
    }

    let autosIds = [];
    let hospedajesIds = [];

    // Verificar si se incluyeron autos en el paquete
    if (autosArray && autosArray.length > 0) {
      // Validar los IDs de los autos
      const areAutosIdsValid = autosArray.every(autoId => mongoose.Types.ObjectId.isValid(autoId));
      if (!areAutosIdsValid) {
        return res.status(400).json({ message: 'Los IDs de los autos son inválidos' });
      }

      // Buscar y validar los autos por sus IDs
      const autosEncontrados = await Auto.find({ _id: { $in: autosArray } });
      if (autosEncontrados.length !== autosArray.length) {
        return res.status(404).json({ message: 'No se encontraron todos los autos especificados' });
      }
      autosIds = autosEncontrados.map(auto => auto._id);
    }

    // Verificar si se incluyeron hospedajes en el paquete
    if (hospedajesArray && hospedajesArray.length > 0) {
      // Buscar y validar los hospedajes por sus IDs
      const hospedajesEncontrados = await Hospedaje.find({ _id: { $in: hospedajesArray } });
      if (hospedajesEncontrados.length !== hospedajesArray.length) {
        return res.status(404).json({ message: 'No se encontraron todos los hospedajes especificados' });
      }
      hospedajesIds = hospedajesEncontrados.map(hospedaje => hospedaje._id);
    }
   // Subir los archivos a S3
   /* const uploadedFiles = await Promise.all(
    req.files.map((file) => uploadFile(file))
  ); */
  // Obtener las URLs de las imágenes desde AWS S3
  
  // Crear el paquete y guardar en la base de datos
  const paquete = new Paquete({
    nombre,
    descripcion,
    precio,
    autos: autosIds,
    hospedajes: hospedajesIds,
  });
  
 
     if (autosIds.length > 0) {
      // Asociar los autos al paquete
      await Auto.updateMany({ _id: { $in: autosIds } }, { $set: { paquete: paquete._id } });
    }

    if (hospedajesIds.length > 0) {
      // Asociar los hospedajes al paquete
      await Hospedaje.updateMany({ _id: { $in: hospedajesIds } }, { $set: { paquete: paquete._id } });
    }

    await paquete.save();

    res.json({ message: 'Paquete creado correctamente', paquete }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocurrió un error al crear el paquete' });
  }
}; 


const obtenerPaquetes = async( req, res = response ) => {
  try {
        const paquetes = await Paquete.find();
        res.json({
            paquetes,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al obtener paquetes"
            });
        }

}

const obtenerPaquete = async (req, res = response) => {
  const { id } = req.params;
  try {
    const paquete = await Paquete.findById(id);

    if (!paquete) {
      return res.status(404).json({
        ok: false,
        msg: 'Paquete no encontrado',
      });
    }

    // Fetch details of autos using their IDs
    const autoDetailsPromises = paquete.autos.map(async (autoId) => {
      const auto = await Auto.findById(autoId);
      return auto;
    });
    const autos = await Promise.all(autoDetailsPromises);

    // Fetch details of hospedajes using their IDs
    const hospedajeDetailsPromises = paquete.hospedajes.map(async (hospedajeId) => {
      const hospedaje = await Hospedaje.findById(hospedajeId);
      return hospedaje;
    });
    const hospedajes = await Promise.all(hospedajeDetailsPromises);

    
    paquete.autos = autos;
    paquete.hospedajes = hospedajes;


    const fechasReservadasIdsHospedajes = hospedajes.map((hospedaje) => {
      return hospedaje?.fechasReservadas?.map((fechaReservada) => fechaReservada._id) ?? [];
    }).flat();
    
    
    
    
    
    const fechasReservadasCompletas = await FechaReservada.find({ _id: { $in: fechasReservadasIdsHospedajes } });

    // Formatear las fechas completas
    const fechasFormateadasHospedajes = fechasReservadasCompletas.map((fechaReservada) => {
      return {
        fechaInicio: fechaReservada.fechaInicio.toISOString(),
        fechaFin: fechaReservada.fechaFin.toISOString(),
      };
    });

    
    const fechasReservadasIdsAutos = autos.map((auto) => {
      return auto?.fechasReservadas?.map((fechaReservada) => fechaReservada._id) ?? [];
    }).flat();

    const fechasReservadasAutosCompletas = await FechaReservada.find({ _id: { $in: fechasReservadasIdsAutos } });
    
    const fechasFormateadasAutos = fechasReservadasAutosCompletas.map((fechaReservada) => {
      return {
        fechaInicio: fechaReservada.fechaInicio.toISOString(),
        fechaFin: fechaReservada.fechaFin.toISOString(),
      };
    });

    


    const obtenerRangosFechas = (fechasFormateadasAutos, fechasFormateadasHospedajes) => {
      const fechasCombinadas = [...fechasFormateadasAutos, ...fechasFormateadasHospedajes].sort(
        (a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio)
      );
    
      const rangosFechas = [];
      let fechaInicio = null;
      let fechaFin = null;
    
      for (const fecha of fechasCombinadas) {
        const fechaInicioActual = new Date(fecha.fechaInicio);
        const fechaFinActual = new Date(fecha.fechaFin);
    
        if (!fechaInicio) {
          fechaInicio = fechaInicioActual;
          fechaFin = fechaFinActual;
        } else {
          const siguienteFecha = new Date(fechaInicio);
          siguienteFecha.setDate(siguienteFecha.getDate() + 1);
    
          if (siguienteFecha.getTime() === fechaInicioActual.getTime()) {
            fechaFin = fechaFinActual;
          } else {
            rangosFechas.push({
              fechaInicio: fechaInicio.toISOString(),
              fechaFin: fechaFin.toISOString(),
            });
            fechaInicio = fechaInicioActual;
            fechaFin = fechaFinActual;
          }
        }
      }
    
      // Agregar el último rango de fechas
      if (fechaInicio && fechaFin) {
        rangosFechas.push({
          fechaInicio: fechaInicio.toISOString(),
          fechaFin: fechaFin.toISOString(),
        });
      }
    
      return rangosFechas;
    };

      const fechasFormateadas = obtenerRangosFechas(fechasFormateadasAutos, fechasFormateadasHospedajes);


    res.json({
      paquete,
      fechasFormateadas

    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener paquete',
    });
  }
};


const obtenerAuto = async( req, res = response ) => {

    const { id } = req.params;
    
    try {
        const auto = await Auto.findById( id );
        res.json({
            auto
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al obtener auto"
            });
        }

}

const actualizarPaquete = async (req, res) => {
    const { id } = req.params;
    const { nombre, capacidad, descripcion, precio, estado, imagenes, autos, hospedajes, fechasReservadas } = req.body;
  
    const paqueteActualizado = await Paquete.findByIdAndUpdate(
      id,
      { nombre, capacidad, descripcion, precio, estado, imagenes, autos, hospedajes, fechasReservadas},
      { new: true }
    );
  
    if (!paqueteActualizado) {
      return res.status(404).json({
        msg: 'paquete no encontrado',
      });
    }
  
    res.json({
      msg: 'Paquete actualizado correctamente',
      paquete: paqueteActualizado,
    });
  };
  

const borrarPaquete = async( req, res = response ) => {
    const { id } = req.params;

    
    try {
        const paquete = await Paquete.findByIdAndDelete( id ); 
        res.json({
          paquete
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al borrar el auto"
            });
        }

}


module.exports = {
    crearPaquete,
    obtenerPaquetes,
    actualizarPaquete,
    obtenerPaquete,
    borrarPaquete
}
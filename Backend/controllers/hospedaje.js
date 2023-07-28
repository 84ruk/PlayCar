const { response } = require("express");
const Hospedaje = require("../models/hospedaje"); 
const FechaReservada = require("../models/fecha-reservada");
const Paquete = require("../models/paquete");
const { uploadFile } = require("../s3");

const crearHospedaje = async( req, res = response ) => {

    try {

        const { nombre, direccion, tipo, habitaciones, capacidad, descripcion, precio, estado } = req.body;

      const existeHospedaje = await Paquete.findOne({ nombre });

      if (existeHospedaje) {
        return res.status(400).json({ message: 'Hospedaje ya existe'});
      }

      const uploadedFiles = await Promise.all(
        req.files.map((file) => uploadFile(file))
      );

        const hospedaje = new Hospedaje({ 
          nombre,
          direccion,
          tipo,
          habitaciones,
          capacidad,
          descripcion,
          precio,
          estado, 
          imagenes: uploadedFiles
         });


      
        //Guardar en BDD
        await hospedaje.save();
      
        res.json({ message: 'Paquete creado correctamente' }); 

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al crear hospedaje"
            });
        }
}

const obtenerHospedajes = async( req, res = response ) => {

    try {
        const hospedajes = await Hospedaje.find();
        res.json({
            hospedajes
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al obtener hospedajes"
            });
        }

}

const obtenerHospedaje = async (req, res = response) => {
  const { id } = req.params;

  try {
    const hospedaje = await Hospedaje.findById(id);

    if (!hospedaje) {
      return res.status(404).json({ msg: 'Hospedaje no encontrado' });
    }

    // Obtener las fechas reservadas completas a partir de los ObjectIds
    const fechasReservadasIds = hospedaje.fechasReservadas;
    const fechasReservadasCompletas = await FechaReservada.find({ _id: { $in: fechasReservadasIds } });
    // Formatear las fechas completas
    const fechasFormateadas = fechasReservadasCompletas.map((fechaReservada) => {
      return {
        fechaInicio: fechaReservada.fechaInicio.toISOString(),
        fechaFin: fechaReservada.fechaFin.toISOString(),
      };
    });
    
    
    res.json({
      hospedaje,
      fechasFormateadas
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener hospedajes',
    });
  }
};

  
const actualizarHospedaje = async (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, tipo, habitaciones, capacidad, descripcion, categoria, precio, estado, imagenes } = req.body;
  
    const hospedajeActualizado = await Hospedaje.findByIdAndUpdate(
      id,
      { nombre, direccion, tipo, habitaciones, capacidad, descripcion, categoria, precio, estado, imagenes },
      { new: true }
    );
  
    if (!hospedajeActualizado) {
      return res.status(404).json({
        msg: 'Hospedaje no encontrado',
      });
    }
  
    res.json({
      msg: 'Hospedaje actualizado correctamente',
      hospedaje: hospedajeActualizado,
    });
  };
  

const borrarHospedaje = async( req, res = response ) => {
    const { id } = req.params;

    
    try {
        const hospedaje = await Hospedaje.findByIdAndDelete( id );
        res.json({
            hospedaje
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al borrar el hospedaje"
            });
        }

}

module.exports = {
    crearHospedaje,
    obtenerHospedajes,
    obtenerHospedaje,
    actualizarHospedaje,
    borrarHospedaje
}


/*   const { id } = req.params;

  try {
    const hospedaje = await Hospedaje.findById(id);

    if (!hospedaje) {
      return res.status(404).json({ msg: 'Hospedaje no encontrado' });
    }

    // Obtener las fechas reservadas completas a partir de los ObjectIds
    const fechasReservadasIds = hospedaje.fechasReservadas;
    const fechasReservadasCompletas = await FechaReservada.find({ _id: { $in: fechasReservadasIds } });
    // Formatear las fechas completas
    const fechasFormateadas = fechasReservadasCompletas.map((fechaReservada) => {
      return {
        fechaInicio: fechaReservada.fechaInicio.toISOString(),
        fechaFin: fechaReservada.fechaFin.toISOString(),
      };
    });
    
    
    res.json({
      hospedaje,
      fechasFormateadas
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener hospedajes',
    });
  } */
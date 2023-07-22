const { response } = require("express");
const Hospedaje = require("../models/hospedaje"); 

const crearHospedaje = async( req, res = response ) => {

    try {

        const { nombre, direccion, tipo, habitaciones, capacidad, descripcion, categoria, precio, estado, imagenes } = req.body;
        const hospedaje = new Hospedaje({ nombre, direccion, tipo, habitaciones, capacidad, descripcion, categoria, precio, estado, imagenes });


/*         const existeHospedaje = await Auto.findOne({ nombre }); 
    
        if (existeAuto) {
          return res.status(400).json({
            msg: "El auto ya existe",
          });
        }
        NO SE SI VAYAN A HABER AUTOS DUPLICADOS
       */
      
        //Guardar en BDD
        await hospedaje.save();
      
        res.json({
            hospedaje
        });

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

const obtenerHospedaje  = async( req, res = response ) => {

    const { id } = req.params;
    
    try {
        const hospedaje = await Hospedaje.findById( id );
        res.json({
            hospedaje
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al obtener hospedajes"
            });
        }

}

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
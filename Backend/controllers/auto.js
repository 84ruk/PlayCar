const { response } = require("express");
const Auto = require("../models/auto"); 

const crearAuto = async( req, res = response ) => {

    try {

        const { nombre, descripcion, marca, modelo, categoria, precio, estado } = req.body;
        const auto = new Auto({ nombre, descripcion, marca, modelo, categoria, precio, estado });
/*         const existeAuto = await Auto.findOne({ nombre }); 
    
        if (existeAuto) {
          return res.status(400).json({
            msg: "El auto ya existe",
          });
        }
        NO SE SI VAYAN A HABER AUTOS DUPLICADOS
       */
      
        //Guardar en BDD
        await auto.save();
      
        res.json({
            auto
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al crear auto"
            });
        }
}

const obtenerAutos = async( req, res = response ) => {

    try {
        const autos = await Auto.find();
        res.json({
            autos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al obtener autos"
            });
        }

}

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

const actualizarAuto = async (req, res) => {
    const { id } = req.params;
    const { nombre, marca, modelo, descripcion, precio } = req.body;
  
    const autoActualizado = await Auto.findByIdAndUpdate(
      id,
      { nombre, marca, modelo, descripcion, precio },
      { new: true }
    );
  
    if (!autoActualizado) {
      return res.status(404).json({
        msg: 'Auto no encontrado',
      });
    }
  
    res.json({
      msg: 'Auto actualizado correctamente',
      auto: autoActualizado,
    });
  };
  

const borrarAuto = async( req, res = response ) => {
    const { id } = req.params;

    
    try {
        const auto = await Auto.findByIdAndDelete( id );
        res.json({
            auto
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
    crearAuto,
    obtenerAutos,
    obtenerAuto,
    actualizarAuto, 
    borrarAuto,

}
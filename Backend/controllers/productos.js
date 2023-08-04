const { response } = require("express");
const Hospedaje = require("../models/hospedaje"); 
const Auto = require("../models/auto"); 
const Paquete = require("../models/paquete"); 


const obtenerProductos = async (req, res = response) => {

    
    try {
        const paquetes = await Paquete.find();
        const hospedajes = await Hospedaje.find();
        const autos = await Auto.find();

        return res.status(200).json({
            ok: true,
            paquetes,
            hospedajes,
            autos
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al obtener hospedajes"
        });
    }
}


module.exports = {
    obtenerProductos
}
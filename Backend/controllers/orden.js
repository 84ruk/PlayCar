const { response } = require("express");
const Orden = require("../models/orden");
const Producto = require("../models/producto");

/* import * as jwt from 'jsonwebtoken'; */
const jwt = require('jsonwebtoken');


const crearOrden = async (req, res = response) => {
  try {
    const { productoNombre, cantidad } = req.body;

    const token = req.header('x-token');

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const clienteId = decodedToken.uid;

    // Buscar el producto por su nombre
    const producto = await Producto.findOne({ nombre: productoNombre });

    if (!producto) {
      return res.status(404).json({
        ok: false,
        msg: 'Producto no encontrado',
      });
    }

    const orden = new Orden({
      cliente: clienteId,
      producto: producto._id,
      cantidad,
      estado: 'PENDIENTE', // Asignar el estado correcto aquí
    });

    await orden.save();

    res.status(201).json({
      ok: true,
      orden,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    });
  }
};



const obtenerOrdenes = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const [ totalOrdenes, ordenes ] = await Promise.all([
        Orden.countDocuments(),
        Orden.find()
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total: totalOrdenes,
        ordenes
    });

}


const obtenerOrden = async (req, res = response) => {
    const { id } = req.params;

    const orden = await Orden.findById(id);

    res.json({
        orden
    });
}

const cambiarEstadoOrden = async (req, res = response) => {
    
  const { ...resto } = req.body;
  const { id } = req.params;
    try {

    // Buscar la orden por su ID y actualizar el estado
    const orden = await Orden.findByIdAndUpdate(id, resto, { new: true });

    console.log(orden);

    res.json({
      ok: true,
      orden,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    });
  }

}

const borrarOrden = async (req, res = response) => {
    const { id } = req.params;

    const orden = await Orden.findByIdAndDelete(id);

    res.json({
        orden
    });
}

module.exports = {
    crearOrden,
    obtenerOrdenes,
    obtenerOrden,
    cambiarEstadoOrden,
    borrarOrden
    
}
const Role = require("../models/role");
const Usuario = require('../models/usuario');
const Auto = require('../models/usuario');



const esRoleValido = async(rol = '') => {
  const existeRol = await Role.findOne({ rol });
  if(!existeRol){
    throw new Error("El rol no existe");
  }
}

const existePorId = async(id) => {

    const tareaDB = await Auto.findById(id);

    if( !tareaDB ){
        throw new Error(`El id ${id} no existe`)
    }


}

const emailExiste = async(correo = '') => {

    const existeEmail = await Usuario.findOne({ correo });
  
    if( existeEmail ){
      throw new Error(`Una cuenta con el correo: ${ correo } ya existe`)
    }
  
  }

  const emailNoExiste = async(correo = '') => {

    const existeEmail = await Usuario.findOne({ correo });
  
    if( !existeEmail ){
      throw new Error(`Una cuenta con el correo: ${ correo } no existe`)
    }
  
  }
  
  const existeUsuarioPorId = async(id) => {
  
    const existeUsuario = await Usuario.findById(id);
  
    if(!existeUsuario ){
      throw new Error(`El ID: ${ id } no existe`)
    }
  
  }

  const comprobarToken = async ( req, res ) => {

    const { token } = req.params;
  
    const tokenValido = await Usuario.findOne({ where: { token } })
  
    if(tokenValido){
  
        res.json({msg: 'Token valido y el Usuario Existe'})
  
    } else {
        const error = new Error("Token no valido");
        return res.status(404).json({msg: error.message});
  
    }
  
  }

/*   const existeAutoPorId = async (id) => {
    const existeAuto = await Auto.findById(id).exec();
    console.log(existeAuto)
  
    // Otro código relacionado con el manejo de la respuesta
  }
  
   */
  
/*   const existeProductoPorId = async(id) => {
  
    const existeProducto = await Producto.findById(id)
  
    if(!existeProducto ){
      throw new Error(`Esta id no existe`);
    }
  }

  const existeOrdenPorId  = async( id ) => {

    const existeOrdenPorId = await Orden.findById(id)

    if(!existeOrdenPorId ){
      throw new Error(`Esta id no existe`);
    }
  } */

module.exports = {
    existePorId,
    emailExiste,
    emailNoExiste,
    existeUsuarioPorId,
/*     existeProductoPorId, */
    esRoleValido,
    comprobarToken,
    /* existeOrdenPorId */
}
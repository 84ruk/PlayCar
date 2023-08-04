const Usuario = require('../models/usuario');



const obtenerUsuario = async (req, res) => {

    try {
      const usuarioAutenticado = req.usuario; // Obtén el usuario autenticado desde el middleware validarJWT

      // Verifica si el usuario autenticado es un administrador
      if (!usuarioAutenticado.isAdmin) {
        return res.status(403).json({ 
          msg: "No estás autorizado para ver esta información",
        });/* res.status(403).json({ 
          msg: "No estás autorizado para ver esta información",
        }); */
      }
      
      // Busca al usuario en la base de datos
      const usuario = await Usuario.find({ usuario: usuarioAutenticado });
      
      // Devuelve los datos del usuario en la respuesta
      return res.json(usuario);
      
      } catch (error) {
        console.log(error);
        return res.status(500).json({
        msg: "Error en el servidor",
        });
      }
};


module.exports = {
  obtenerUsuario,
};

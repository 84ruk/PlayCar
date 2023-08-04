const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');

const Usuario = require("../models/usuario");
const { esRoleValido } = require("../helpers/db-validators");
const { emailRegistro, emailOlvidePassword } = require("../helpers/email");
const { generarId } = require("../helpers/generarId");


const usuariosGet = async(req = request, res = response) => {

    /* const { q, nombre = 'no nombre', apikey, page = 1, limit = 20 } = req.query; */
    const { limite = 0, desde = 0 } = req.query;
    const query = { estado: true };
/* 
    const usuarios = await Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite));

    const total = await Usuario.countDocuments(query);
 */
    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)

        .skip(Number(desde))
        .limit(Number(limite)),
    ]);

    res.json({
      total,
      usuarios
      //query: req.query 
    });

  }

const usuariosPost = async(req, res = response) => {

  const { nombre, correo, password, rol } = req.body;
  
  try {
    const token = generarId();
    const usuario = new Usuario({ nombre, correo, password, token });
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
  
    //Guardar en BDD
    await usuario.save();

    emailRegistro({
      nombre: nombre,
      email: correo,
      token: usuario.token
  })
    
  } catch (error) {
    console.log(error);
  }


  //Guardar en BDD
  res.json({
    msg: 'Se ha enviado un correo electrónico con las instrucciones para confirmar tu cuenta',
    ok: true
    // usuario
  });
  
}

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, rol, ...resto } = req.body;

  // Validar contra la base de datos si es necesario
  if (password) {
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }

  try {
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // Validar si el rol proporcionado es válido
    await esRoleValido(rol);

    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    if (!usuarioActualizado) {
      return res.status(500).json({ msg: 'Error al actualizar el usuario' });
    }

    // Envío de correo electrónico
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tu_correo@gmail.com',
        pass: 'tu_contraseña',
      },
    });

    const mailOptions = {
      from: 'Kaxtik@example.com',
      to: correo,
      subject: 'Actualización de usuario',
      text: 'Se ha actualizado tu información de usuario.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ msg: 'Error al enviar el correo electrónico' });
      } else {
        res.json({ msg: 'Correo electrónico enviado correctamente' });
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};


const usuariosOlvidePassword = async (req, res) => {
  const { correo } = req.body;
  
  try {
    // Lógica para generar el token y obtener el nombre del usuario
    const usuario = await Usuario.findOne({ correo }); // LÓgica para obtener el nombre del usuario

    
    if(!usuario){
      return res.status(404).json({ msg: 'Un usuario con el correo ingresado no existe' });
    }
    // Usuario no activo
    if (!usuario.estado) {
      return res.status(403).json({
        msg: "Su cuenta a sido dada de baja, Comuniquese con kaxtik o PlayCar a traves de facebook",
      });
    }

    if(!usuario.confirmado){
      return res.status(403).json({ msg: 'El usuario no esta confirmado' });
    }

    token = generarId();
    usuario.token = token;
    await usuario.save();

    // Luego, llama a la función emailOlvidePassword
    await emailOlvidePassword({
      email: correo,
      nombre: usuario.nombre, // Reemplaza con el campo que contiene el nombre del usuario en tu modelo de datos
      token: token,
    });

    res.json({ msg: 'Correo electrónico enviado correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};


const usuariosDelete = async( req, res = response) => {
  const { id } = req.params;
  //token es quien sta logadordfd id se manda por el url lo busca y lo update

  //Fisicamente lo borramos
  /* const usuario = await Usuario.findByIdAndDelete(id); no es recomendable por que puede ocurrir un error si el id no existe Y se pierde la referencia */
  const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

  res.json({ usuario });
}


const usuarioGet = async(req, res = response) => {
  const { id } = req.params;
  const usuario = await Usuario.findById(id);

  res.json({ usuario });
}

const confirmar = async (req, res) => {

  const { token } = req.params;
  const usuarioConfirmar = await Usuario.findOne({ token });


  if(!usuarioConfirmar){

      const error = new Error("El token es invalido");
      return res.status(403).json({ msg: error.message });
      
  }
  try {
      
      usuarioConfirmar.confirmado = true;
      usuarioConfirmar.token = null;
      await usuarioConfirmar.save();
      res.json({ msg: "Usuario Confirmado Correctamente" })

  } catch (error) {
      console.log(error)
  }

};

const cambiarPassword = async( req, res ) => {
  const { token } = req.params;
  const { password } = req.body;
  const usuario = await Usuario.findOne({ token });


    //Guardar en BDD
  try{
      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(password, salt);
      usuario.token = null;
      await usuario.save();
      res.json({ msg: "Password Modificado Correctamente" })

  
  } catch (error) {
      console.log(error)
  }

}




  module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPost,
    usuariosPut,
    usuariosOlvidePassword,
    usuarioGet,
    confirmar,
    cambiarPassword
  };
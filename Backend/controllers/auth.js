const { response } = require("express");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");
const { serialize } = require("cookie");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const login = async (req, res) => {
  const { correo, password } = req.body;
  try {
    // Verificar si el correo existe
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({
        msg: "No existe una cuenta con ese correo",
      });
    }

    

    // Usuario no activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Su cuenta a sido dada de baja, Comuniquese con los administradores",
      });
    }

    // Si el usuario no está confirmado
    if (!usuario.confirmado) {
      return res.status(400).json({
        msg: "Confirme su cuenta para poder iniciar sesión",
      });
    }


    // Verificar contraseña
    const validPassword = await bcrypt.compare(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Contraseña incorrecta",
      });
    }

    // Generar JWT
    const token = await generarJWT(usuario.id);

    // Establecer cookie
    res.cookie('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 100 * 60 * 60 * 24 * 30,
      path: '/',
    });

    // Devolver datos de usuario y token
    return res.json({
      msg: "Login",
      usuario,
      token, //borrar
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};


const logout = async (req, res = response) => {
  try {
    const token = req.cookies['auth-token']; // Obtén el valor de la cookie "auth-token"

    const serialized = serialize('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });
    res.setHeader("Set-Cookie", serialized);

    return res.status(200).json({
      msg: "Sesion cerrada correctamente",
    });
    }
   catch (error) {
    console.log(error); // Imprime el error en la consola para depuración
    return res.status(400).json({
      msg: "Token no válido",
    });
  }
};


const session = async (req, res = response) => {
  console.log('req.usuario')
  if(req.usuario) {
    console.log(req.usuario);
    return res.json({
      authenticated: true,
      user: {
        nombre: req.usuario.nombre,
        correo: req.usuario.correo,
        rol: req.usuario.rol,
      }
    })
  } else {
    res.json({
      authenticated: false,
      user: null
    })
  }
}

module.exports = {
  login,
  logout,
  session
};


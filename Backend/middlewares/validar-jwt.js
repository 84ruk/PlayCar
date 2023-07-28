const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req, res = response, next) => {
  
  const token = req.headers.authorization; // Leer el token de la cookie['auth-token']; // Leer el token de la cookie
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No se proporcionó un token de autenticación",
    });
  }

 try {
    const parsedCookies = parse(token);
    const authToken = parsedCookies['auth-token'];

    if (!authToken) {
      return res.status(401).json({
        ok: false,
        msg: "No se proporcionó un token de autenticación válido",
      });
    }

    const { payload, nonce } = jwt.verify(authToken, process.env.JWT_SECRET);

    // Aquí puedes realizar validaciones adicionales, como verificar la validez del nonce

    const { uid } = payload;
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(401).json({
        msg: "Token no válido - usuario no existe en la base de datos",
      });
    }

    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no válido - usuario inactivo",
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }

};

module.exports = {
  validarJWT,
};



/*  */
/*   const validarJWT = async (req, res = response, next) => {
  const token = req.headers.authorization; // Leer el token de la cookie['auth-token']; // Leer el token de la cookie

  if (!token) {

    return res.status(401).json({
      ok: false,
      msg: token,
    })
  }
   REVISAR TokenExpiredError.VALUE 

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      // Borrar la cookie no válida
      res.clearCookie('token');

      return res.status(401).json({
        msg: "Token no válido - usuario no existe en DB",
      });
    }

    if (!usuario.estado) {
      // Borrar la cookie no válida
      res.clearCookie('token');

      return res.status(401).json({
        msg: "Token no válido - usuario inactivo",
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);

    // Borrar la cookie no válida
    res.clearCookie('token');

    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }
}; */
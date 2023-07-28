const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");


const generarJWT = ( uid ) => {


  return new Promise((resolve, reject) => {
    const payload = { uid };

    const nonce = uuidv4();

    jwt.sign(
      {payload, nonce},
      process.env.JWT_SECRET,
      {
        expiresIn: "12h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });

}



module.exports = {
  generarJWT,
};
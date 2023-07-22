const nodemailer= require('nodemailer');

const emailRegistro = async ( datos ) => {

   const { email, nombre, token } = datos;

    const transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port:  process.env.EMAIL_PORT,
            auth: {
            user:  process.env.EMAIL_USER,
            pass:  process.env.EMAIL_PASS
        }
    });

    //Informacion del email

    await transport.sendMail({
        from: '"Kaxtik - Reservaciones de autos y hospedaje" <cuentas@kaxtik.com>',
        to: email,
        subject: "Kaxtik - Comprueba tu cuenta",
        text: "Comprueba tu cuenta en Kaxtik",
        html: `<p>Hola: ${nombre} Comprueba tu cuenta en Kaxtik</p>
        <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: 
        
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
        <p>Si tu no creaste esta cuenta, ignora este mensaje.</p>
        </p>
        `
    }) 
}
{/* <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
        
 */}
const emailOlvidePassword = async ( datos ) => {

    const { email, nombre, token } = datos;

    // Crea y configura el transporte de nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    // Informacion del email
    const mailOptions = {
      from: '"Kaxtik - Reservaciones de autos y hospedaje" <cuentas@kaxtik.com>',
      to: email,
      subject: "Kaxtik - Reestablece tu Password",
      text: "Comprueba tu cuenta en Kaxtik",
      html: `<p>Hola: ${nombre}, has solicitado reestablecer tu Password</p>
          <p>Sigue el siguiente enlace para generar un nuevo Password: 
          
          <a href="${process.env.FRONTEND_URL}/auth/olvide-password/${token}">Comprobar Cuenta</a>
          
          <p>Si tu no solicitaste este email, ignora este mensaje.</p>
          </p>
          `,
    };

      // Envía el correo electrónico
  await transporter.sendMail(mailOptions);
  
}
{/* <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Comprobar Cuenta</a> */}
        
module.exports = {
    emailRegistro,
    emailOlvidePassword
}
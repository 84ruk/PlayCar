
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const { dbConection } = require('../database/config');


const app = express();

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
    
    
        this.paths = {
            //auth: 'api/auth
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            usuario: '/api/usuario',
            autos: '/api/autos',
            hospedajes: '/api/hospedajes',
            reservaciones: '/api/reservaciones',
            paquetes: '/api/paquetes',
        }

        //Conectar base de datos
        this.conectarDB();

 
        //leemos y parseamos el body
        this.app.use( express.json() );
        

    // Middlewares
      this.middlewares();

      //Rutas de mi aplicacion
      this.routes();

     /*  this.listen(); */
    }


    async conectarDB() {
        await dbConection();
      }

      
    middlewares(){

        //Cors
        this.app.use(cors({
          origin: 'http://localhost:3000', // Reemplaza con la URL de tu frontend
          credentials: true, // Permite enviar y recibir cookies
        }));
        this.app.use(cookieParser());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static('uploads'));

       
       /*  this.app.use(cookieParser());
        this.app.use(
          session({
            secret: 'bac92bd3f083dc7fdee2560f9bf58df39f6deea1ec945fa140193683cbd506ce',
            resave: false,
            saveUninitialized: false,
            // Configuraciones adicionales de express-session
          })
        );
        this.app.use('/api/auth', NextAuth(options));
 */


        //Habilita lectura de datos
/*         this.app.use( express.urlencoded({ extended: true })); 
        this.app.use( cookieParser() );
        this.app.use(csurf({cookie: true})); */



  
      }
  
      routes(){

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.usuario, require('../routes/usuario'));
        this.app.use(this.paths.autos, require('../routes/autos'));
        this.app.use(this.paths.hospedajes, require('../routes/hospedajes'));
        this.app.use(this.paths.reservaciones, require('../routes/reservaciones'));
        this.app.use(this.paths.paquetes, require('../routes/paquetes'));
        /* this.app.use(this.paths.productos, require('../routes/productos')); */

      }

    listen(){
        this.app.listen(this.port, () => {
          console.log(`Example app listening at http://localhost:${this.port}`);
        });
    }


}

module.exports = Server;
 
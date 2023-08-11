
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

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
            productos: '/api/productos',
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
          origin: `${process.env.FRONTEND_URL}`, // Reemplaza con la URL de tu frontend
          credentials: true, // Permite enviar y recibir cookies
        }));
        this.app.use(cookieParser());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static('uploads'));



  
      }
  
      routes(){

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.usuario, require('../routes/usuario'));
        this.app.use(this.paths.autos, require('../routes/autos'));
        this.app.use(this.paths.hospedajes, require('../routes/hospedajes'));
        this.app.use(this.paths.reservaciones, require('../routes/reservaciones'));
        this.app.use(this.paths.paquetes, require('../routes/paquetes'));
        this.app.use(this.paths.productos, require('../routes/productos'));


      }

    listen(){
        this.app.listen(this.port, () => {
          console.log(`Example app listening at http://localhost:${this.port}`);
        });
    }


}

module.exports = Server;
 
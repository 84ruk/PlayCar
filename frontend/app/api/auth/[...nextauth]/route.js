import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from 'next-auth/react';

const options = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        correo: { label: 'Correo', type: 'email' },
        password: { label: 'Contraseña', type: 'password' }
      },
      authorize: async (credentials) => {
        try {
          const response = await fetch(`${process.env.URL_BACKEND}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              correo: credentials?.correo,
              password: credentials?.password
            })
          });

          if (response.ok) {
            const { usuario, token } = await response.json();
            

            // Aquí construyes el objeto de usuario con los datos necesarios
            const user = {
              nombre: usuario.nombre,
              email: usuario.correo,
              rol: usuario.rol,
              uid: usuario.uid,
              jwt: token
            };
            
            
            // Aquí retornas tanto el objeto de usuario como el token
            return Promise.resolve( user );


          } else {
            const errorData = await response.json();
            if (errorData.errors) {
              const errorMessages = errorData.errors.map((error) => error.msg);
              return Promise.reject(new Error(JSON.stringify(errorMessages)));
            } else {
              return Promise.reject(new Error(errorData?.msg || 'Revisa tus credenciales'));
            }
          }
        } catch (error) {
          console.log(error);
          throw new Error('Error en el servidor');
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, }) {

      if(user){ 
        token.user = user;
        user.jwt = token.user.jwt;
      }

      return token;
      
      /* if( user ) user. = user; */ //no se por que
    },
    async session({ session, token, user }) {

      
      if(token){ 
        session.user = token.user; 
      }

      return session;

    },
    signout: async (req, res) => {
      try {
        // Llamada a la función "signout" para cerrar sesión en el backend
        const response = await fetch(`${process.env.URL_BACKEND}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if(response.ok) {
          await signOut({ redirect: false })
          return Promise.resolve(true);
        }
        else {
          // Si la petición al backend falla o no obtiene una respuesta "ok", no cerramos la sesión en el frontend
          console.error('Error en el cierre de sesión: No se pudo cerrar sesión en el backend');
          return Promise.resolve(false);
        }
        // Realiza el cierre de sesión en NextAuth.js
        return Promise.resolve({ ...session, user: null, accessToken: null });
      } catch (error) {
        // Manejar errores si es necesario
        console.error('Error en el cierre de sesión:', error);
        return Promise.resolve({ ...session });
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };

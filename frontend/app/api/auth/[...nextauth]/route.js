import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

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
          const response = await fetch('http://localhost:8080/api/auth/login', {
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
            const { usuario } = await response.json();
            

            // Aquí construyes el objeto de usuario con los datos necesarios
            const user = {
              nombre: usuario.nombre,
              email: usuario.correo,
              rol: usuario.rol,
              uid: usuario.uid,
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
      }

      console.log(token);
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
      //Implementar logica para eliminar el token
      //hacer peticion
      await signout(req, res);
    },
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
/*       try {
        const response = await fetch('http://localhost:8080/api/auth/session', {
          method: 'GET',
          headers: {
            headers: {
            'Content-Type': 'application/json',
            Authorization: `auth-token=${token.user.jwt}`
            }
          }
        })
       if(response.authenticated){
        return {
          ...session,
        }

       } else {
        console.log('No autenticado');
       }
      } catch (error) {
        console.log(error);
      } */
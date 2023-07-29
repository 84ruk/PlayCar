import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'



export async function middleware(req) {

  const session = await getToken({ req, secret: process.env.JWT_SECRET});
  
  if(!session){
      const requestedPage = req.nextUrl.pathname;

      const url = req.nextUrl.clone();
      url.pathname = `/auth/login`;
      url.search = `?p=${requestedPage}`;

      return NextResponse.redirect(url);
  }

  if(session){
    const requestedPage = req.nextUrl.pathname;

    if(requestedPage.startsWith('/auth/') || requestedPage.startsWith('/admin/') && session.user.rol !== "ADMIN_ROLE"){
      const url = req.nextUrl.clone();
      url.pathname = `/`;
      url.search = `?p=${requestedPage}`;
      return NextResponse.redirect(url);
    }


  }
}


export const config = {
  matcher:[ 
    '/pagar/:path*', '/admin/:path*', '/', '/auth/login' /* '/auth/login', '/auth/register' */],
  skipMiddlewareUrlNormalize: [
    
    '/auth/register',
  ],
 // Rutas protegidas
}
/* 



  try {
    /*  const decodedToken = jwt.verify(session, process.env.JWT_SECRET, {
      maxAge: 100 * 60 * 60 * 24 * 30, // Tiempo de validez del token (ajusta según tus necesidades)
    });  */

    // Obtener el Nonce almacenado en el token
    /* const nonce = decodedToken.nonce; 

    // Si el token es válido y el Nonce coincide, puedes continuar con el flujo normal

    return NextResponse.next();
  } catch (error) {
    // Si el token no es válido o el Nonce no coincide, redirige al usuario a la página de inicio de sesión
    console.log(error)
    return NextResponse.next();
  }
  if(session){
    const requestedPage = req.nextUrl.pathname;

    if(requestedPage.startsWith('/auth/')){
      const url = req.nextUrl.clone();
      url.pathname = `/`;
      url.search = `?p=${requestedPage}`;
      return NextResponse.redirect(url);
    }
    if (requestedPage.startsWith('/auth/') || requestedPage.startsWith('/admin/')) {
      const url = req.nextUrl.clone();
      url.pathname = `/auth/login`;
      url.search = `?p=${requestedPage}`;
      return NextResponse.redirect(url);
    }

  } */
  

/*   if (request.nextUrl.pathname === '/details') {
    const token = request.cookies.get('auth-token');
    if (!token || token == undefined) {
      // Redirigir al usuario a la página de inicio de sesión
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
      const secret = process.env.JWT_SECRET;
      const uint8Array = convertVariableToUint8Array(secret);
      const decodedToken = jose.decodeJwt(token.value);

      if (decodedToken.exp < Date.now() / 1000) {
        // Redirigir al usuario a la página de inicio de sesión
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }

      // Resto de la lógica de validación del token

      return NextResponse.next();
    } catch (error) {
      console.log(error);
      return NextResponse.rewrite(new URL('/auth/login', request.url));
    }
  } else {
    NextResponse.next();
  } */


  /* if( request.nextUrl.pathname.includes('/auth') ) {
    // Do something with the request
    const token = request.cookies.get('auth-token');
    if (token) {
      // Redirigir al usuario a la página de inicio de sesión
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Continue with the rest of the request
    return NextResponse.next();
  } else {
    NextResponse.next();
  }  *///reemplazar por use auth usar swr

 /* const middleware = (request) => {
  // Get the user data from the useAuth hook
  const { user, logout } = useAuth();

  // If the user is not authenticated, redirect them to the login page
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Get the token from the request cookies
  const token = request.cookies.get('auth-token');

  // Verify the token
  const decodedToken = jose.decodeJwt(token.value);

  // If the token is invalid, redirect the user to the login page
  if (!decodedToken || decodedToken.exp < Date.now() / 1000) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Continue with the rest of the request
  return NextResponse.next();
}; */


/* 
const { NextResponse } = require('next/server');
const jose = require('jose');
const { convertVariableToUint8Array } = require('./helpers/convertVariableToUint8Array');

  const middleware1 = (request) => {
    // This middleware will only be applied to requests that match the /pay path
    if (request.path === '/pay') {
      // Do something with the request
      //codigo que toma el token y lo comprueba, si no lo trae manda a utenticar, y si ya expiro tambien, protege rutas de privadas de autenticacion
      const token = request.cookies.get('auth-token');
      if (!token) {
        // Redirigir al usuario a la página de inicio de sesión
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
  
      try {
        const secret = process.env.JWT_SECRET;
        const uint8Array = convertVariableToUint8Array(secret);
        const decodedToken = jose.decodeJwt(token.value);
  
        if (decodedToken.exp < Date.now() / 1000) {
          // Redirigir al usuario a la página de inicio de sesión
          return NextResponse.redirect(new URL('/auth/login', request.url));
        }
  
        // Resto de la lógica de validación del token
  
        return NextResponse.next();
      } catch (error) {
        console.log(error);
        return NextResponse.rewrite(new URL('/auth/login', request.url));
      }
    } else {
      // Continue with the rest of the request
      return NextResponse.next();
    }
  };

const middleware2 = (request, response) => {
  // This middleware will only be applied to requests that match the /pay path
  if ( request.path.includes('/auth') ) {
    // Do something with the request
    response.body = 'This is the pay middleware';
    return response.end();
  }

  // Continue with the rest of the request
  return response.next();
};

 */
/* 
export default async function middleware(request) {

  const token = request.cookies.get('auth-token');

  try {
    const secret = process.env.JWT_SECRET;
    const uint8Array = convertVariableToUint8Array(secret);
    const decodedToken = jose.decodeJwt(token.value);

    if (decodedToken.exp < Date.now() / 1000) {
      // Redirigir al usuario a la página de inicio de sesión
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Resto de la lógica de validación del token

    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.rewrite(new URL('/auth/login', request.url));
  }

}  */

 /* const middleware = (request) => {
  // Get the user data from the useAuth hook
  const { user, logout } = useAuth();

  // If the user is not authenticated, redirect them to the login page
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Get the token from the request cookies
  const token = request.cookies.get('auth-token');

  // Verify the token
  const decodedToken = jose.decodeJwt(token.value);

  // If the token is invalid, redirect the user to the login page
  if (!decodedToken || decodedToken.exp < Date.now() / 1000) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Continue with the rest of the request
  return NextResponse.next();
}; */

  /* const { user } = nextauth()*/




/*   const token = request.cookies.get('bearer token');
  try {
    const secret = process.env.JWT_SECRET;
    const uint8Array = convertVariableToUint8Array(secret);
    const decodedToken = jose.decodeJwt(token.value);

    if (!decodedToken) {
      // Redirect the user to the login page
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Rest of the token validation logic

    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.rewrite(new URL('/auth/login', request.url));
  } */
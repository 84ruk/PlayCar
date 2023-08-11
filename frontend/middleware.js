import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'



export async function middleware(req) {
  const session = await getToken({ req, secret: process.env.JWT_SECRET });

  // Obtén la ruta solicitada
  const requestedPage = req.nextUrl.pathname;

  // Verifica si el usuario no tiene una sesión activa y no está en la página de inicio de sesión
  if (!session && !requestedPage.startsWith('/auth')) {
    // Redirige al usuario a la página de inicio de sesión
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    url.search = `p=${requestedPage}`;
    return new NextResponse.redirect(url);
  }

  // Verifica si la sesión del usuario ha expirado
  const currentTimestamp = Math.floor(Date.now() / 1000);
  if (session && session.exp && session.exp < currentTimestamp) {
    // Redirige al usuario a la página de inicio de sesión
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    url.search = `p=${requestedPage}`;
    return new NextResponse.redirect(url);
  }

  // Verifica si el usuario intenta acceder a rutas restringidas sin el rol adecuado
  if (requestedPage.startsWith('/admin/') && session && session.user.rol !== 'ADMIN_ROLE') {
    // Redirige al usuario a la página principal
    const url = req.nextUrl.clone();
    url.pathname = '/';
    url.search = `p=${requestedPage}`;
    return new NextResponse.redirect(url);
  }

  // Si todo es válido, permite el acceso
  return NextResponse.next();
}



export const config = {
  matcher:[ 
    '/pagar/:path*', '/admin', '/auth/:path*', '/admin/:path*'  /* , '/auth/register' */],

}
